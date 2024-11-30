document.addEventListener("DOMContentLoaded", () => {
    const timeData = document.getElementById("timeData");
  
    function formatTime(ms) {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    }
  
    chrome.storage.local.get("siteTimes", (data) => {
      const times = data.siteTimes || {};
      timeData.innerHTML = "";
  
      for (const [site, time] of Object.entries(times)) {
        const row = document.createElement("tr");
        const siteCell = document.createElement("td");
        const timeCell = document.createElement("td");
  
        siteCell.textContent = site;
        timeCell.textContent = formatTime(time);
  
        row.appendChild(siteCell);
        row.appendChild(timeCell);
        timeData.appendChild(row);
      }
    });
  });
  