/**
 * API client helper
 * Handles HTTP requests with Firebase auth token injection
 */
import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

/** Custom API error class */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Get the current user's auth token */
async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}

/** Build request headers with optional auth token */
async function buildHeaders(includeAuth: boolean = true): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = await getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/** Generic fetch wrapper with error handling */
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth: boolean = true
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = await buildHeaders(includeAuth);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message || `Request failed with status ${response.status}`,
      data
    );
  }

  return data as T;
}

/** API client with convenience methods */
export const api = {
  /** GET request */
  get<T>(endpoint: string, includeAuth: boolean = true): Promise<T> {
    return request<T>(endpoint, { method: 'GET' }, includeAuth);
  },

  /** POST request */
  post<T>(endpoint: string, body: unknown, includeAuth: boolean = true): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      includeAuth
    );
  },

  /** PUT request */
  put<T>(endpoint: string, body: unknown, includeAuth: boolean = true): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      },
      includeAuth
    );
  },

  /** PATCH request */
  patch<T>(endpoint: string, body: unknown, includeAuth: boolean = true): Promise<T> {
    return request<T>(
      endpoint,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      },
      includeAuth
    );
  },

  /** DELETE request */
  delete<T>(endpoint: string, includeAuth: boolean = true): Promise<T> {
    return request<T>(endpoint, { method: 'DELETE' }, includeAuth);
  },
};
