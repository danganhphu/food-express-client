import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { OidcProvider } from "./oidc.tsx";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <OidcProvider
        ErrorFallback={({ initializationError }) => (
          <h1 style={{ color: "red" }}>
            {initializationError.isAuthServerLikelyDown ? (
              <>Sorry our authentication server is currently down, please try again later</>
            ) : (
              <>Unexpected authentication error </>
            )}
          </h1>
        )}
      >
        <RouterProvider router={router} />
      </OidcProvider>
    </StrictMode>,
  );
}
