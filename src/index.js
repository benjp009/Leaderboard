import './style.css';

const sendData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
};

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', async () => {
  await sendData('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3qxAA7wy5DPzg65q4nWs/scores/', { user: nameInput.value, score: +scoreInput.value });
  nameInput.value = '';
  scoreInput.value = '';
});

const refreshButton = document.getElementById('refresh');
const scoresUl = document.getElementsByClassName('boardlist')[0];

const loadScores = async () => {
  scoresUl.innerHTML = '';
  const { result: scores } = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3qxAA7wy5DPzg65q4nWs/scores/').then((response) => response.json());
  scores.forEach((score) => {
    const li = document.createElement('li');
    li.innerHTML = `${score.user}: ${score.score}`;
    scoresUl.appendChild(li);
  });
};

refreshButton.addEventListener('click', loadScores);
window.onload = loadScores;
