// Select elements
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");

let budget = 0;

// Set Budget
totalAmountButton.addEventListener("click", () => {
  budget = parseInt(totalAmount.value);

  if (!budget || budget < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    document.getElementById("amount").innerText = budget;
    balanceValue.innerText = budget - parseInt(expenditureValue.innerText);
    totalAmount.value = ""; // Clear input
  }
});

// Disable/Enable Edit Buttons
const toggleEditButtons = (disable) => {
  document.querySelectorAll(".edit").forEach((btn) => {
    btn.disabled = disable;
  });
};

// Modify List Item (Edit/Delete)
const modifyElement = (element, isEdit = false) => {
  let item = element.parentElement;
  let expenseAmount = parseInt(item.querySelector(".amount").innerText);

  // Update balance and expenditure
  balanceValue.innerText = parseInt(balanceValue.innerText) + expenseAmount;
  expenditureValue.innerText =
    parseInt(expenditureValue.innerText) - expenseAmount;

  if (isEdit) {
    productTitle.value = item.querySelector(".product").innerText;
    userAmount.value = expenseAmount;
    toggleEditButtons(true);
  }
  item.remove();
};

// Create Expense List Item
const createListItem = (expenseName, expenseValue) => {
  let listItem = document.createElement("div");
  listItem.className = "sublist-content flex-space";
  listItem.innerHTML = `
    <p class="product">${expenseName}</p>
    <p class="amount">${expenseValue}</p>
  `;

  let editButton = document.createElement("button");
  editButton.className = "fa-solid fa-pen-to-square edit";
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => modifyElement(editButton, true));

  let deleteButton = document.createElement("button");
  deleteButton.className = "fa-solid fa-trash-can delete";
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => modifyElement(deleteButton));

  listItem.append(editButton, deleteButton);
  list.appendChild(listItem);
};

// Add Expense
checkAmountButton.addEventListener("click", () => {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return;
  }
  productTitleError.classList.add("hide");

  let expense = parseInt(userAmount.value);
  expenditureValue.innerText = parseInt(expenditureValue.innerText) + expense;
  balanceValue.innerText = budget - parseInt(expenditureValue.innerText);

  createListItem(productTitle.value, expense);
  productTitle.value = "";
  userAmount.value = "";
  toggleEditButtons(false);
});
