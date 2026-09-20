const SAVED_ARTICLES_KEY = "fa-mission10-saved-articles";
const hubForm = document.querySelector("#hub-search-form");
const hubInput = document.querySelector("#hub-search-input");
const hubSubmit = hubForm.querySelector('button[type="submit"]');
const hubSort = document.querySelector("#hub-sort");
const savedOnly = document.querySelector("#saved-only");
const hubStatus = document.querySelector("#hub-status");
const hubResults = document.querySelector("#hub-results");
const hubCount = document.querySelector("#hub-count");
const capstoneReview = document.querySelector("#capstone-review");
let currentArticles = [];
let savedArticles = loadSavedArticles();
let hubLoading = false;

function loadSavedArticles() {
  const saved = readStorage(SAVED_ARTICLES_KEY, []);
  return Array.isArray(saved) ? saved.filter(article => article && typeof article.objectID === "string") : [];
}

function isSaved(id) { return savedArticles.some(article => article.objectID === id); }
function sortArticles(articles, sortType) {
  const copy = [...articles];
  if (sortType === "points") return copy.sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
  if (sortType === "newest") return copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return copy;
}

function createSaveButton(article) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "button button-secondary button-small";
  button.dataset.articleId = article.objectID;
  button.setAttribute("aria-pressed", isSaved(article.objectID));
  button.textContent = isSaved(article.objectID) ? "Remove saved" : "Save article";
  button.addEventListener("click", () => toggleSaved(article));
  return button;
}

function toggleSaved(article) {
  const removing = isSaved(article.objectID);
  savedArticles = removing
    ? savedArticles.filter(saved => saved.objectID !== article.objectID)
    : [...savedArticles, article];
  writeStorage(SAVED_ARTICLES_KEY, savedArticles);
  hubStatus.dataset.state = "success";
  hubStatus.textContent = removing ? "Article removed from saved items." : "Article saved in this browser.";
  renderCurrentView();
  const replacement = document.querySelector(`[data-article-id="${CSS.escape(article.objectID)}"]`);
  if (replacement) replacement.focus();
  else savedOnly.focus();
}

function renderCurrentView() {
  const source = savedOnly.checked ? savedArticles : currentArticles;
  const visible = sortArticles(source, hubSort.value);
  renderArticleList(hubResults, visible, { createSaveButton, emptyMessage: savedOnly.checked ? "You have not saved any articles yet." : "Search for a topic to load articles." });
  hubCount.textContent = `${visible.length} article${visible.length === 1 ? "" : "s"}`;
}

hubForm.addEventListener("submit", async event => {
  event.preventDefault();
  const query = hubInput.value.trim();
  if (!query || hubLoading) {
    if (!query) { hubStatus.dataset.state = "error"; hubStatus.textContent = "Enter a topic before searching."; hubInput.focus(); }
    return;
  }
  hubLoading = true;
  hubSubmit.disabled = true;
  hubSort.disabled = true;
  savedOnly.disabled = true;
  hubStatus.dataset.state = "loading";
  hubStatus.textContent = "Loading developer articles…";
  hubResults.replaceChildren();
  try {
    currentArticles = await fetchArticles(query);
    savedOnly.checked = false;
    renderCurrentView();
    hubStatus.dataset.state = "success";
    hubStatus.textContent = currentArticles.length ? "Search complete. Sort or save any useful article." : `No results found for “${query}”.`;
  } catch (error) {
    currentArticles = [];
    renderCurrentView();
    hubStatus.dataset.state = "error";
    hubStatus.textContent = "The request failed. Saved articles are still available from this browser.";
    console.error("Article Hub search failed:", error);
  } finally {
    hubLoading = false;
    hubSubmit.disabled = false;
    hubSort.disabled = false;
    savedOnly.disabled = false;
  }
});

hubSort.addEventListener("change", renderCurrentView);
savedOnly.addEventListener("change", () => { renderCurrentView(); hubStatus.textContent = savedOnly.checked ? "Showing articles saved in this browser." : "Showing the latest search results."; hubStatus.removeAttribute("data-state"); });
capstoneReview.addEventListener("click", () => completeMission(10));
renderCurrentView();
