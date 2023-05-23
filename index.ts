import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';
import { join } from 'path';
import { cwd } from 'process';

const WEB_PORT = 3000;
const WS_PORT = 3001;

const app = express();
app.use(express.static('./public'));
app.listen(WEB_PORT, () => {
  console.log(`web server listening ${WEB_PORT}`);
});
const wss = new WebSocketServer({
  port: WS_PORT,
});

wss.on('connection', (ws, request) => {
  console.log('connected');
  ws.on('message', data => {
    const [method, message] = data.toString().split(':');
    if (method === 'join') {
      const responseText = `${message}님이 입장하셨습니다~!`;
      console.log('emit: ' + responseText);
      wss.clients.forEach(cws => {
        if (cws.readyState !== WebSocket.OPEN) {
          return;
        }

        cws.send(responseText);
      });
    }
    // ws.send();
  });
});
