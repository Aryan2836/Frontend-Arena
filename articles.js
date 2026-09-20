const ARTICLE_API = "https://hn.algolia.com/api/v1/search";

async function fetchArticles(query) {
  const url = `${ARTICLE_API}?query=${encodeURIComponent(query)}&tags=story`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data.hits)) throw new Error("Unexpected API response format");
  return data.hits.slice(0, 20);
}

function getArticleUrl(article) {
  const fallback = `https://news.ycombinator.com/item?id=${encodeURIComponent(article.objectID)}`;
  if (!article.url) return fallback;
  try {
    const parsed = new URL(article.url);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : fallback;
  } catch (error) {
    return fallback;
  }
}

function formatArticleDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Unknown date" : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function createArticleCard(article, options = {}) {
  const card = document.createElement("article");
  card.className = "article-card";
  const title = document.createElement("h3");
  title.textContent = article.title || "Untitled article";
  const meta = document.createElement("p");
  meta.className = "article-meta";
  meta.textContent = `By ${article.author || "Unknown author"} · ${article.points ?? 0} points · ${formatArticleDate(article.created_at)}`;
  const actions = document.createElement("div");
  actions.className = "article-actions";
  const link = document.createElement("a");
  link.href = getArticleUrl(article);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Read article";
  actions.appendChild(link);
  if (options.createSaveButton) actions.appendChild(options.createSaveButton(article));
  card.append(title, meta, actions);
  return card;
}

function renderArticleList(container, articles, options = {}) {
  container.replaceChildren();
  if (!articles.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = options.emptyMessage || "No articles to show.";
    container.appendChild(empty);
    return;
  }
  articles.forEach(article => container.appendChild(createArticleCard(article, options)));
}
