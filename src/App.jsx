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
import UserForm from "./components/Personal/UserForm";
import RecordComponent from "./components/Record/RecordComponent";
import { RecordContextProvider } from "./context/record/RecordProvider";
import FirstLoginPage from "./pages/FirstLoginPage";
import PasswordForm from "./components/firstLogin/PasswordForm";
import AnswerForm from "./components/firstLogin/AnswerForm";
import { SetQuestionsAnswersContextProvider } from "./context/setQuestionsAnswers/SetQuestionsAnswersProvider";
import RecoveryPasswordPage from "./pages/RecoveryPasswordPage";
import EmailForm from "./components/recoveryPassword/EmailForm";
import SetPasswordForm from "./components/recoveryPassword/SetPasswordForm";
import QuestionForm from "./components/recoveryPassword/QuestionForm";
import TourPackageComponent from "./components/tourPackage/TourPackageComponent";
// import TourPackageForm from "./components/tourPackage/TourPackageForm";
import TourPackageCards from "./components/tourPackage/TourPackageCards";
import { TourPackageContextProvider } from "./context/tourPackage/TourPackageProvider";
import TourPackageForm from "./components/tourPackage/TourPackageForm";
// import TourPackageForm from "./components/tourPackage/TourPackageForm";

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
    path: "/recuperar-contraseña",
    element: (
      <SetQuestionsAnswersContextProvider>
        <RecoveryPasswordPage />
      </SetQuestionsAnswersContextProvider>
    ),
    children: [
      {
        path: "",
        element: <EmailForm />,
      },
      {
        path: "pregunta",
        element: <QuestionForm />,
      },
      {
        path: "restablecer-contraseña",
        element: <SetPasswordForm />,
      },
    ],
  },
  {
    path: "/administrador",
    element: <AdminPage />,
    children: [
      {
        path: "personal",
        element: <PersonalComponent />,
        children: [
          {
            path: "",
            element: <CardsContainer />,
          },
          {
            path: "nuevo",
            element: <UserForm />,
          },
          {
            path: "editar/:id",
            element: <UserForm />,
          },
        ],
      },
      {
        path: "registro",
        element: (
          <RecordContextProvider>
            <RecordComponent />
          </RecordContextProvider>
        ),
      },
      {
        path: "paquete-turistico",
        element: (
          <TourPackageContextProvider>
            <TourPackageComponent />
          </TourPackageContextProvider>
        ),
        children: [
          {
            path: "",
            element: <TourPackageCards />,
          },
          {
            path: "nuevo",
            element: <TourPackageForm/>,
          },
          {
            path: "editar/:id",
            element: <TourPackageForm/>,
          }
        ],
      },
    ],
  },
  {
    path: "/operador",
    element: <AdminPage />,
  },
  {
    path: "/guia",
    element: <AdminPage />,
  },
  {
    path: "/configuracion-inicial",
    element: (
      <SetQuestionsAnswersContextProvider>
        <FirstLoginPage />
      </SetQuestionsAnswersContextProvider>
    ),

    children: [
      {
        path: "establecer-password",
        element: <PasswordForm />,
      },
      {
        path: "respuestas",
        element: <AnswerForm />,
      },
    ],
  },
]);

export default App;
