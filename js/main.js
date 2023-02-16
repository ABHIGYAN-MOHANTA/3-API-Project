if (!localStorage.getItem("player1Score")) {
  localStorage.setItem("player1Score", 0);
}
if (!localStorage.getItem("player2Score")) {
  localStorage.setItem("player2Score", 0);
}

let deck_id;
if (!localStorage.getItem("deck_id")) {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      localStorage.setItem("deck_id", data.deck_id);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
} else {
  deck_id = localStorage.getItem("deck_id");
  console.log(`Deck id used from previous sessions: ${deck_id}`);
}

document.querySelector("button").addEventListener("click", getFetch);

function getFetch() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      document.querySelector("#player1img").src = data.cards[0].image;
      document.querySelector("#player2img").src = data.cards[1].image;
      let value1 = calVal(data.cards[0].value);
      let value2 = calVal(data.cards[1].value);
      if (value1 > value2) {
        document.querySelector("h3").innerText = "Player 1 wins";
        localStorage.setItem(
          "player1Score",
          Number(localStorage.getItem("player1Score")) + 1
        );
        document.querySelector(
          "h4"
        ).innerText = `Player 1 score: ${localStorage.getItem("player1Score")} Player 2 score: ${localStorage.getItem("player2Score")}`;
      } else {
        document.querySelector("h3").innerText = "Player 2 wins";
        localStorage.setItem(
          "player2Score",
          Number(localStorage.getItem("player2Score")) + 1
        );
        document.querySelector(
          "h4"
        ).innerText = `Player 1 score: ${localStorage.getItem("player1Score")} || Player 2 score: ${localStorage.getItem("player2Score")}`;
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function calVal(cardVal) {
  if (cardVal === "JACK") return 11;
  else if (cardVal === "QUEEN") return 12;
  else if (cardVal === "KING") return 13;
  else if (cardVal === "ACE") return 14;
  else return Number(cardVal);
}

const year = new Date().getFullYear();
document.querySelector("footer p").innerText = `Copyright ⓒ ${year}`;
