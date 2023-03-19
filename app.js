// Number Facts

// Part 1
let url = "http://numbersapi.com/"

// Get a fact about your favorite number.
axios.get(url + "5?json")
.then(res => $("#p1-s1").append(`<li>${res.data.text}</li>`))
.catch(err => console.log(err));

// Get data on multiple numbers in a single request.
axios.get(url + "6..12,15" + "?json")
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
        axios.get(url + "5?json")
    );
}

Promise.all(numPromises)
.then(numFact => (
    numFact.forEach(fact => $("#p1-s3").append(`<li>${fact.data.text}</li>`))
))
