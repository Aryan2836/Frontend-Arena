const searchForm = document.querySelector("#article-search-form");
const searchInput = document.querySelector("#article-search-input");
const searchButton = searchForm.querySelector('button[type="submit"]');
const searchStatus = document.querySelector("#article-status");
const searchResults = document.querySelector("#article-results");
const articleCount = document.querySelector("#article-count");
const fetchReview = document.querySelector("#fetch-review");
let isLoading = false;

searchForm.addEventListener("submit", async event => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query || isLoading) {
    if (!query) { searchStatus.dataset.state = "error"; searchStatus.textContent = "Enter a topic before searching."; searchInput.focus(); }
    return;
  }
  isLoading = true;
  searchButton.disabled = true;
  searchStatus.dataset.state = "loading";
  searchStatus.textContent = "Loading articles…";
  searchResults.replaceChildren();
  articleCount.textContent = "0 articles";
  try {
    const articles = await fetchArticles(query);
    renderArticleList(searchResults, articles, { emptyMessage: `No results found for “${query}”.` });
    articleCount.textContent = `${articles.length} article${articles.length === 1 ? "" : "s"}`;
    searchStatus.dataset.state = "success";
    searchStatus.textContent = articles.length ? "Request complete. Live API results are shown below." : "The request worked, but no matching articles were found.";
  } catch (error) {
    renderArticleList(searchResults, [], { emptyMessage: "Results could not be loaded. Check the connection and try again." });
    searchStatus.dataset.state = "error";
    searchStatus.textContent = "The article request failed. The error was handled without breaking the page.";
    console.error("Article search failed:", error);
  } finally {
    isLoading = false;
    searchButton.disabled = false;
  }
});

fetchReview.addEventListener("click", () => completeMission(9));
