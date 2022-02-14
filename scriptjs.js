'use strict';
//constants and element selection

const API_URL = `https://attach-cors.herokuapp.com/https://www.mt-api.tech/api/v1`;
const MONSTER_DATA = 'creature-cards';
const ENEMIES_DATA = 'enemies';
const SPELL_DATA = 'spell-cards';
const ITEM_DATA = 'artifacts';
const sectionMonsterCardsEl = document.querySelector('.monster--cards');
const allMonstersBtnEl = document.querySelector('.btn--monster--cards--all');
const allSpellsBtnEl = document.querySelector('.btn--spell--cards--all');
const allEnemyBtnEl = document.querySelector('.btn--enemy--cards--all');
const allItemBtnEl = document.querySelector('.btn--items--all');
const sortBtns = document.querySelectorAll('.link');

//Header///
document.addEventListener('click', e => {
  const isDropdownButton = e.target.matches('[data-dropdown-button]');

  if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest('[data-dropdown]');
    currentDropdown.classList.toggle('active');
  }
  document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove('active');
  });
});

let monsterCardsArr = [];
let enemyCardsArr = [];
let spellCardsArr = [];
let itemCardsArr = [];
getData(SPELL_DATA, spellCardsArr);
getData(MONSTER_DATA, monsterCardsArr);
getData(ENEMIES_DATA, enemyCardsArr);
getData(ITEM_DATA, itemCardsArr);
console.log(itemCardsArr);
// function Makecard(cardName) {
//   this.name = cardName;
//   this.test = function () {
//     return `${this.name} YEs!`;
//   };
// }

// // https://www.mt-api.tech/api/v1/spell-card/sting
// async function getOneCard() {
//   const res = await fetch(
//     `https://attach-cors.herokuapp.com/https://www.mt-api.tech/api/v1/spell-cards/sting`
//   );
//   const data = await res.json();

//   const newCard = new Makecard(data.cardName);
//   console.log(newCard.test());
// }
// getOneCard();

async function getData(specificData, array) {
  const res = await fetch(`${API_URL}/${specificData}`);
  const data = await res.json();
  console.log(data);
  Object.entries(data).forEach(([key, value]) => array.push(value));
}

///////////////SHOW ALL CARDS//////////////

const showAll = function (array, type) {
  clearSection(sectionMonsterCardsEl);
  type === 1
    ? getEnemyCardInfo(array)
    : type === 2
    ? getMonsterCardInfo(array)
    : getItemCardInfo(array);

  toggleCard();
};

sortBtns.forEach(btn =>
  btn.addEventListener('click', e => {
    if (!btn.dataset.all) return;
    if (btn.dataset.all == 'enemy') showAll(enemyCardsArr, 1);
    if (btn.dataset.all == 'item') showAll(itemCardsArr, 3);
    if (btn.dataset.all == 'monster') showAll(monsterCardsArr, 2);
    if (btn.dataset.all == 'spell') showAll(spellCardsArr, 2);
  })
);

// rarity

sortBtns.forEach(btn =>
  btn.addEventListener('click', e => {
    if (!btn.dataset.rarity) return;
    clearSection(sectionMonsterCardsEl);
    const rarity = +btn.dataset.rarity;
    if (btn.dataset.card === 'monster') sortCards(monsterCardsArr, rarity);
    else if (btn.dataset.card === 'spell') sortCards(spellCardsArr, rarity);
    toggleCard();
  })
);

//cost
sortBtns.forEach(btn =>
  btn.addEventListener('click', e => {
    if (!btn.dataset.cost) return;
    clearSection(sectionMonsterCardsEl);
    const cost = +btn.dataset.cost;
    sortCards(spellCardsArr, 0, cost);
    toggleCard();
  })
);

function getMonsterCardInfo(cards) {
  cards.forEach(card => {
    let objectCard = card;
    objectCard = {
      name: card.cardName,
      image: card.imageURL,
      rarity: card.rarity,
      lore: card.cardLore,
    };

    renderMonsterCards(objectCard);
  });
}

function getEnemyCardInfo(cards) {
  cards.forEach(card => {
    let objectCard = card;
    objectCard = {
      name: card.enemyName,
      image: card.imageURL,
      lore: card.enemyLore,
      health: card.health,
      damage: card.damage,
    };

    renderEnemyCards(objectCard);
  });
}
function getItemCardInfo(cards) {
  cards.forEach(card => {
    let objectCard = card;
    objectCard = {
      name: card.artifactName,
      image: card.imageURL,
      lore: card.artifactLore,
      description: card.artifactDescription,
    };

    renderItemCards(objectCard);
  });
}

