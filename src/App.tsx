import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
