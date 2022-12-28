import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
