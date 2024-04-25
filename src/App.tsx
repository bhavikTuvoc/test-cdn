import ReactDOM from "react-dom";
import "./App.css";
import PopUp from "./component/PopUp";

function App() {
  return (
    <div className="App app-container" style={{ display: "none" }}>
      <div className="w-full mx-auto h-screen bgBlur flex justify-center items-center">
        <PopUp />
      </div>
    </div>
  );
}

window.toggleApp = () => {
  const appContainer = document.querySelector(".app-container") as HTMLElement; // Cast directly
  appContainer.style.display =
    appContainer.style.display === "none" ? "block" : "none";
};

// Example of mounting the app if not already shown
const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
ReactDOM.render(<App />, rootElement);

export default App;
