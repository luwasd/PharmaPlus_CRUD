import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import AdminPage from "../pages/AdminPage";
import CartPage from "../pages/CartPage";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/welcome", element: <Welcome /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/contacto", element: <ContactUs/> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);
