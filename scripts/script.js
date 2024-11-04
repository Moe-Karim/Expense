let content = document.getElementById('content');
let menu = document.querySelectorAll('.menu ul li');
let storage = JSON.parse(localStorage.getItem('transactions')) || [];
let index = storage.length - 1;
let totalIncome = 0;
let totalExpense = 0;
let balance = 0;

function updateBalance() {
    balance = 0;
    totalIncome = 0;
    totalExpense = 0;

    storage.forEach(transaction => {
        if (transaction.type === 'income') {
            balance += Number(transaction.amount);
            totalIncome += Number(transaction.amount);
        } else if (transaction.type === 'expense') {
            balance -= Number(transaction.amount);
            totalExpense += Number(transaction.amount);
        }
    });
}