from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Para CORS (comunicación con React)
from typing import Optional, Dict, List
import requests

# Configuración de FastAPI
app = FastAPI()

# Permitir CORS (para conectar con React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173"],  # En producción, reemplaza "*" con tu dominio frontend
    allow_methods=["*"],
    allow_headers=["*"],
)

# data models - data structre (LIFO) 
class Node:
    def __init__(self, data):
        self.data = data #about data songs
        self.next = None

class Queue:
    def __init__(self):
        self.front = None
        self.rear = None
        self.size = 0
    
    def enqueue(self, data) -> None:
        newnode = Node(data)
        if self.rear is None:
            self.front = self.rear = newnode
        else:
            self.rear.next = newnode
            self.rear = newnode
        self.size += 1
    
    def dequeue(self):
        if self.front is None:
            return None
        t = self.front
        self.front = t.next
        if self.front is None:
            self.rear = None
        self.size -= 1
        return t.data
    
    def is_empty(self) -> bool:
        return self.front is None
    
    def get_size(self) -> int:
        return self.size
    
    def get_alldata (self) -> List:
        items = []
        actual = self.front
        while actual:
            items.append(actual.data)
            actual = actual.next
        return items

songq = Queue()

# --- songs validation ---
def validate_song_data(songdata: Dict) -> bool:
    """Valida que los datos de la canción sean correctos."""
    required_fields = ["id", "name", "artist", "duration_ms"]
    for field in required_fields:
        if field not in songdata:
            return False
    # Validación básica de tipos
    if not isinstance(songdata["id"], str):
        return False
    if not isinstance(songdata["duration_ms"], int):
        return False
    return True


# --- API de Spotify ---
SPOTIFY_API_URL = "https://api.spotify.com/v1"
SPOTIFY_TOKEN = "tu_token_de_spotify"  # Obtén uno temporal desde https://developer.spotify.com/console/

# --- Endpoints ---

# Añadir canción a la cola (POST)
@app.post("/queue/add")
async def add_to_queue(songdata: Dict):
    if not validate_song_data(songdata):
        raise HTTPException(status_code=400, detail="Datos de canción inválidos, faltan campos requeridos")
    songq.enqueue(songdata)
    return {"message": "Canción añadida", "queue_size": songq.get_size()}

# Obtener la siguiente canción (GET)
@app.get("/queue/next")
async def get_next_song():
    next_song = songq.dequeue()
    if next_song is None:
        raise HTTPException(status_code=404, detail="No hay canciones en la cola")
    return {"song": next_song, "queue_size": songq.get_size()}

# Ver la cola actual (GET)
@app.get("/queue")
async def view_queue():
    return {"queue": songq.get_alldata(), "queue_size": songq.get_size()}

# Buscar canciones en Spotify (GET)
@app.get("/search")
async def search_songs(query: str):
    headers = {"Authorization": f"Bearer {SPOTIFY_TOKEN}"}
    response = requests.get(
        f"{SPOTIFY_API_URL}/search?q={query}&type=track&limit=5",
        headers=headers
    )
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Error al buscar en Spotify")
    return response.json()