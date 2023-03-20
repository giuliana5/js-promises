// Number Facts

// Part 1
const num_url = "http://numbersapi.com/"

// Get a fact about your favorite number.
async function getFavNumFact() {
    const res = await axios.get(num_url + "5?json");
    $("#p1-s1").append(`<li>${res.data.text}</li>`);
}

// Get data on multiple numbers in a single request.
async function getFactMultNum() {
    const res = await axios.get(num_url + "6..12,15" + "?json")
    for (let num of Object.values(res.data)) {
        $("#p1-s2").append(`<li>${num}</li>`);
    };
}

// Get 4 facts on your favorite number.
async function fourFacts() {
    for (let i = 0; i < 4; i++) {
        let res = await axios.get(num_url + "5?json");

        fact = res.data.text
        $("#p1-s3").append(`<li>${fact}</li>`)
    }
}

// Step 2
// Object to hold async functions and api data.
const deck = {
    async init() {
        let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        this.deckId = res.data.deck_id
    },
    async shuffle() {
        await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`);
    },
    async drawCard() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
        this.value = res.data.cards[0].value;
        this.suit = res.data.cards[0].suit;
        this.image = res.data.cards[0].image;
        console.log(this.value + " of " + this.suit);
    }
}

let cardsLeft = 52;

async function pickCard() {
    cardsLeft -= 1; 
    if (cardsLeft == 0) {
        $("#btn").text("End of Deck");
    }

    await deck.drawCard()

    $(".card-body").append(`<img src=${deck.image}>`);
}

$("#btn").click(pickCard)

deck.init()
