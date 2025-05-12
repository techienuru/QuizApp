import "bootstrap/dist/css/bootstrap.min.css";
// import { useEffect } from "react";
import Home from "./pages/Home/Home.jsx";
import PlayOptionsModal from "./components/Header/PlayOptionsModal/PlayOptionsModal.jsx";
import Result from "./pages/Result/Result.jsx";
// import { useState } from "react";

function App() {
  return (
    <>
      <Result />
      {/* <Home /> */}
      <PlayOptionsModal />
    </>
  );
}

export default App;
