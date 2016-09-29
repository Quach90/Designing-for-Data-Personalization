var apiKey = "63277e4bd190439e9793245a67110b55";
var format = "json";

var sections = ['home', 'opinion',
'world',
'national',
'politics',
'upshot',
'nyregion',
'business',
'technology',
'science',
'health',
'sports',
'arts',
'books',
'movies',
'theater',
'sundayreview',
'fashion',
'tmagazine',
'food',
'travel',
'magazine',
'realestate',
'automobiles',
'obituaries',
'insider']



function setup(){
  createCanvas(windowWidth, windowHeight);

  sections.forEach(function(e, i){
    callApi(e, i);
  })

}

function callApi(section, i){
  setTimeout(requestSection, i*150);

  function requestSection(section){
    var requestUrl = "https://api.nytimes.com/svc/topstories/v2/" + section + "." + format + "?api-key=" + apiKey;
    $.getJSON(requestUrl)
    .done(function(data) {

        console.log(section, data);

        fill('red');
        ellipse(random(100, windowWidth-100), random(100, windowHeight-100), data.num_results, data.num_results);

    })
    .fail(function(){
      console.log("Error with NYT API");
    })
  }
}



function nextArticle(articles, current){

}
