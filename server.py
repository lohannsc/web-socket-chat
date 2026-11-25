from pathlib import Path

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE = Path(__file__).resolve().parent
app = FastAPI(title="Senac Chat - WebSocket")
app.mount("/static", StaticFiles(directory=BASE / "static"), name="static")


class SalaChat:
    def __init__(self) -> None:
        self.clientes: dict[WebSocket, str] = {}

    async def conectar(self, websocket: WebSocket, nome: str) -> None:
        # TODO 1: aceitar a conexao WebSocket e registrar o participante
        pass

    def desconectar(self, websocket: WebSocket) -> str | None:
        # TODO 2: retirar o participante e retornar seu nome
        pass

    async def transmitir(self, evento: dict) -> None:
        # TODO 3: percorrer as conexoes e enviar o evento JSON a todas
        pass


sala = SalaChat()


@app.get("/")
def pagina_inicial():
    return FileResponse(BASE / "static" / "index.html")


@app.websocket("/ws/{nome}")
async def bate_papo(websocket: WebSocket, nome: str):
    # TODO 4: validar o apelido, conectar, receber mensagens em loop,
    # enviar a todos e tratar WebSocketDisconnect.
    # Durante a preparacao da atividade, o servidor ainda nao oferece chat.
    await websocket.close(code=1011)
