const formularioEntrada = document.querySelector("#form-entrada");
const formularioMensagem = document.querySelector("#form-mensagem");
const campoNome = document.querySelector("#nome");
const campoMensagem = document.querySelector("#mensagem");
const listaMensagens = document.querySelector("#mensagens");
const situacao = document.querySelector("#situacao");
const botaoEnviar = document.querySelector("#btn-enviar");

let conexao = null;

// TODO 5: ao clicar em Entrar, criar uma instancia WebSocket
// apontando para ws://IP:PORTA/ws/NOME.
// Consulte: https://developer.mozilla.org/pt-BR/docs/Web/API/WebSocket

// TODO 6: tratar os eventos open, message, close e error.
// Ao receber dados, usar JSON.parse e criar um <li> na lista.
// IMPORTANTE: use textContent para mostrar mensagens, nao innerHTML.

// TODO 7: ao enviar o formulario de mensagem, usar conexao.send(texto).
// Impedir mensagens vazias e envio antes da conexao abrir.

// TODO 8: permitir desconectar pelo botao Sair.
