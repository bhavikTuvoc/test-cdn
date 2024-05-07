import ReactDOM from "react-dom";
import "./App.css";
import PopUp from "./component/PopUp";
import { FormDataProvider } from "./Provider/FormDataConext";

function App() {
  return (
    // <div className="App app-container" style={{ display: "none" }}>
    <div className="App app-container" style={{ display: "block" }}>
      <div className="bgBlur popUpWrapper">
        <FormDataProvider>
          <PopUp />
        </FormDataProvider>
      </div>
    </div>
  );
}

// This function sets up and initializes the application
function setupApp() {
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);
  ReactDOM.render(<App />, rootElement);

  window.toggleApp = (string) => {
    console.log(string);
    const appContainer = document.querySelector(
      ".app-container"
    ) as HTMLElement;
    if (appContainer) {
      appContainer.style.display =
        appContainer.style.display === "none" ? "block" : "none";
    }
  };

  // Optionally, you can toggle the app to show or hide it initially here
  window.toggleApp("hello");
}

export const handleClose = () => {
  const appContainer = document.querySelector(".app-container") as HTMLElement;
  if (appContainer) {
    appContainer.style.display =
      appContainer.style.display === "none" ? "block" : "none";
  }
};

// Ensure everything is loaded and ready
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", setupApp);
} else {
  // `DOMContentLoaded` has already fired
  setupApp();
}

export default App;
