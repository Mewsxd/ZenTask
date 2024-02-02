import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const router = createBrowserRouter([{ path: "/", element: <AuthPage /> }]);
  return <RouterProvider router={router} />;
};

export default App;
