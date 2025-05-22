let entries = [];

function addIncome() {
  const name = document.getElementById('incomeName').value.trim();
  const amount = parseFloat(document.getElementById('incomeAmount').value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Wprowadź poprawną nazwę i kwotę przychodu.");
    return;
  }

  entries.push({ type: 'income', name, amount });
  document.getElementById('incomeName').value = "";
  document.getElementById('incomeAmount').value = "";
  updateUI();
}

function addExpense() {
  const name = document.getElementById('expenseName').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount').value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Wprowadź poprawną nazwę i kwotę wydatku.");
    return;
  }

  entries.push({ type: 'expense', name, amount });
  document.getElementById('expenseName').value = "";
  document.getElementById('expenseAmount').value = "";
  updateUI();
}

function editEntry(index) {
  const entry = entries[index];
  const newName = prompt("Zmień nazwę:", entry.name);
  const newAmount = parseFloat(prompt("Zmień kwotę:", entry.amount));

  if (newName && !isNaN(newAmount) && newAmount > 0) {
    entries[index].name = newName;
    entries[index].amount = newAmount;
    updateUI();
  }
}

function deleteEntry(index) {
  if (confirm("Czy na pewno chcesz usunąć ten wpis?")) {
    entries.splice(index, 1);
    updateUI();
  }
}

function updateUI() {
  const incomeList = document.getElementById('incomeList');
  const expenseList = document.getElementById('expenseList');
  incomeList.innerHTML = '';
  expenseList.innerHTML = '';

  entries.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${entry.name}</strong>: ${entry.amount.toFixed(2)} zł 
      <button onclick="editEntry(${index})">✏️</button>
      <button onclick="deleteEntry(${index})">🗑️</button>
    `;
    if (entry.type === 'income') {
      incomeList.appendChild(li);
    } else {
      expenseList.appendChild(li);
    }
  });

  updateSummary();
}

function updateSummary() {
  const income = entries
    .filter(e => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const expenses = entries
    .filter(e => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const diff = income - expenses;

  document.getElementById('incomeTotal').textContent = `Suma przychodów: ${income.toFixed(2)}zł`;
  document.getElementById('expenseTotal').textContent = `Suma wydatków: ${expenses.toFixed(2)}zł`;

  const summary = document.getElementById('summaryText');

  if (diff > 0) {
    summary.textContent = `Możesz jeszcze wydać ${diff.toFixed(2)} złotych.`;
    summary.style.color = "green";
  } else if (diff === 0) {
    summary.textContent = "Bilans wynosi zero.";
    summary.style.color = "black";
  } else {
    summary.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(diff).toFixed(2)} złotych.`;
    summary.style.color = "red";
  }
}
