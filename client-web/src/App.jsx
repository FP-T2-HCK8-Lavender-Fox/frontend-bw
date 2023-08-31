import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import store from "./store";
import { Provider } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
  });

  return isLoaded ? (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  ) : (
    <></>
  );
}

export default App;
