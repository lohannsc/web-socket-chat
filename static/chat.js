const formularioEntrada = document.querySelector("#form-entrada");
const formularioMensagem = document.querySelector("#form-mensagem");
const campoNome = document.querySelector("#nome");
const campoMensagem = document.querySelector("#mensagem");
const listaMensagens = document.querySelector("#mensagens");
const situacao = document.querySelector("#situacao");
const botaoConectar = document.querySelector("#btn-conectar");
const botaoSair = document.querySelector("#btn-sair");
const botaoEnviar = document.querySelector("#btn-enviar");
const statusPresenca = document.querySelector("#status-presenca");
const iconeUsuario = document.querySelector(".icone-usuario");
const indicadorStatus = document.querySelector(".status-indicador");

function atualizarStatusVisual() {
  const status = statusPresenca.value;

  iconeUsuario.dataset.status = status;
  indicadorStatus.dataset.status = status;
}

statusPresenca.addEventListener("change", atualizarStatusVisual);

// Aplica a cor inicial ao carregar a página
atualizarStatusVisual();

let conexao = null;

function atualizarInterface(conectado) {
  situacao.textContent = conectado ? "Conectado ao chat" : "Desconectado";
  campoNome.disabled = conectado;
  botaoConectar.disabled = conectado;
  botaoSair.disabled = !conectado;
  campoMensagem.disabled = !conectado;
  botaoEnviar.disabled = !conectado;


  // Atualiza o status de presença
  statusPresenca.value = conectado
    ? "disponivel"
    : "desconectado";

  atualizarStatusVisual();
}

function mostrarEvento(evento) {
  const item = document.createElement("li");
  item.className = evento.tipo === "mensagem" ? "mensagem" : "sistema";
  item.textContent = evento.tipo === "mensagem"
    ? `[${evento.horario}] ${evento.nome}: ${evento.texto}`
    : `[${evento.horario}] ${evento.texto}`;
  listaMensagens.appendChild(item);
  item.scrollIntoView({ block: "nearest" });
}

formularioEntrada.addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = campoNome.value.trim();
  if (nome.length < 2 || nome.length > 20) return;
  if (conexao && conexao.readyState !== WebSocket.CLOSED) return;

  const protocolo = location.protocol === "https:" ? "wss" : "ws";
  conexao = new WebSocket(`${protocolo}://${location.host}/ws/${encodeURIComponent(nome)}`);
  situacao.textContent = "Conectando...";
  botaoConectar.disabled = true;

  conexao.addEventListener("open", () => {
    atualizarInterface(true);
    campoMensagem.focus();
  });

  conexao.addEventListener("message", (evento) => {
    mostrarEvento(JSON.parse(evento.data));
  });

  conexao.addEventListener("close", () => {
    conexao = null;
    atualizarInterface(false);
  });

  conexao.addEventListener("error", () => {
    situacao.textContent = "Erro de conexão";
  });
});

formularioMensagem.addEventListener("submit", (event) => {
  event.preventDefault();
  const texto = campoMensagem.value.trim();
  if (!texto || !conexao || conexao.readyState !== WebSocket.OPEN) return;
  conexao.send(texto);
  campoMensagem.value = "";
  campoMensagem.focus();
});

botaoSair.addEventListener("click", () => {
  if (conexao) conexao.close();
});

campoMensagem.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();

    formularioMensagem.requestSubmit();
  }
});