import { Provider } from "react-redux";
import "./App.css";
import PopUp from "./component/PopUp";
import { FormDataProvider } from "./Provider/FormDataConext";
import { store } from "./redux/store";
import ReactDOM from "react-dom";

function App() {
  return (
    // <div className="CdnPurpleApp app-container" style={{ display: "none" }}>
    <div className="CdnPurpleApp app-container" style={{ display: "block" }}>
      <Provider store={store}>
        <div className="CdnPurpleBgBlur CdnPurplePopUpWrapper">
          <FormDataProvider>
            <PopUp />
          </FormDataProvider>
        </div>
      </Provider>
    </div>
  );
}

// This function sets up and initializes the application
function setupApp() {
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);
  ReactDOM.render(<App />, rootElement);

  window.toggleApp = () => {
    const appContainer = document.querySelector(
      ".app-container"
    ) as HTMLElement;
    if (appContainer) {
      appContainer.style.display =
        appContainer.style.display === "none" ? "block" : "none";
    }
  };

  // Optionally, you can toggle the app to show or hide it initially here
  window.toggleApp();
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
