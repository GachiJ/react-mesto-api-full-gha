const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../meddlwares/errors/BadRequestError');
const NotFoundError = require('../meddlwares/errors/NotFoundError');
const ForbiddenError = require('../meddlwares/errors/ForbiddenError');
const InternalServerError = require('../meddlwares/errors/InternalServerError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return next(new BadRequestError('Недействительный идентификатор карты'));
  }

  return Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не имеете права удалять чужую карту');
      }

      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return next(new NotFoundError('Карточка не найдена'));
  }

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('Card not found'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'Card not found') {
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError('Внутренняя ошибка сервера'));
      }
    });
};

const deleteLike = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return next(new BadRequestError('Недействительный идентификатор карты'));
  }

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('Card not found'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'Card not found') {
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError('Внутренняя ошибка сервера'));
      }
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  deleteLike,
};
