// App.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { getItem, saveItem } from "./Api/storage";
import { loginSuccess, setClient } from "./Redux-Store/Features/Auth-Folder/authSlice";

import LoginForm from "./Pages-Folder/LoginForm";
import ProfilePage from "./Pages-Folder/Settings-Folder/ProfilePage";
import Settings from "./Pages-Folder/Settings-Folder/SettingsPage";
import TeamPage from "./Pages-Folder/Settings-Folder/TeamPage";
import RootLayout from "./Layouts/RootLayout";
import ProtectedRoute from "./Routes/protectedRoute";

// ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/settings",
        element: <Settings />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "team",
            element: <TeamPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSession = async () => {
      const session = await getItem("session");
      const savedClient = await getItem("client");

      if (session) {
        dispatch(loginSuccess(session));
      }

      if (savedClient) {
        dispatch(setClient(savedClient));
      }
    };

    loadSession();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
