import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";

const rootNode = document.getElementById("root");
if (rootNode) {
  const root = ReactDOM.createRoot(rootNode);
  root.render(
    <HashRouter>
      <App />
    </HashRouter>
  );
}
