import { z } from "zod";
import { createReactOidc } from "oidc-spa/react";

export const {
  OidcProvider,
  /**
   * Note: If you have multiple OidcProvider in your app
   * you do not need to use the useClient hook that that corresponds
   * to the above OidcProvider.
   */
  useOidc,
  /**
   * This is useful to use the oidc API outside of React.
   */
  getOidc,
} = createReactOidc({
  issuerUri: import.meta.env.VITE_OIDC_ISSUER,
  clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
  // scopes: ["email phone"],
  // __clientSecret_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: "",
  homeUrl: import.meta.env.BASE_URL,

  autoLogin: true,

  decodedIdTokenSchema: z.object({
    sub: z.string(),
    preferred_username: z.string(),
  }),
  //autoLogoutParams: { redirectTo: "current page" } // Default
  //autoLogoutParams: { redirectTo: "home" }
  //autoLogoutParams: { redirectTo: "specific url", url: "/a-page" }

  // This parameter is optional.
  // It allows you to pass extra query params before redirecting to the OIDC server.
  extraQueryParams: () => ({
    ui_locales: "en", // Here you would dynamically get the current language at the time of redirecting to the OIDC server
  }),
  // Remove this in your repo
  debugLogs: true,
});

// Using the mock adapter:
// To use this, just remove the code above and uncomment the code below.
// The mock oidc adapter will be enabled if the OIDC_ISSUER environment variable is not set.
/*
import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";
import { z } from "zod";

const decodedIdTokenSchema = z.object({
    sub: z.string(),
    preferred_username: z.string()
});


export const { OidcProvider, useOidc, getOidc } =
    !import.meta.env.VITE_OIDC_ISSUER ?
        createMockReactOidc({
            isUserInitiallyLoggedIn: false,
            homeUrl: import.meta.env.BASE_URL,
            mockedTokens: {
                decodedIdToken: {
                    sub: "123",
                    preferred_username: "john doe"
                } satisfies z.infer<typeof decodedIdTokenSchema>
            }
        }) :
        createReactOidc({
            issuerUri: import.meta.env.VITE_OIDC_ISSUER,
            clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
            BASE_URL: import.meta.env.BASE_URL,
            decodedIdTokenSchema
        });
*/
