import { Route, Routes } from "react-router-dom";

function Footer() {
  return (
    <Routes>
      <Route index element={<footer className="footer">
        <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</p>
      </footer>}
      />
    </Routes>
  )
}

export default Footer