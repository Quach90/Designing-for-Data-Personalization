$(document).ready(function() {
    $.getJSON("resume.json", function(data) {
        var items = [];

        $("#title").text(data.name);

        $("#website").text(data.website);

        $("#location").text(data.location);

        $("#mail").text(data.mail);

        $("#skills").append("<h3>Skills</h3>");

        $.each(data.skills, function(index, element) {
          $("#skills").append("<p style='font-size: 12pt;'><strong>" + element.category + "</strong></p>");
          var items = [];
          $.each(element.items , function(key, val){
            items.push(val);
            if(key+1 < element.items.length){
              items.push(", ");
            }else{
              items.push(".");
            }
          })
          $("<p/>", {
              html: items.join("")
          }).appendTo("#skills");
        })

        $("#exhibitions").append("<h3>Exhibitions</h3>");
        var items = [];
        $.each(data.exhibitions , function(key, val){
          items.push(val);
          if(key+1 < data.exhibitions.length){
            items.push("<br/>");
          }
        })
        $("<p/>", {
            html: items.join("")
        }).appendTo("#exhibitions");

        $("#experience").append("<h3>Experience</h3>");

        $.each(data.experience, function(index, element) {

          $("#experience").append("<p style='font-size: 12pt;'><strong>" + element.organization + "</strong>, " + element.position + "</p>");
          $("#experience").append("<p>" + element.startDate + " - " + element.endDate + "</p>");

          var items = [];
          $.each(element.descriptionItems , function(key, val){
            items.push("<li>" + val + "</li>");
          })
          $("<ul/>", {
              html: items.join("")
          }).appendTo("#experience");
        })

        $("#education").append("<h3>Experience</h3>");

        $.each(data.education, function(index, element) {

          $("#education").append("<p><strong>" + element.school + "</strong>, " + element.department + "</p>");
          $("#education").append("<p>" + element.degree + "</p>");
          $("#education").append("<p>" + element.startDate + " - " + element.endDate + "</p>");

          var items = [];
          $.each(element.notes , function(key, val){
            items.push("<li>" + val + "</li>");
          })
          $("<ul/>", {
              html: items.join("")
          }).appendTo("#education");
        })
    })
});
