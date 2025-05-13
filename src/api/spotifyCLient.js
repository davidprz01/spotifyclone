const API_URL = import.meta.env.VITE_API_URL

export const searchSongs = async (query) => {
    try {
      const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Error al buscar canciones");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en searchSongs:", error);
      throw error;
    }
  };
  
  // Añadir canción a la cola
  export const addToQueue = async (songdata) => {
    try {
      const response = await fetch(`${API_URL}/queue/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songdata),
      });
      if (!response.ok) {
        throw new Error("Error al añadir canción");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en addToQueue:", error);
      throw error;
    }
  };
  
  // Obtener siguiente canción
  export const getNextSong = async () => {
    try {
      const response = await fetch(`${API_URL}/queue/next`);
      if (!response.ok) {
        throw new Error("No hay canciones en la cola");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en getNextSong:", error);
      throw error;
    }
  };
  
  // Ver la cola actual
  export const viewQueue = async () => {
    try {
      const response = await fetch(`${API_URL}/queue`);
      if (!response.ok) {
        throw new Error("Error al obtener la cola");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en viewQueue:", error);
      throw error;
    }
  };