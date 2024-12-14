let totalBalance = 0;
const transactionList = document.getElementById('transactionList');
const totalBalanceDisplay = document.getElementById('totalBalance');

document.getElementById('addTransaction').addEventListener('click', addTransaction);

function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (isNaN(amount) || description === '') {
        alert('Please enter valid amount and description');
        return;
    }

    const transaction = {
        amount: amount,
        description: description,
        category: category,
        id: Date.now()
    };

    if (category === 'income') {
        totalBalance += amount;
    } else {
        totalBalance -= amount;
    }

    updateTransactionList(transaction);
    updateBalance();
    clearInputs();
}

function updateTransactionList(transaction) {
    const li = document.createElement('li');
    li.textContent = `${transaction.description}: $${transaction.amount} (${transaction.category})`;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteTransaction(transaction.id, transaction.amount, transaction.category);
    
    li.appendChild(deleteBtn);
    transactionList.appendChild(li);
}

function deleteTransaction(id, amount, category) {
    if (category === 'income') {
        totalBalance -= amount;
    } else {
        totalBalance += amount;
    }

    const transactionItems = Array.from(transactionList.children);
    const transactionToDelete = transactionItems.find(item => item.textContent.includes(id));
    transactionList.removeChild(transactionToDelete);
    
    updateBalance();
}

function updateBalance() {
    totalBalanceDisplay.textContent = totalBalance.toFixed(2);
}

function clearInputs() {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = 'income'; // Reset to default
}