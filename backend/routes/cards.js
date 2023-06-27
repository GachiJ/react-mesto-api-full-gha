const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, deleteLike,
} = require('../controllers/cards');
const { validationCreateCard, validationCardById } = require('../meddlwares/validation');

router.get('/cards', getCards);

router.post('/cards', validationCreateCard, createCard);

router.delete('/cards/:cardId', validationCardById, deleteCardById);

router.put('/cards/:cardId/likes', validationCardById, likeCard);

router.delete('/cards/:cardId/likes', validationCardById, deleteLike);

module.exports = router;
