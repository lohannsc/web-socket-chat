# Senac Chat — Sprint WebSocket

## Objetivo

Programar um bate-papo em tempo real para diferentes computadores, com Python + FastAPI no servidor e HTML/CSS/JavaScript no navegador.

## Preparação

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn server:app --reload
```

Abrir http://127.0.0.1:8000. **O projeto-base tem TODOs e ainda não conversa; esse é o desafio.**

## Tickets

- CHAT-01 · `feat`: implementar `SalaChat` e endpoint `/ws/{nome}` com broadcast.
- CHAT-02 · `feat`: conectar a página usando `new WebSocket`, enviar e receber mensagens com `send`, `message`, `open`, `close`.
- CHAT-03 · `style`: personalizar tipografia, cores, responsividade, mensagens enviadas e avisos do sistema.
- CHAT-04 · `fix`: impedir mensagens vazias e envios enquanto desconectado; usar `textContent` (não `innerHTML`).

## Critérios de aceite

- Duas abas com nomes diferentes trocam mensagens instantaneamente.
- Quem entra e sai gera um aviso no chat.
- Mensagens vazias não são transmitidas.
- Cada estudante tem interface personalizada.
- Há pelo menos 4 commits semânticos na branch individual do GitHub Desktop.

## Exemplos de commits

```text
feat: implementar sala de chat com WebSocket
feat: integrar envio e recebimento de mensagens no navegador
style: personalizar interface do bate-papo
fix: validar mensagens e estado da conexao
```

Não usar fork: clonar o repositório do instrutor, trabalhar em branch própria e publicar nela com a permissão concedida pelo instrutor.
