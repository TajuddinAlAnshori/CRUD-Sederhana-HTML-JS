
/* Variables */
let selectedRowIx;
let prevSelection;
let table;
let status;

/* Functions */

window.onload = function () {
  status = document.getElementById("status");
  table = document.getElementById("data-table");
}

/* 
 * Create HTML table row for each new data element.
 */
function createTable(name, quantity) {
  selectedRowIx = table.rows.length;
  const tableRow = table.insertRow(selectedRowIx);
  const cell1 = tableRow.insertCell(0);
  const cell2 = tableRow.insertCell(1);
  const cell3 = tableRow.insertCell(2);
  cell1.innerHTML = name;
  cell1.className = "t-name";
  cell2.innerHTML = quantity;
  cell2.className = "t-qty";
  cell3.innerHTML = "<input type='radio' name='select' onclick='selectRow(this)' checked>";
  cell3.className = "t-radio";
}

function selectRow(obj) {
  const row = (obj) ? obj.parentElement.parentElement : table.rows[table.rows.length - 1];
  selectedRowIx = row.rowIndex;

  if (obj) {
    status.innerHTML = "Selected row " + selectedRowIx;
  }

  setSelection(row);
}

function setSelection(row) {
  document.getElementById("name").value = row.cells.item(0).innerHTML;
  document.getElementById("quantity").value = row.cells.item(1).innerHTML;
  row.className = "r-select";

  if (prevSelection && prevSelection !== selectedRowIx) {
    table.rows[prevSelection].className = "r-unselect";
  }

  prevSelection = selectedRowIx;
}

function scrollToSelection() {
  const ele = document.getElementById("table-wrapper")
  const bucketHt = ele.clientHeight;
  const itemHt = ele.scrollHeight / table.rows.length;
  const noItemsInBucket = parseInt(bucketHt / itemHt);
  const targetBucket = (selectedRowIx + 1) / noItemsInBucket;
  const scrollPos = (bucketHt * (targetBucket - 1)) + (bucketHt / 2);
  ele.scrollTop = Math.round(scrollPos);
}

/*
 * Routine to add a new item data to the HTML table.
 */
function addData() {
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;

  if (!name) {
    alert("Name is required!");
    document.getElementById("name").focus();
    return;
  }

  if (quantity <= 0) {
    alert("Quantity must be greater than zero!");
    document.getElementById("quantity").focus();
    return;
  }

  createTable(name, quantity);
  selectRow();
  scrollToSelection();
  status.innerHTML = "New item added";
}

/*
 * Routine to update an item quantity with a new value.
 */
function updateData() {
  if (selectedRowIx === null || selectedRowIx === undefined) {
    alert("Select a row to update!");
  } else {
    const name = table.rows[selectedRowIx].cells.item(0).innerHTML;
    const quantityInput = document.getElementById("quantity").value;

    if (quantityInput <= 0) {
      alert("Quantity must be greater than zero!");
      document.getElementById("quantity").focus();
      return;
    }

    table.rows[selectedRowIx].cells.item(1).innerHTML = quantityInput;
    status.innerHTML = "Item quantity updated.";
    scrollToSelection();
  }
}

/*
 * Routine to delete a selected row from the HTML table.
 */
function deleteData() {
  if (selectedRowIx === null || selectedRowIx === undefined) {
    alert("Select a row to delete!");
  } else {
    table.deleteRow(selectedRowIx);
    initValues();
    status.innerHTML = "Item deleted";
  }
}

function initValues() {
  selectedRowIx = null;
  prevSelection = null;
  document.getElementById("name").value = "";
  document.getElementById("quantity").value = "";
}

/*
 * Routine to clear the selected row and input fields.
 */
function clearData() {
  if (selectedRowIx !== null && selectedRowIx !== undefined) {
    table.rows[selectedRowIx].cells.item(2).firstChild.checked = false;
    table.rows[selectedRowIx].className = "r-unselect";
  }

  initValues();
  status.innerHTML = "";
}

/*
 * Routine for selecting the first or the last row.
 */
function selectFirstOrLastRow(n) {
  if (table.rows.length < 1) {
    status.innerHTML = "No data in table!";
    return;
  }

  selectedRowIx = (n === 1) ? 0 : (table.rows.length - 1);
  const row = table.rows[selectedRowIx];
  row.cells[2].children[0].checked = true;
  setSelection(row);
  scrollToSelection();
  status.innerHTML = "Selected row " + (selectedRowIx + 1);
}
