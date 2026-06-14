import axios from 'axios';

export async function fetchCharactersFromApi(query: string) {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character', {
      params: {
        name: query,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { result: [] };
      }
    }

    throw error;
  }
}
