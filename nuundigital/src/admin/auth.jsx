export const authenticateUser = async (email, password) => {
  if (email === "admin@nuundigital.com" && password === "password") {
    localStorage.setItem("token", "fake-jwt-token");
    return true;
  }
  return false;
};