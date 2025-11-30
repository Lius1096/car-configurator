
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


export const fetchOptions = async (category) => {
  let url = `${API_BASE_URL}/cars`;
  if (category) {
    url += `?category=${category}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch options from the server.');
  }
  return response.json();
};


export const seedDatabase = async () => {
  await fetch(`${API_BASE_URL}/cars/seed`, { method: 'POST' }); // La route est /api/cars/seed
};