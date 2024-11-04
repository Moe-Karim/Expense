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
menu.forEach((item) => {
    item.addEventListener('click', () => {
        const Selected = item.textContent;
        updateBalance();
        updateContent(Selected);
    });
});

function updateContent(Selected) {
    if (Selected === 'Dashboard') {
        content.innerHTML = `
        <div class="secondary-bg-color"><h3>Balance: </h3><span>${balance} USD</span></div>
        <div class="fourth-bg-color"><h3>Incomes:  </h3><span>${totalIncome} USD</span></div>
        <div class="third-bg-color"><h3>Expenses:  </h3><span>${totalExpense} USD</span></div>
        `;
        content.className = 'dash';
    }

    if (Selected === 'Incomes') {
        content.innerHTML = `<h3>Incomes: ${totalIncome} USD</h3>`;
        const incomeList = document.createElement('ul');
        incomeList.className = 'income';

        storage.forEach((item, index) => {
            if (item.type === 'income') {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.description} on ${item.date}: ${item.amount} USD `;
                listItem.className = 'fourth-txt-color';
                incomeList.appendChild(listItem);
            }
        });

        content.appendChild(incomeList);
        content.className = 'content';
    }

    if (Selected === 'Expenses') {
        content.innerHTML = `<h3>Expenses: ${totalExpense} USD</h3>`;
        const expenseList = document.createElement('ul');
        expenseList.className = 'list';

        storage.forEach((item, index) => {
            if (item.type === 'expense') {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.description} on ${item.date}: ${item.amount} USD `;
                listItem.className = 'third-txt-color';
                expenseList.appendChild(listItem);
            }
        });

        content.appendChild(expenseList);
        content.className = 'content';
    }

    if (Selected === 'Transactions') {
        content.innerHTML = `<h3>Transactions:</h3>`;
        const allTransactions = document.createElement('ul');
        allTransactions.className = 'list';

        storage.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.description} on ${item.date}: ${item.amount} USD `;
            listItem.innerHTML += `<i class="fa fa-trash-o btn" id="delete-${index}"></i>`;
            listItem.className = item.type === 'income' ? 'fourth-txt-color' : 'third-txt-color';
            allTransactions.appendChild(listItem);
        });

        content.appendChild(allTransactions);
        content.innerHTML += `<h2 id="add"><a href="index.html">New Transaction</a></h2>`;
        content.className = 'content';

        attachButtonListeners();
    }
}