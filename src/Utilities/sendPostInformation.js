import axios from 'axios';

export const sendPostInformation = async ({ url, body }) => {
  const apiUrl = `https://0215-2800-e2-c380-c80-d82f-5091-9dc7-f7ee.ngrok.io/points`;
  console.log(apiUrl);

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Insertion response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error response:', error);
    throw new Error('Error en la petición: ' + error.message);
  }
};