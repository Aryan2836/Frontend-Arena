const sequenceButtons = document.querySelectorAll("[data-sequence-step]");
const sequenceList = document.querySelector("#sequence-list");
const sequenceResult = document.querySelector("#sequence-result");
const sequenceReset = document.querySelector("#sequence-reset");
const correctOrder = ["read", "dom", "find", "update"];
let selectedSteps = [];

sequenceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const step = button.dataset.sequenceStep;
    if (selectedSteps.some(item => item.step === step)) return;
    selectedSteps.push({ step, label: button.textContent.trim() });
    button.disabled = true;
    button.textContent = `${selectedSteps.length}. ${button.textContent.trim()}`;
    renderSequence();
    if (selectedSteps.length === correctOrder.length) checkSequence();
  });
});

function renderSequence() {
  sequenceList.innerHTML = "";
  selectedSteps.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item.label.replace(/^\d+\.\s/, "");
    sequenceList.appendChild(listItem);
  });
}

function checkSequence() {
  const isCorrect = selectedSteps.every((item, index) => item.step === correctOrder[index]);
  sequenceResult.dataset.state = isCorrect ? "success" : "error";
  sequenceResult.textContent = isCorrect
    ? "Correct: the browser builds the DOM before JavaScript finds and updates an element."
    : "That order is not correct yet. Reset and use the lesson flow above.";
  if (isCorrect) completeMission(5);
}

sequenceReset.addEventListener("click", () => {
  selectedSteps = [];
  sequenceButtons.forEach(button => {
    button.disabled = false;
    button.textContent = button.textContent.replace(/^\d+\.\s/, "");
  });
  sequenceList.innerHTML = "";
  sequenceResult.textContent = "";
  sequenceResult.removeAttribute("data-state");
});
