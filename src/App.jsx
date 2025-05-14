import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home.jsx";
import PlayOptionsModal from "./components/PlayOptionsModal/PlayOptionsModal.jsx";
import Result from "./pages/Result/Result.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [isModalOpen, setisModalOpen] = useState(false);

  const openModal = () => {
    setisModalOpen(true);
  };

  const closeModal = () => {
    setisModalOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home openModal={openModal} />}></Route>
            <Route path="/result" element={<Result />}></Route>
            <Route
              path="/quiz/:noOfQuestion/:categoryId/:difficulty/:questionType"
              element={<Quiz />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {isModalOpen && <PlayOptionsModal closeModal={closeModal} />}
    </>
  );
}

export default App;
