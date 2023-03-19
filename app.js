// Number Facts

// Part 1
let num_url = "http://numbersapi.com/"

// Get a fact about your favorite number.
axios.get(num_url + "5?json")
.then(res => $("#p1-s1").append(`<li>${res.data.text}</li>`))
.catch(err => console.log(err));

// Get data on multiple numbers in a single request.
axios.get(num_url + "6..12,15" + "?json")
.then(res => {
    for (let num of Object.values(res.data)) {
        $("#p1-s2").append(`<li>${num}</li>`);
    };
})
.catch(err => console.log(err));

// Get 4 facts on your favorite number.
let numPromises = [];

for (let i = 0; i < 4; i++) {
    numPromises.push(
        axios.get(num_url + "5?json")
    );
}

Promise.all(numPromises)
.then(numFact => (
    numFact.forEach(fact => $("#p1-s3").append(`<li>${fact.data.text}</li>`))
))

// Step 2
let card_url;
let cardsLeft = 52;

function shuffle() {
    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => {
        let deckId = res.data.deck_id;
        card_url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    })
    .catch(err => console.log(err));
}

shuffle()
function pickCard() {
    cardsLeft -= 1; 
    if (cardsLeft == 0) {
        $("#btn").text("End of Deck");
        $("#btn").prop('disabled', true);
    }
    setTimeout(() => {
        axios.get(card_url)
        .then(res => {
            let value = res.data.cards[0].value;
            let suit = res.data.cards[0].suit;
            $(".card-body").append(`<img src="${res.data.cards[0].image}">`);
            console.log(`${value} of ${suit}`);
        })
        .catch(err => console.log(err));
    }, 500)
}

$("#btn").click(pickCard)
