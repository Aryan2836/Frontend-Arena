const tableBody = document.querySelector("#practice-table-body");
tableBody.innerHTML = practiceMissions.map(mission => createMissionRow(mission)).join("");
