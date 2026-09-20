const missionForm = document.querySelector("#mission-form");
const createdList = document.querySelector("#created-missions");
const formStatus = document.querySelector("#form-status");

function renderCreatedMissions() {
  if (!practiceMissions.length) {
    createdList.innerHTML = '<p class="empty-state">No practice missions yet.</p>';
    return;
  }
  createdList.innerHTML = practiceMissions.slice().reverse().map(mission =>
    `<article class="article-card"><h3>${escapeHTML(mission.title)}</h3><p class="article-meta">${escapeHTML(mission.difficulty)} · ${mission.xp} XP</p></article>`
  ).join("");
}

missionForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(missionForm);
  const title = String(formData.get("title")).trim();
  const difficulty = String(formData.get("difficulty"));
  const xp = Number(formData.get("xp"));

  if (!title || title.length > 100 || !["easy", "medium", "hard"].includes(difficulty) || !Number.isInteger(xp) || xp < 1 || xp > 200) {
    formStatus.dataset.state = "error";
    formStatus.textContent = "Enter a title, a valid difficulty and a whole XP value from 1 to 200.";
    return;
  }

  practiceMissions.push({ id: Date.now(), title, difficulty, xp, completed: false });
  savePracticeMissions();
  renderCreatedMissions();
  missionForm.reset();
  formStatus.dataset.state = "success";
  formStatus.textContent = "Mission object created, saved and rendered below.";
  completeMission(6);
});

renderCreatedMissions();
