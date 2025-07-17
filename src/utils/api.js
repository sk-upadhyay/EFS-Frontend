export async function authFetch(url, options = {}) {
  const token = sessionStorage.getItem('token');
  const tokenTimestamp = sessionStorage.getItem('tokenTimestamp');
  const now = Date.now();

  if (tokenTimestamp && now - parseInt(tokenTimestamp, 10) > 3600000) {
    sessionStorage.clear();
    window.location.reload();
    return;
  }

  const headers = options.headers ? new Headers(options.headers) : new Headers();

  if (token) {
    headers.set('Authorization', 'Bearer ' + token);
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message);
    error.status = response.status;
    throw error;
  }

  return response.json();
}
