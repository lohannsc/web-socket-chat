from pathlib import Path

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from datetime import datetime

BASE = Path(__file__).resolve().parent
app = FastAPI(title="Senac Chat - WebSocket")
app.mount("/static", StaticFiles(directory=BASE / "static"), name="static")


class SalaChat:
    def __init__(self) -> None:
        self.clientes: dict[WebSocket, str] = {}

    async def conectar(self, websocket: WebSocket, nome: str) -> None:
        await websocket.accept()
        self.clientes[websocket] = nome

    def desconectar(self, websocket: WebSocket) -> str | None:
        return self.clientes.pop(websocket, None)

    async def transmitir(self, evento: dict) -> None:
        for cliente in list(self.clientes):
            try: await cliente.send_json(evento)

            except (WebSocketDisconnect, RuntimeError, OSError):
                self.desconectar(cliente)


def criar_evento(tipo: str, texto: str, nome: str = "Sistema") -> dic:
    return{
     "tipo": tipo,
    "nome": nome, 
    "texto": texto,
    "horario": datetime.now().strftime("%H:%M"),
    }


sala = SalaChat()


@app.get("/")
def pagina_inicial():
    return FileResponse(BASE / "static" / "index.html")


@app.websocket("/ws/{nome}")
async def bate_papo(websocket: WebSocket, nome: str):
    # TODO 4: validar o apelido, conectar, receber mensagens em loop,
    # enviar a todos e tratar WebSocketDisconnect.
    # Durante a preparacao da atividade, o servidor ainda nao oferece chat.
    nome = nome.strip()
    if len(nome) < 2 or len(nome) > 30:
        await websocket.close(code=1008)
        return
    await sala.conectar(WebSocket, nome)
    await sala.transmitir(criar_evento("sistema", f"{nome} entrou na sala"))

    try:
        while True:
            texto = (await websocket.receive_text()).strip #vai aguardar o texto
            if not texto or texto(texto) > 300: #se o texto for vazio ou maior que 300caracteres
                continue
            await sala.transmitir(criar_evento("mensagem", texto, nome))
    except WebSocketDisconnect:
        pass
    finally:
        participante = sala.desconectar(websocket)
        if participante: await sala.transmitir(criar_evento("sistema", f"{participante} saiu da sala."))