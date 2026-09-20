const layoutPreview = document.querySelector("#layout-preview");
const layoutToggle = document.querySelector("#layout-toggle");
const layoutReview = document.querySelector("#layout-review");
const layoutCheckButton = document.querySelector("#layout-check");

layoutToggle.addEventListener("click", () => {
  const isNarrow = layoutPreview.classList.toggle("is-narrow");
  layoutToggle.setAttribute("aria-pressed", isNarrow);
  layoutToggle.textContent = isNarrow ? "Show desktop preview" : "Show mobile preview";
});

layoutCheckButton.addEventListener("click", () => {
  const checks = layoutReview.querySelectorAll('input[type="checkbox"]');
  const reviewedAll = Array.from(checks).every(check => check.checked);
  const result = document.querySelector("#layout-result");
  result.dataset.state = reviewedAll ? "success" : "error";
  result.textContent = reviewedAll
    ? "Self-review complete. You checked structure, layout and mobile behavior."
    : "Complete all three review checks after using the preview.";
  if (reviewedAll) completeMission(4);
});
