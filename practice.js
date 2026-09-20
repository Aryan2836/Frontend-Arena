const PRACTICE_KEY = "fa-practice-v1";

function isValidPracticeMission(mission) {
  return mission && Number.isFinite(mission.id) && typeof mission.title === "string" &&
    ["easy", "medium", "hard"].includes(mission.difficulty) && Number.isFinite(mission.xp);
}

function loadPracticeMissions() {
  let stored = readStorage(PRACTICE_KEY, null);
  if (!stored) stored = readStorage("missions", null);
  if (!Array.isArray(stored)) return defaultPracticeMissions.map(mission => ({ ...mission }));
  const valid = stored.filter(isValidPracticeMission);
  return valid.length ? valid : defaultPracticeMissions.map(mission => ({ ...mission }));
}

let practiceMissions = loadPracticeMissions();

function savePracticeMissions() {
  writeStorage(PRACTICE_KEY, practiceMissions);
}

function createMissionRow(mission, includeStatus = true) {
  const statusCell = includeStatus ? `<td>${mission.completed ? "Done" : "Pending"}</td>` : "";
  return `<tr><td>${escapeHTML(mission.title)}</td><td><span class="difficulty-${escapeHTML(mission.difficulty)}">${escapeHTML(mission.difficulty)}</span></td><td>${mission.xp} XP</td>${statusCell}</tr>`;
}
