import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home.jsx";
import Result from "./pages/Result/Result.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page404 from "./pages/Page404/Page404.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="/result" element={<Result />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