function getSpellCardInfo(cards) {
  cards.forEach(card => {
    let objectCard = card;
    objectCard = {
      name: card.cardName,
      image: card.imageURL,
      rarity: card.rarity,
      lore: card.cardLore,
      cost: card.emberCost,
    };

    renderMonsterCards(objectCard);
  });
}

function sortCards(array, rarityValue, costValue) {
  array.filter(card => {
    if (rarityValue) {
      if (card.rarity === rarityValue) {
        let objectCard = card;
        objectCard = {
          name: card.cardName,
          image: card.imageURL,
          rarity: card.rarity,
          lore: card.cardLore,
        };

        renderMonsterCards(objectCard);
      }
    }
    if (costValue === 0 || costValue) {
      if (card.emberCost === costValue) {
        let objectCard = card;
        objectCard = {
          name: card.cardName,
          image: card.imageURL,
          rarity: card.rarity,
          lore: card.cardLore,
        };
        renderMonsterCards(objectCard);
      }
    }
  });
}

// Render functions

function renderMonsterCards(data) {
  const markup = `<div class="monster--container">
    <img class="monster--image" src="${data.image}" alt="${data.name}" />
    <div class="monster--card">
      <div class="monster--info--container">
        
        <p class="monster--lore">${data.lore} </p>
      </div>
    </div>
    <button class="toggle">
      <i class="fas fa-chevron-down"></i>
      <i class="fas fa-times"></i>
    </button>
  </div>`;
  sectionMonsterCardsEl.insertAdjacentHTML('beforeend', markup);
}

function renderEnemyCards(data) {
  const markup = `<div class="monster--container enemy">
  <img class="monster--image enemy" src="${data.image}" alt="${data.name}" />
  <h2 class="monster--name">${data.name}s</h2>
  <div class="monster--card">
    <div class="monster--info--container">
      
      <p class="enemy--info"> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon--heart" viewBox="0 0 512 512"><title>Heart</title><path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z"/></svg>${data.health}</p>
      <p class="enemy--info"> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon--damage" viewBox="0 0 512 512"><title>Barbell</title><path d="M467 176a29.94 29.94 0 00-25.32 12.5 2 2 0 01-3.64-1.14v-36.65c0-20.75-16.34-38.21-37.08-38.7A38 38 0 00362 150v82a2 2 0 01-2 2H152a2 2 0 01-2-2v-81.29c0-20.75-16.34-38.21-37.08-38.7A38 38 0 0074 150v37.38a2 2 0 01-3.64 1.14A29.94 29.94 0 0045 176c-16.3.51-29 14.31-29 30.62v98.72c0 16.31 12.74 30.11 29 30.62a29.94 29.94 0 0025.32-12.5 2 2 0 013.68 1.16v36.67C74 382 90.34 399.5 111.08 400A38 38 0 00150 362v-82a2 2 0 012-2h208a2 2 0 012 2v81.29c0 20.75 16.34 38.21 37.08 38.7A38 38 0 00438 362v-37.38a2 2 0 013.64-1.14A29.94 29.94 0 00467 336c16.3-.51 29-14.31 29-30.62v-98.74c0-16.31-12.74-30.11-29-30.64z"/></svg> ${data.damage}</p>
      <p class="monster--lore">${data.lore}</p>
    </div>
  </div>
  <button class="toggle">
    <i class="fas fa-chevron-down"></i>
    <i class="fas fa-times"></i>
  </button>
</div>`;
  sectionMonsterCardsEl.insertAdjacentHTML('beforeend', markup);
}

function renderItemCards(data) {
  const markup = `<div class="monster--container enemy">
  <img class="monster--image enemy" src="${data.image}" alt="${data.name}" />
  <h2 class="monster--name">${data.name}</h2>
  <div class="monster--card">
    <div class="monster--info--container">
      <p class="monster--lore description">${data.description} </p>
      
      <p class="monster--lore">${data.lore}</p>
    </div>
  </div>
  <button class="toggle">
    <i class="fas fa-chevron-down"></i>
    <i class="fas fa-times"></i>
  </button>
</div>`;
  sectionMonsterCardsEl.insertAdjacentHTML('beforeend', markup);
}

// Helper functions

function clearSection(element) {
  element.innerHTML = '';
}

function toggleCard() {
  const toggleEl = document.querySelectorAll('.toggle');
  toggleEl.forEach(btn =>
    btn.addEventListener('click', () => {
      const parent = btn.closest('.monster--container');
      parent.classList.toggle('active');
    })
  );
}
toggleCard();
