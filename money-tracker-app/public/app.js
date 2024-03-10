// public/app.js



// Function to fetch and display expenses and incomes
async function fetchData() {
  try {
    // Fetch expenses
    const expenseResponse = await fetch('/expenses');
    const expenses = await expenseResponse.json();
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = expenses.map(expense => `<li>${expense.description}: $${expense.amount}</li>`).join('');

    // Fetch incomes
    const incomeResponse = await fetch('/incomes');
    const incomes = await incomeResponse.json();
    const incomeList = document.getElementById('incomeList');
    incomeList.innerHTML = incomes.map(income => `<li>${income.description}: $${income.amount}</li>`).join('');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Event listener for expense form submission
$('#expenseForm').submit(async function (e) {
  e.preventDefault();
  const description = $('#expenseDescription').val();
  const amount = $('#expenseAmount').val();

  try {
    // Submit expense data to the server
    await fetch('/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount }),
    });

    // Refresh the displayed data
    fetchData();
  } catch (error) {
    console.error('Error adding expense:', error);
  }
});

// Event listener for income form submission
$('#incomeForm').submit(async function (e) {
  e.preventDefault();
  const description = $('#incomeDescription').val();
  const amount = $('#incomeAmount').val();

  try {
    // Submit income data to the server
    await fetch('/incomes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount }),
    });

    // Refresh the displayed data
    fetchData();
  } catch (error) {
    console.error('Error adding income:', error);
  }
});
$(document).ready(function () {
// Event listeners for expense actions
$('#getAllExpenses').click(async function () {
  try {
    // Fetch all expenses
    const expenseResponse = await fetch('/expenses');
    const expenses = await expenseResponse.json();
    $('#expenseResults').html('<strong>Get All Expenses Results:</strong><br>' + JSON.stringify(expenses, null, 2));
  } catch (error) {
    console.error('Error fetching all expenses:', error);
  }
});

$('#updateExpense').click(async function () {
  const expenseId = prompt('Enter the ID of the expense to update:');
  const newDescription = prompt('Enter the new description:');
  const newAmount = prompt('Enter the new amount:');

  try {
    // Submit update data to the server
    await fetch(`/expenses/${expenseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newDescription, amount: newAmount }),
    });

    // Refresh the displayed data
    fetchData();
  } catch (error) {
    console.error('Error updating expense:', error);
  }
});

$('#deleteExpense').click(async function () {
  const expenseId = prompt('Enter the ID of the expense to delete:');

  try {
    // Submit delete request to the server
    await fetch(`/expenses/${expenseId}`, {
      method: 'DELETE',
    });

    // Refresh the displayed data
    fetchData();
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
});

// Event listeners for income actions
$('#getAllIncomes').click(async function () {
  try {
    // Fetch all incomes
    const incomeResponse = await fetch('/incomes');
    const incomes = await incomeResponse.json();
    $('#incomeResults').html('<strong>Get All Incomes Results:</strong><br>' + JSON.stringify(incomes, null, 2));
  } catch (error) {
    console.error('Error fetching all incomes:', error);
  }
});

$('#updateIncome').click(async function () {
  const incomeId = prompt('Enter the ID of the income to update:');
  const newDescription = prompt('Enter the new description:');
  const newAmount = prompt('Enter the new amount:');

  try {
    // Submit update data to the server
    await fetch(`/incomes/${incomeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: newDescription, amount: newAmount }),
    });

    // Refresh the displayed data
    fetchData();
  } catch (error) {
    console.error('Error updating income:', error);
  }
});

$('#deleteIncome').click(async function () {
  const incomeId = prompt('Enter the ID of the income to delete:');

  try {
    // Submit delete request to the server
    await fetch(`/incomes/${incomeId}`, {
      method: 'DELETE',
    });

    // Refresh the displayed data
    fetchData();
  } catch (error) {
    console.error('Error deleting income:', error);
  }
});

// Call the fetchData function when the page loads
fetchData();
});