let ws;

const joinForm = document.getElementById('joinForm');
const chatRoom = document.getElementById('chatRoom');
console.log(joinForm);
joinForm.onsubmit = e => {
  if (ws) {
    return;
  }
  joinForm.style.display = 'none';

  ws = new WebSocket('ws://localhost:3001');
  e.preventDefault();
  const username = e.target.name.value;
  ws.onopen = function () {
    this.send('join:' + username);
  };
  ws.onmessage = function (e) {};
};
