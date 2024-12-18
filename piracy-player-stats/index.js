var popup = window.open("", "popup", "width=600,height=350");
var html = "";

function durationToSeconds(durationStr) {
    let seconds = 0;
    if (durationStr.includes('h')) {
        const hours = parseInt(durationStr.match(/(\d+)h/)[1]);
        seconds += hours * 3600;
    }
    if (durationStr.includes('m')) {
        const minutes = parseInt(durationStr.match(/(\d+)m/)[1]);
        seconds += minutes * 60;
    }
    if (durationStr.includes('s')) {
        const secs = parseInt(durationStr.match(/(\d+)s/)[1]);
        seconds += secs;
    }
    return seconds;
}

var captureData = [];

document.querySelectorAll(".table01 tbody tr").forEach(row => {
    var name = row.querySelector("td:nth-child(2)").textContent.trim();

    var durationText = row.querySelector(".requirement .time").textContent
        .replace("Duration: ", "").trim();

    var rewardText = row.querySelector(".reward .capturePoints").textContent
        .replace(/[^0-9,]/g, "").trim();

    captureData.push({
        name: name,
        durationSeconds: durationToSeconds(durationText),
        rewardPoints: parseInt(rewardText.replace(/,/g, ""), 10)
    });
});

var crewStrength = parseInt(document.querySelector(".pirateCrew .breakdown_table tr:last-of-type .value")
    .textContent.replace(/,/g, ""), 10);

var totalCapturePoints = parseInt(document.querySelector(".resources .capturePoints .value")
    .textContent.replace(/,/g, ""), 10);

var serverTime = new Date(document.getElementById("servertime").textContent.replace(" CET", "")
    .replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));

var ongoingMission = document.querySelector(".ongoingMission.capture");

if (ongoingMission) {
    var progressBar = ongoingMission.querySelector(".progressbar .bar");
    var progressPercentage = parseFloat(progressBar.style.width) || 0;
    var missionTimeText = ongoingMission.querySelector(".time").textContent.trim();

    var remainingTimeSeconds = durationToSeconds(missionTimeText);
    var totalDurationSeconds = Math.round(remainingTimeSeconds / (1 - (progressPercentage / 100)));
    var currentMission = captureData.find(mission =>
        Math.abs(mission.durationSeconds - totalDurationSeconds) < 60
    );

    if (currentMission) {
        var completionTime = new Date(serverTime.getTime() + remainingTimeSeconds * 1000);

        html += `<li><strong>Report generated at:</strong> ${serverTime}</li>`;
        html += `<br>`;
        html += `<li><strong>Crew Strength:</strong> ${crewStrength}</li>`;
        html += `<li><strong>Current Amount of Capture Points:</strong> ${totalCapturePoints}</li>`;
        html += `<br>`;
        html += `<li><strong>Mission Time Remaining:</strong> ${missionTimeText}</li>`;
        html += `<li><strong>Reward Upon Completion:</strong> ${currentMission.rewardPoints} Capture Points</li>`;
        html += `<br>`;
        html += `<li><strong>Total Capture Points After Completion:</strong> ${totalCapturePoints + currentMission.rewardPoints}</li>`;
        html += `<li><strong>Points will be raidable at:</strong> ${completionTime.toLocaleString("en-GB")}</li>`;
    } else {
        html += `<li><strong>Error: Could not determine current mission. Try again in a couple of seconds.</strong></li>`;
    }
} else {
    html += `<li><strong>Report generated at:</strong> ${serverTime}</li>`;
    html += `<br>`;
    html += `<li><strong>Crew Strength:</strong> ${crewStrength}</li>`;
    html += `<li><strong>Current Capture Points:</strong> ${totalCapturePoints}</li>`;
}

html += `<button onclick="
    var content = document.body.innerText;
    navigator.clipboard.writeText(content).then(function() {
        alert('Text copied to clipboard!');
    });
">Copy</button>`;

popup.document.body.innerHTML = html;
