// Select DOM elements
const modalForm = document.getElementById('modalForm');
const modalDescription = document.getElementById('modalDescription');
const modalAmount = document.getElementById('modalAmount');
const entryModal = $('#entryModal'); // jQuery object for Bootstrap modal

const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');
const incomeTotal = document.getElementById('incomeTotal');
const expenseTotal = document.getElementById('expenseTotal');
const summaryText = document.getElementById('summaryText');

let currentEntryType = null; // will hold 'income' or 'expense'

// Listen for when the modal opens and store the entry type
$('#entryModal').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget); // Button that triggered the modal
  currentEntryType = button.data('type'); // Extract info from data-type attribute
  
  // Change modal title depending on entry type
  const modalTitle = currentEntryType === 'income' ? 'Dodaj przychód' : 'Dodaj wydatek';
  $('#entryModalLabel').text(modalTitle);

  // Clear previous inputs
  modalDescription.value = '';
  modalAmount.value = '';
});

// Handle form submit inside modal
modalForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const description = modalDescription.value.trim();
  const amount = parseFloat(modalAmount.value);

  if (!description || isNaN(amount) || amount <= 0) {
    alert('Proszę podać poprawną nazwę i kwotę większą od 0');
    return;
  }

  // Create new list item
  const li = document.createElement('li');
  li.textContent = `${description}: ${amount.toFixed(2)} zł`;

  if (currentEntryType === 'income') {
    incomeList.appendChild(li);
  } else if (currentEntryType === 'expense') {
    expenseList.appendChild(li);
  }

  // Update totals and summary
  updateTotals();

  // Close the modal
  entryModal.modal('hide');
});

// Function to sum up entries and update totals
function updateTotals() {
  const incomeSum = sumListItems(incomeList);
  const expenseSum = sumListItems(expenseList);

  incomeTotal.textContent = `Suma przychodów: ${incomeSum.toFixed(2)} zł`;
  expenseTotal.textContent = `Suma wydatków: ${expenseSum.toFixed(2)} zł`;

  const balance = incomeSum - expenseSum;
  if (balance > 0) {
    summaryText.textContent = `Możesz jeszcze wydać ${balance.toFixed(2)} złotych`;
  } else if (balance === 0) {
    summaryText.textContent = `Bilans jest zerowy`;
  } else {
    summaryText.textContent = `Przekroczyłeś budżet o ${Math.abs(balance).toFixed(2)} złotych`;
  }
}

// Helper: sum amounts from list items
function sumListItems(list) {
  let sum = 0;
  for (const li of list.children) {
    // Extract the amount from the text e.g. "Food: 123.45 zł"
    const parts = li.textContent.split(':');
    if (parts.length > 1) {
      const amountStr = parts[1].replace('zł', '').trim();
      const amount = parseFloat(amountStr);
      if (!isNaN(amount)) sum += amount;
    }
  }
  return sum;
}

// Initial call to set totals on page load
updateTotals();
