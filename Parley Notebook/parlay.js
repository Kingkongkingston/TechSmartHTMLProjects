const playerNameInput = document.getElementById('playerName');
const statInput = document.getElementById('statistic');
const valueInput = document.getElementById('value');
const overUnderInput = document.getElementById('overUnder');
const submitBtn = document.getElementById('submitBtn');
const parlaysList = document.getElementById('parlaysList');
const clearBtn = document.getElementById('clearBtn');

window.addEventListener('DOMContentLoaded', () => {
    loadParlays();
});

submitBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    const stat = statInput.value.trim();
    const value = valueInput.value.trim();
    const ou = overUnderInput.value.trim();

    if (!name || !stat || !value || !ou) return;

    const text = `${name} - ${ou} ${value} ${stat}`;
    const date = new Date().toLocaleDateString();
    addParlayItem(text, date);
    saveParlays();

    playerNameInput.value = '';
    statInput.value = '';
    valueInput.value = '';
    overUnderInput.value = '';
});

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('parlays');
    parlaysList.innerHTML = '';
});

function addParlayItem(text, date) {
    const item = document.createElement('div');
    item.className = 'parlay-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    input.addEventListener('input', saveParlays);

    const dateTag = document.createElement('div');
    dateTag.className = 'parlay-date';
    dateTag.textContent = date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'neon-btn';
    deleteBtn.style.padding = '5px 10px';
    deleteBtn.addEventListener('click', () => {
        item.remove();
        saveParlays();
    });

    item.appendChild(input);
    item.appendChild(dateTag);
    item.appendChild(deleteBtn);
    parlaysList.appendChild(item);
}

function saveParlays() {
    const allItems = [...parlaysList.children].map(item => {
        return {
            text: item.querySelector('input').value,
            date: item.querySelector('.parlay-date').textContent
        };
    });
    localStorage.setItem('parlays', JSON.stringify(allItems));
}

function loadParlays() {
    const saved = JSON.parse(localStorage.getItem('parlays')) || [];
    saved.forEach(({ text, date }) => addParlayItem(text, date));
}