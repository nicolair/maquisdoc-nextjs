export async function fetchGraphQLData(query) {
  const endpoint = 'http://localhost:3003'; // Replace with your GraphQL API endpoint
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ query });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
