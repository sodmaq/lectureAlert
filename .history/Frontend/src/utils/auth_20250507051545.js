// Simplified auth functions with added event dispatching

// Check if user is authenticated
export const isAuthenticated = () => !!localStorage.getItem("token");

// Login function
export const login = (token) => {
  // Store token in localStorage
  localStorage.setItem("token", token);

  // Dispatch login event to update UI
  window.dispatchEvent(new Event("login"));

  return true;
};

// Logout function
export const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem("token");

  // Dispatch logout event to update UI
  window.dispatchEvent(new Event("logout"));

  return true;
};
