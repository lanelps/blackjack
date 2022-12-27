const createCard = (index, suit, symbol, value) => {
  return {
    id: index,
    suit,
    pipSymbol: symbol,
    pipValue: value,
  };
};

const createFlush = ({ name, symbol }) => {
  const flush = [];

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

  pipValues.forEach((pip, index) => {
    flush.push(createCard(index, name, symbol, pip));
  });

  return flush;
};

const createDeck = () => {
  const deck = [];

  const suits = [
    { name: `spades`, symbol: `♠️` },
    { name: `clubs`, symbol: `♣️` },
    { name: `diamonds`, symbol: `♦️` },
    { name: `hearts`, symbol: `♥️` },
  ];

  suits.forEach((suite) => {
    deck.push(createFlush(suite));
  });

  return deck.flat();
};

const shuffle = (arr) => {
  return arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

const shuffleDeck = (deck) => {
  return shuffle(shuffle(deck));
};

//

const nextCard = (arr, currentIndex) => {
  if (currentIndex > arr.length - 1) {
    return { card: arr[0], index: 0 };
  } else {
    return { card: arr[currentIndex++], index: currentIndex++ };
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
    const next = nextCard(deck, currentIndex);

    currentIndex = next.index;

    pipValue.innerHTML = next.card.pipValue;
    symbol.innerHTML = next.card.pipSymbol;
  });
};

window.addEventListener(`DOMContentLoaded`, () => {
  init();
});
