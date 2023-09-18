export const headers = {
  'Content-Type': 'application/json',
};

export const getRequest = async (endpoint: string) => {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (err) {
    console.error('Error:', err);
    return { message: `An error occurred during fetching ${endpoint}` };
  }
};

export const postRequest = async (endpoint: string, data: any) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (err) {
    console.error('Error:', err);
    return { message: `An error occurred during posting ${endpoint}` };
  }
};

export const deleteRequest = async endpoint => {
  const requestOptions = {
    method: 'DELETE',
    headers,
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return { message: 'Resource deleted successfully' };
  } catch (err) {
    console.error('Error:', err);
    return { message: `An error occurred during deletion at ${endpoint}` };
  }
};

export const patchRequest = async (endpoint: string, data: any) => {
  const requestOptions: RequestInit = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return { message: 'Resource updated successfully' };
  } catch (err) {
    console.error('Error:', err);
    return { message: `An error occurred during updating ${endpoint}` };
  }
};