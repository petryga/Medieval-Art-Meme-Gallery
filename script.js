const myApp = {}

myApp.imagesUrl = `https://openaccess-api.clevelandart.org/api/artworks/`
myApp.jokesUrl = `https://icanhazdadjoke.com/`

myApp.getImages = $.ajax({
    url: myApp.imagesUrl,
    method: 'GET',
    dataType: 'json',
    //added data; later on we could create our predefined search options by changing q value
data: {
  q: 'portrait',
  hasImage: 1,
  // department: 'Medieval Art', - returns only 9 objects ;(( maybe later we could filter by some other department if we want to
  type: 'Painting',
}


}).fail(function (imageError) {
  alert(`Joke content failed: ${imageError.statusText}`);
  console.log(imageError);
})

myApp.getJokes = $.ajax({
    url: myApp.jokesUrl,
    method: 'GET',
    dataType: 'json'
}).fail(function (jokeError) {
  alert(`Get joke failed: ${jokeError.statusText}`);
  console.log(jokeError);
  // maybe display 404 message if we have time for that feature
})

$.when(myApp.getImages, myApp.getJokes)
    .then(function (image, joke) {
// get a random image 
for (let i = 0; i < image[0].data.length; i++) {
  const imagesUrl = image[0].data[i].images.web.url;
  // console.log(imagesUrl);
  imagesArray.push(imagesUrl)
}
        // const { url } = image[0].data[0].images.web; //first image url - remove later 
        jokesArray.push(joke[0].joke);
        // imagesArray.push(image.url);
        $('.invisible').remove();
        appendContent(url); //not url anymore - gotta fix
    })
    
const imagesArray = [];
const jokesArray = [];

console.log(imagesArray);

myApp.randomizer = function(array) {
  const randomArrayIndex = Math.floor(Math.random() * array.length);
  return array[randomArrayIndex]
}

const imagesToDisplay = myApp.randomizer(imagesArray)
// console.log(imagesToDisplay);

// I am stuck here. I could get images urls and put them in an array (line 49), and it displays well when I console.log it (line 52)
//but when i try to apply randomizer, it shows as undefined, and I can't figure out why. (log on line 60) MUCH STRUGGLE


const appendContent = function(imageLink) {
  let pairToAppend = `
  <div class = "imageJokeBox">
    <p>${jokesArray}</p>
  </div>
  `;
  $('.appendToHere').append(pairToAppend);
  $('.imageJokeBox').css('background-image', `url(${imagesToDisplay})`)

  //BTW great idea to use background images - they don't need alt text :D

  // $('#btn').on('click', function () {
  // })
}

