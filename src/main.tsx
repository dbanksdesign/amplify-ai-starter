import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles/reset.css";
import "@aws-amplify/ui-react/styles.css";

import awsconfig from "../amplify_outputs.json";

import { ThemeProvider } from "./components/ThemeProvider.tsx";
import Root from "./routes/Root.tsx";
import { Chat } from "./routes/Chat.tsx";
import { RecipeGenerator } from "./routes/RecipeGenerator.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "recipe-generator",
        element: <RecipeGenerator />,
      },
    ],
  },
]);

Amplify.configure(awsconfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Authenticator>
        <RouterProvider router={router} />
      </Authenticator>
    </ThemeProvider>
  </StrictMode>
);
