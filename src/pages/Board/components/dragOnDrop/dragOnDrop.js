export function dragOnDrop() {
  const columns = document.querySelectorAll(".Board__list");
  const cards = document.querySelectorAll(".Board__card");
  function dragStart(item) {
    item.classList.add("placeholder");
  }
  function dragEnd(item) {
    item.classList = "Board__card";
  }
  function dragEnter(e) {
    e.preventDefault();
    console.log("hello");
  }

  function dragOver(e) {
    e.preventDefault();
  }

  cards.forEach((item) => {
    item.addEventListener("dragstart", dragStart(item));
    item.addEventListener("dragstart", dragEnd(item));
  });

  columns.forEach((column) => {
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragover", dragOver);
  });
}
