$(document).ready(function() {
    var apiKey = "63277e4bd190439e9793245a67110b55";
    var section = "home";
    var format = "json";

    var requestUrl = "https://api.nytimes.com/svc/topstories/v2/" + section + "." + format + "?api-key=" + apiKey;
    $.getJSON(requestUrl)
    .done(function(data) {

        console.log(data);

        var articles = data.results;


        var article = articles[1];

        nextArticle(articles, 0);

    })
    .fail(function(){
      console.log("Error with NYT API");
    })
});

function nextArticle(articles, current){
  var article = articles[current];
  $("#cardHeader").text(article.title);
  if(article.multimedia.length > 0){
    $("#cardImage").attr("src", article.multimedia[4].url);
  }else{
    $("#cardImage").attr("src", "http://epaper2.mid-day.com/images/no_image_thumb.gif");
  }
  $("#cardSubtext").text(article.abstract);
  $("#readMore").click(function() {
    window.open(article.url,'_blank');
  })

  $("#next").click(function() {
    nextArticle(articles, current+1);
  })
}
