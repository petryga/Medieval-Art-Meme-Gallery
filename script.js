const myApp = {}

myApp.imagesUrl = `https://openaccess-api.clevelandart.org/api/artworks/`
myApp.jokesUrl = `https://icanhazdadjoke.com/`

myApp.getImages = $.ajax({
    url: myApp.imagesUrl,
    method: 'GET',
    dataType: 'json'
})
// .then(function(imagesResponse){
// console.log(imagesResponse);
// })

myApp.getImages.then(function (images) {
    // console.log(images);
})

myApp.getJokes = $.ajax({
    url: myApp.jokesUrl,
    method: 'GET',
    dataType: 'json'
})

const jokesArray = []

myApp.getJokes.then(function (jokes) {
    jokesArray.push(jokes.joke)
})

$('#btn').on('click', function () {
    let jokeToAppend = `<p>${jokesArray}</p>`
    $('#quote-text').html(jokeToAppend)
})
