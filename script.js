const PROGRESS_KEY = "fa-progress-v1";

function readStorage(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch (error) {
    showStorageNotice("Saved browser data could not be read. The page will still work for this visit.");
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    showStorageNotice("This browser blocked saving. Your current changes will not remain after refresh.");
    return false;
  }
}

function showStorageNotice(message) {
  const notice = document.querySelector("#storage-notice");
  if (!notice) return;
  notice.hidden = false;
  notice.textContent = message;
}

function getCompletedMissions() {
  const stored = readStorage(PROGRESS_KEY, []);
  if (!Array.isArray(stored)) return [];
  return stored.filter(id => Number.isInteger(id) && id >= 1 && id <= curriculum.length);
}

function completeMission(missionId) {
  const completed = getCompletedMissions();
  const status = document.querySelector("#completion-status");
  if (!completed.includes(missionId)) {
    completed.push(missionId);
    writeStorage(PROGRESS_KEY, completed);
  }
  if (status) {
    status.dataset.state = "success";
    status.textContent = "Checkpoint complete. Your progress is saved in this browser.";
  }
  updateProgressUI();
  renderMissionNavigation();
}

function getEarnedXp(completed) {
  return curriculum
    .filter(mission => completed.includes(mission.id))
    .reduce((total, mission) => total + mission.xp, 0);
}

function updateProgressUI() {
  const completed = getCompletedMissions();
  const percent = Math.round((completed.length / curriculum.length) * 100);
  document.querySelectorAll("[data-progress-count]").forEach(element => { element.textContent = completed.length; });
  document.querySelectorAll("[data-progress-total]").forEach(element => { element.textContent = curriculum.length; });
  document.querySelectorAll("[data-progress-percent]").forEach(element => { element.textContent = `${percent}%`; });
  document.querySelectorAll("[data-progress-fill]").forEach(element => { element.style.width = `${percent}%`; });
  document.querySelectorAll('[role="progressbar"]').forEach(element => { element.setAttribute("aria-valuenow", completed.length); });
  document.querySelectorAll("[data-xp]").forEach(element => { element.textContent = getEarnedXp(completed); });
  document.querySelectorAll("[data-mission-id]").forEach(element => {
    const isComplete = completed.includes(Number(element.dataset.missionId));
    element.dataset.complete = isComplete;
    const status = element.querySelector(".roadmap-status");
    if (status) status.textContent = isComplete ? "Complete" : "Open mission";
  });
}

function renderMissionNavigation() {
  const list = document.querySelector("#mission-navigation");
  if (!list) return;
  const currentId = Number(document.body.dataset.mission);
  const completed = getCompletedMissions();
  list.innerHTML = "";
  curriculum.forEach(mission => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = mission.path;
    link.dataset.complete = completed.includes(mission.id);
    if (mission.id === currentId) link.setAttribute("aria-current", "step");
    link.innerHTML = `<span class="side-number">${String(mission.id).padStart(2, "0")}</span><span>${mission.title}</span>`;
    item.appendChild(link);
    list.appendChild(item);
  });
}

function setupMenu() {
  const button = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (!button || !nav) return;
  button.hidden = false;
  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    button.setAttribute("aria-expanded", isOpen);
    button.textContent = isOpen ? "Close" : "Menu";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.textContent = "Menu";
  }));
}

function escapeHTML(value) {
  const element = document.createElement("span");
  element.textContent = String(value);
  return element.innerHTML;
}

setupMenu();
updateProgressUI();
renderMissionNavigation();
