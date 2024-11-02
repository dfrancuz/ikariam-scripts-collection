<div align="center">
  <img src="https://github.com/user-attachments/assets/8fd27144-6dca-4cb9-91f6-1054c2133bca" alt="IKARIAM" width="500"/>
</div>

> [!NOTE]
> This script assists in displaying the Pirate Highscores in Ikariam and provides shareable links for your allies. Follow the steps below to ensure you're in the correct window before running the script.

**Steps:**

1. Press F12 on your keyboard to open the Developer Tools and confirm you're in [this window](https://imgur.com/a/05FW59V).
2. Click on the Pirate Fortress to open it.
3. Copy and paste the script below into your browser's Developer Tools console.

The script will open a small popup window showing the Pirate Highscores with clickable links that you can share easily with allies.

```
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
```
