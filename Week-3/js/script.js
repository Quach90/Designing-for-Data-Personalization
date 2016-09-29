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
    'insider'
]



function setup() {
    createCanvas(windowWidth, windowHeight);

    sections.forEach(function(e, i) {
        callApi(e, i);
    })

}

var singleMode = false;
var chosen;

function draw() {
    background('white');
    if (singleMode) {
        chosen.drawSingle();
        if(mouseIsPressed && mouseX >= windowWidth/2 - 150 && mouseX <= windowWidth/2 + 150 && mouseY >= windowHeight/2 - 150 && mouseY <= windowHeight/2 + 150){
          singleMode = false;
        }
    } else {
        sectionList.forEach(function(e, i) {
            e.draw();
            if (e.isActivated()) {
                e.changeColor('green');
                if (mouseIsPressed) {
                    singleMode = true;
                    chosen = e;
                }
            } else {
                e.changeColor('red');
            }
        })
    }
}

var sectionList = [];

var x = 150;
var y = 150;

function callApi(section, i) {
    setTimeout(requestSection, i * 250);

    function requestSection() {
        var requestUrl = "https://api.nytimes.com/svc/topstories/v2/" + section + "." + format + "?api-key=" + apiKey;
        $.getJSON(requestUrl)
            .done(function(data) {

                sectionList.push((new SectionShape(data, x, y)));

                x += 150;

                if (x > windowWidth - 75) {
                    y += 150;
                    x = 150;
                }

            })
            .fail(function() {
                console.log("Error with NYT API");
            })
    }
}

function SectionShape(data, x, y) {
    this.x = x;
    this.y = y;
    this.data = data;
    this.numberOfResults = data.num_results * 2;
    this.isActive = false;
    this.fillColor = 'red'

    console.log(this.data);

    this.draw = function() {
        fill(this.fillColor);
        // ellipse(random(100, windowWidth-100), random(100, windowHeight-100), data.num_results, data.num_results);
        textSize(12);
        textAlign(CENTER);
        text(this.data.section, this.x, this.y - 75);
        ellipse(this.x, this.y, this.numberOfResults, this.numberOfResults)
    }

    this.isActivated = function() {
        //reset to false
        this.isActive = false;
        if (mouseX >= this.x - this.numberOfResults && mouseX <= this.x + this.numberOfResults && mouseY >= this.y - this.numberOfResults && mouseY <= this.y + this.numberOfResults) {
            return this.isActive = true;
        }
        return this.isActive = false;
    }

    this.changeColor = function(color) {
        this.fillColor = color;
    }

    this.drawSingle = function() {
        fill('red');
        ellipse(windowWidth/2, windowHeight/2, 800, 800);
        fill('green');
        ellipse(windowWidth/2, windowHeight/2, 150, 150);
        fill('black')
        textAlign(CENTER);
        textSize(30);
        text('BACK', windowWidth/2, windowHeight/2 + 10)
        push();
        translate(windowWidth/2, windowHeight/2);
        textAlign(LEFT);
        var angle = (2*PI)/this.data.results.length
        textSize(12);
        this.data.results.forEach(function(e, i){
          text(e.title, 80, 0);
          rotate(angle);
        })
        pop();
    }

}
