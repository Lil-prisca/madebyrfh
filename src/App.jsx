import { BrowserRouter } from "react-router-dom";
import Approuter from "./routes/Approuter";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Approuter></Approuter>
    </BrowserRouter>
  );
}

export default App;
