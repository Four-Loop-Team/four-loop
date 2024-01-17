import React from "react";
import ReactDOM from "react-dom";
import Preloader from "../components/preloader/preloader"
// import Timer from "./components/Countdown/Timer";
// import Optin from "./components/Optin/Optin";

// import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>
          Website
          <br />
          Coming Soon
        </h1>
        <Preloader />
      </div>
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
