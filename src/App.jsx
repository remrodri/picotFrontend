import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import PersonalComponent from "./components/Personal/PersonalComponent";
import { RoleContextProvider } from "./context/role/RoleProvider";
import { UserContextProvider } from "./context/user/UserProvider";
import CardsContainer from "./components/Personal/CardsContainer";

function App() {
  return (
    <UserContextProvider>
      <RoleContextProvider>
        <RouterProvider router={router} />
      </RoleContextProvider>
    </UserContextProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/administrador",
    element: <AdminPage />,
    children: [
      {
        path: "",
        element: <PersonalComponent />,
        children: [
          {
            path: "",
            element:<CardsContainer/>
          }
        ]
      },
    ],
  },
]);

export default App;
