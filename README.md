var popup = window.open("", "popup", "width=740,height=220");
var html = "<style>body { font-family: Arial; background-color:black; color: white;}</style><ul>";

var pirateHighscore = document.getElementById("pirateHighscore");
var lis = pirateHighscore.getElementsByTagName("li");

for (var i = 0; i < lis.length; i++) {
  
  var li = lis[i];
  var place = li.querySelector(".place").textContent.trim();
  var pirateBooty = li.querySelector(".pirateBooty").textContent.trim();
  var linkElement = li.querySelector(".userName");
  var name = linkElement.textContent.trim();
  var link = null;
  var onclickAttr = linkElement.getAttribute("onclick");
  
  if (onclickAttr) {
    
    var cityIdMatch = onclickAttr.match(/cityId=(\d+)/);
    
    if (cityIdMatch) {
      
      var cityId = cityIdMatch[1];
      link = "https://s401-en.ikariam.gameforge.com/?view=island&cityId=" + cityId;
    }
  }

  if (link) {
    html += "<li>" + place + pirateBooty + " &nbsp " + link + "&nbsp (" + name + ") " + "</li>";
  } else {
    html += "<li>" + place + pirateBooty + " &nbsp (" + name + ") " + "</li>";
  }
}

html += "</ul>";
popup.document.body.innerHTML = html;
