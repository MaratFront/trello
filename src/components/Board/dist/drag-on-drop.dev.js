"use strict";

function dragOnDrop() {
  var items = document.querySelectorAll('.Board__card');
  var columns = document.querySelectorAll('.Board__list');
  items.forEach(function (item) {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
  });
  columns.forEach(function (column) {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', dragDrop);
  });

  function dragOver(e) {
    e.preventDefault();
  }

  var dragItem = null;

  function dragStart() {
    dragItem = this;
  }

  function dragEnd() {
    this.className = 'Board__card';
    dragItem = null;
  }

  function dragDrop() {
    this.append(dragItem);
  }
}