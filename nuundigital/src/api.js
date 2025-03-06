const API_URL = process.env.REACT_APP_API_URL;

// Function to log in
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// Function to upload media
export const uploadMedia = async (file, token) => {
  const formData = new FormData();
  formData.append("media", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: { Authorization: token },
    body: formData,
  });

  return response.json();
};

// Function to save content
export const saveContent = async (text, mediaUrl, token) => {
  const response = await fetch(`${API_URL}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ text, mediaUrl }),
  });

  return response.json();
};

// Function to fetch content
export const getContent = async () => {
  const response = await fetch(`${API_URL}/content`);
  return response.json();
};
