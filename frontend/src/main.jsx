import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signin from './components/login/signin.jsx';
import Signup from './components/signup/signup.jsx';
import About from './pages/about/about.jsx';
import Articles from "./pages/articles/articles.jsx"
import EmailConfirm from './components/confirmationemail/emailConfirm.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/confirmation",
    element: <EmailConfirm />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
   </React.StrictMode>
)
