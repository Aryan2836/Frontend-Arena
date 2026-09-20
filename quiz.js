const quiz = document.querySelector("[data-quiz]");

if (quiz) {
  const options = quiz.querySelectorAll(".quiz-option");
  const result = quiz.querySelector("#quiz-result");
  const reset = quiz.querySelector("#quiz-reset");

  options.forEach(option => {
    option.addEventListener("click", () => {
      const isCorrect = option.dataset.correct === "true";
      options.forEach(button => { button.disabled = true; });
      option.classList.add(isCorrect ? "is-correct" : "is-wrong");
      const correctOption = quiz.querySelector('[data-correct="true"]');
      if (correctOption) correctOption.classList.add("is-correct");
      result.dataset.state = isCorrect ? "success" : "error";
      result.textContent = isCorrect
        ? "Correct. You can explain the idea and complete this checkpoint."
        : "Review the explanation and try again. The correct option is highlighted.";
      reset.hidden = false;
      if (isCorrect) completeMission(Number(document.body.dataset.mission));
    });
  });

  reset.addEventListener("click", () => {
    options.forEach(option => {
      option.disabled = false;
      option.classList.remove("is-correct", "is-wrong");
    });
    result.textContent = "";
    result.removeAttribute("data-state");
    reset.hidden = true;
  });
}
