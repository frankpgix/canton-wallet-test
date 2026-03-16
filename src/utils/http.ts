// src/utils/http.ts

// Define a default base URL. You can customize this or use an environment variable like import.meta.env.VITE_API_BASE_URL
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://workers.alldefi.finance/api/v2/validator/'

// Define the shape of the request configuration
interface RequestConfig extends Omit<RequestInit, 'body'> {
  // Whether to automatically attach the Authorization header (JWT)
  requireAuth?: boolean
  // Request body data (will be automatically stringified for JSON requests)
  data?: unknown
}

import { User } from 'oidc-client-ts'

// Helper function to retrieve the JWT token from storage
const getToken = (): string | null => {
  // 1. Try to get token from OIDC storage (sessionStorage or localStorage based on config)
  // We configured WebStorageStateStore with localStorage in oidc.ts
  const oidcStorage = localStorage.getItem(
    'oidc.user:https://iam.validator.dev.pythagoras.obsidian.systems/cloak/realms/canton-validator-1:alldefi-portal-ui'
  )

  if (oidcStorage) {
    try {
      const user = User.fromStorageString(oidcStorage)
      return user?.access_token || null
    } catch (e) {
      console.warn('Failed to parse OIDC user from storage', e)
    }
  }

  // 2. Fallback to manual token (legacy support, or if you still want to keep it)
  // You can remove this if you want to enforce OIDC login only
  return localStorage.getItem('token')
}

/**
 * Core request function using fetch API
 * Supports automatic JWT injection and JSON response parsing
 */
const request = async <T>(url: string, config: RequestConfig = {}): Promise<T> => {
  const { requireAuth = true, headers = {}, data, ...rest } = config

  // Construct the full URL
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`

  // Initialize Headers object
  const requestHeaders = new Headers(headers)

  // Set default Content-Type to application/json if not provided and data is present
  if (!requestHeaders.has('Content-Type') && data && !(data instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  // Inject JWT Authorization header if required
  if (requireAuth) {
    const token = getToken()
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`)
    }
  }

  // Prepare request options
  const options: RequestInit = {
    ...rest,
    headers: requestHeaders,
  }

  // Handle request body
  if (data) {
    if (data instanceof FormData) {
      options.body = data
    } else {
      options.body = JSON.stringify(data)
    }
  }

  try {
    const response = await fetch(fullUrl, options)

    // Check for HTTP errors
    if (!response.ok) {
      // Handle 401 Unauthorized specifically (e.g., redirect to login)
      if (response.status === 401) {
        // console.error('Unauthorized access - maybe redirect to login?');
        // window.location.href = '/login'; // Example redirect
      }

      const errorBody = await response.text()
      throw new Error(`HTTP Error ${response.status}: ${errorBody || response.statusText}`)
    }

    // Parse response body as JSON
    // You can customize this to handle other content types if needed
    const responseData = await response.json()
    return responseData as T
  } catch (error) {
    // Centralized error handling (logging, toast notifications, etc.)
    console.error('Request failed:', error)
    throw error
  }
}

/**
 * GET request wrapper
 * @param url Request URL
 * @param config Request configuration
 * @returns Promise resolving to the response data of type T
 */
export const get = <T>(
  url: string,
  config?: Omit<RequestConfig, 'method' | 'data'>
): Promise<T> => {
  return request<T>(url, { ...config, method: 'GET' })
}

/**
 * POST request wrapper
 * @param url Request URL
 * @param data Request body data
 * @param config Request configuration
 * @returns Promise resolving to the response data of type T
 */
export const post = <T>(
  url: string,
  data?: unknown,
  config?: Omit<RequestConfig, 'method' | 'data'>
): Promise<T> => {
  return request<T>(url, { ...config, method: 'POST', data })
}

// Export default object for convenience
export default { get, post }
