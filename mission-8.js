const searchInput = document.querySelector("#mission-search");
const difficultySelect = document.querySelector("#mission-difficulty");
const sortButtons = document.querySelectorAll("[data-sort]");
const filterReset = document.querySelector("#filter-reset");
const filterStatus = document.querySelector("#filter-status");
const filteredBody = document.querySelector("#filtered-table-body");
const reviewButton = document.querySelector("#filter-review");
const FILTER_KEY = "fa-filters-v1";
let sortOrder = "none";

function loadFilterState() {
  const saved = readStorage(FILTER_KEY, {});
  searchInput.value = typeof saved.search === "string" ? saved.search : "";
  difficultySelect.value = ["", "easy", "medium", "hard"].includes(saved.difficulty) ? saved.difficulty : "";
  sortOrder = ["none", "asc", "desc"].includes(saved.sortOrder) ? saved.sortOrder : "none";
}

function saveFilterState() {
  writeStorage(FILTER_KEY, { search: searchInput.value, difficulty: difficultySelect.value, sortOrder });
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const difficulty = difficultySelect.value;
  let visible = practiceMissions.filter(mission => {
    const matchesText = mission.title.toLowerCase().includes(query);
    const matchesDifficulty = !difficulty || mission.difficulty === difficulty;
    return matchesText && matchesDifficulty;
  });
  if (sortOrder === "asc") visible = [...visible].sort((a, b) => a.xp - b.xp);
  if (sortOrder === "desc") visible = [...visible].sort((a, b) => b.xp - a.xp);
  filteredBody.innerHTML = visible.length
    ? visible.map(mission => createMissionRow(mission, false)).join("")
    : '<tr><td colspan="3"><div class="empty-state">No missions match these controls.</div></td></tr>';
  filterStatus.textContent = `${visible.length} mission${visible.length === 1 ? "" : "s"} found.`;
  sortButtons.forEach(button => button.setAttribute("aria-pressed", button.dataset.sort === sortOrder));
}

function updateView() { saveFilterState(); applyFilters(); }
searchInput.addEventListener("input", updateView);
difficultySelect.addEventListener("change", updateView);
sortButtons.forEach(button => button.addEventListener("click", () => { sortOrder = button.dataset.sort; updateView(); }));
filterReset.addEventListener("click", () => { searchInput.value = ""; difficultySelect.value = ""; sortOrder = "none"; updateView(); searchInput.focus(); });
reviewButton.addEventListener("click", () => completeMission(8));
loadFilterState();
applyFilters();
