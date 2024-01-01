const createCard = (suit, symbol, value) => {
  return {
    suit,
    pipSymbol: symbol,
    pipValue: value,
  };
};

const createFlush = ({ name, symbol }) => {
  const pipValues = [
    `A`,
    `2`,
    `3`,
    `4`,
    `5`,
    `6`,
    `7`,
    `8`,
    `9`,
    `10`,
    `J`,
    `Q`,
    `K`,
  ];

  return pipValues.map((pip) => createCard(name, symbol, pip));
};

const createDeck = () => {
  const suits = [
    { name: `spades`, symbol: `♠️` },
    { name: `clubs`, symbol: `♣️` },
    { name: `diamonds`, symbol: `♦️` },
    { name: `hearts`, symbol: `♥️` },
  ];

  return suits.flatMap(createFlush);
};

const shuffle = (arr) => {
  return arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

const shuffleDeck = (deck) => {
  return shuffle(shuffle(deck));
};

//

const getNextCard = (arr, currentIndex) => {
  if (currentIndex > arr.length - 1) {
    return { card: arr[0], index: 0 };
  } else {
    return { card: arr[currentIndex + 1], index: currentIndex + 1 };
  }
};

const init = () => {
  const deck = shuffleDeck(createDeck());

  const card = document.querySelector(`#card`);
  const pipValue = document.querySelector(`#pip-value`);
  const symbol = document.querySelector(`#symbol`);

  let currentIndex = 0;
  pipValue.innerHTML = deck[0].pipValue;
  symbol.innerHTML = deck[0].pipSymbol;

  card.addEventListener(`click`, () => {
    const nextCard = getNextCard(deck, currentIndex);

    currentIndex = nextCard.index;

    pipValue.innerHTML = nextCard.card.pipValue;
    symbol.innerHTML = nextCard.card.pipSymbol;
  });
};

window.addEventListener(`DOMContentLoaded`, () => {
  init();
});
