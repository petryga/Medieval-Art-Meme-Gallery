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

// myApp.getImages.then(function (images) {
//     console.log(images);
// })

myApp.getJokes = $.ajax({
    url: myApp.jokesUrl,
    method: 'GET',
    dataType: 'json'
})

$.when(myApp.getImages, myApp.getJokes)
    .then(function (image, joke) {
        const { url } = image[0].data[0].images.web;
        // console.log(url, joke[0].joke);
        jokesArray.push(joke[0].joke);
        imagesArray.push(image.url);
        appendContent(url);
    })
    .fail(function (imageError, jokeError) {
        console.log(imageError, jokeError);
    })

const imagesArray = [];
const jokesArray = [];

// myApp.getJokes.then(function (jokes) {
//     jokesArray.push(jokes.joke)
// })

// ---- I turned your event listener into a function, and I call the function above in $.when (line 31)
const appendContent = function(imageLink) {
  $('#btn').on('click', function () {

    let pairToAppend = `
    <div class = "imageJokeBox">
      <p>${jokesArray}</p>
    </div>
    `;
    $('.appendToHere').append(pairToAppend);
    // ----- took the returned image and set it as the background image of div.image-container (had to set height and width for .image-container in _main.scss)
    $('.imageJokeBox').css('background-image', `url(${imageLink})`)
  })
}

