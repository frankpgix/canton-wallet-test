import { WebStorageStateStore } from 'oidc-client-ts'
import { type AuthProviderProps } from 'react-oidc-context'

/**
 * OIDC Configuration for Keycloak
 */
export const oidcConfig: AuthProviderProps = {
  authority:
    'https://iam.validator.dev.pythagoras.obsidian.systems/cloak/realms/canton-validator-1',
  client_id: 'alldefi-portal-ui',
  redirect_uri: window.location.origin,
  response_type: 'code',
  scope: 'openid offline_access',

  // Use localStorage to persist the session across page reloads
  userStore: new WebStorageStateStore({ store: window.localStorage }),

  // Automatic silent renew
  automaticSilentRenew: true,

  // Extra query params for authorization request
  extraQueryParams: {
    audience: 'https://canton.network.global',
    // prompt: 'login', // We will pass this in signinRedirect() instead
  },

  // On successful sign-in, redirect to the page stored in state or home
  onSigninCallback: (_user) => {
    // You can handle post-login logic here, e.g., redirecting based on state
    // But react-oidc-context handles the state restoration automatically if we use their context properly
    // We will handle navigation in the CallbackPage component
    window.history.replaceState({}, document.title, window.location.pathname)
  },
}
