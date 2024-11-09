document.addEventListener('DOMContentLoaded', () => {
let content = document.getElementById('content');
let menu = document.querySelectorAll('.menu ul li');
let storage = [];
let totalIncome = 0;
let totalExpense = 0;
let balance = 0;
let showform = document.getElementById('edit');
let newform = document.getElementById('input');
let btnRegister = document.getElementById('RegisterBtn');
let loginBtn=document.getElementById('loginBtn');
let loginForm = document.getElementById('login');
    loginBtn.addEventListener('click',login());
if (!btnRegister) {
    console.error('Register button not found!');
}

if (btnRegister) {
    btnRegister.addEventListener('click', () => {
        let divRegister = document.getElementById('divRegister');
        show(divRegister);
        divRegister.className = 'login';
        let signup = document.getElementById('signUp');
        signup.addEventListener('click',register());
    });
}


    fetch('http://localhost/Expense/php/getTransaction.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        storage = data;
        updateBalance();
    })
    .catch(error => {
        console.error('Error fetching transactions:', error);
    });


function register(){
     const fname = document.getElementById('fname');
        const lname = document.getElementById('lname').value;
        const username = document.getElementById('Regusername').value;
        const password = document.getElementById('Regpass').value;

        if (fname && lname && username && password) {
            const newUser = {
                fname,
                lname,
                username,
                password
            };

        fetch('http://localhost/Expense/php/register.php',{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(transaction)
        })
        .then(response =>response.text())
        .then(data=>{
        })
        .catch(error=>{
            console.error('Error:',error);
        })
            updateContent('Dashboard');
        } else {
            alert('Please fill in all fields.');
        }
    };




function login(){
    document.getElementById('loginBtn').addEventListener('click', () => {
        const user = document.getElementById('loginusername').value;
        const pass = document.getElementById('loginpass').value;
        if (user && pass) {
            const users = {
              user,
              pass
            };

        fetch('http://localhost/Expense/php/login.php',{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(users),
            mode:'cors'
        })
        .then(response => response.text())
        .then(data => {
            console.log('Response Data:', data);
            if (data.error) {
                alert(data.error);
            } else {
                alert('Login successful');
                console.log(loginForm);
                loginForm.classList.add('hide');
                updateContent('Dashboard');
            }
        })
        .catch(error=>{
            console.error(error);
            alert('An error occurred. Please try again.'+error.message);
        })

        } else {
            alert('Please fill in all fields.');
        }
    });
}



function updateBalance() {
    balance = 0;
    totalIncome = 0;
    totalExpense = 0;

    if (storage.length === 0) {
        return;
    }

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
            listItem.innerHTML += `<i class="fa fa-edit" id="edit-${index}"></i>`;
            listItem.innerHTML += `<i class="fa fa-trash-o btn" id="delete-${index}"></i>`;
            listItem.className = item.type === 'income' ? 'fourth-txt-color' : 'third-txt-color';
            allTransactions.appendChild(listItem);
        });

        content.appendChild(allTransactions);
        content.innerHTML += `<h2 id="add" class="btn">New Transaction</h2>`;
        content.className = 'content';
        let add =document.getElementById('add');
        add.addEventListener('click',()=>{
            show(newform);
            content.innerHTML='';
            content.appendChild(newform);
            createTransaction();
        })
        attachButtonListeners();
    }
}



function attachButtonListeners() {
    storage.forEach((item, index) => {
        const deleteButton = document.getElementById(`delete-${index}`);
        const editButton = document.getElementById(`edit-${index}`);
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                deleteTransaction(item.id);
            });
        }
        if (editButton) {
            editButton.addEventListener('click', () => {
                show(showform);
                content.innerHTML='';
                content.appendChild(showform);
                editTransaction(item);
            });
        }
    });
}



function show(element){
    element.classList.remove('hide');
}



function createTransaction(){
document.getElementById('submitadd').addEventListener('click', () => {
    const selectedMethod = document.querySelector('input[name="trans-method"]:checked');
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('comment').value;
    const date = document.getElementById('date').value;

    if (selectedMethod && amount && description && date) {
        const transaction = {
            type: selectedMethod.value,
            amount: parseFloat(amount),
            description: description,
            date: date,
        };

    fetch('http://localhost/Expense/php/addTransaction.php',{
        method: 'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(transaction)
    })
    .then(response =>response.text())
    .then(data=>{
    })
    .catch(error=>{
        console.error('Error:',error);
    })


        document.getElementById('amount').value = '';
        document.getElementById('comment').value = '';
        document.getElementById('date').value = '';

        updateBalance();
        updateContent('Dashboard');
    } else {
        alert('Please fill in all fields.');
    }
});
}



function deleteTransaction(index) {
    fetch(`http://localhost/Expense/php/deleteTransaction.php?index=${index}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateBalance();
        })
        .catch(error => {
            console.error('Error fetching transactions:');
        });


        updateBalance();
        updateContent('Transactions');
}



function editTransaction(item) {
    let editAmount = document.getElementById('editAmount');
    let editComment = document.getElementById('editComment');
    let editDate = document.getElementById('editDate');
    let editType = document.querySelectorAll('input[name="edittrans-method"]');

    if (editAmount) {
        editAmount.value = item.amount;
    }
    if (editComment) {
        editComment.value = item.description;
    }
    if (editDate) {
        editDate.value = item.date;
    }

    editType.forEach(radio => {
        if (radio.value === item.type) {
            radio.checked = true;
        }
    });

    document.getElementById('submitedit').addEventListener('click', () => {
        const type = document.querySelector('input[name="edittrans-method"]:checked');
        const amount = editAmount.value;
        const description = editComment.value;
        const date = editDate.value;

        if (type && amount && description && date) {
            const transaction = {
                id: item.id,
                type: type.value,
                amount: parseFloat(amount),
                description: description,
                date: date,
            };

            fetch('http://localhost/Expense/php/editTransaction.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction)
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                updateBalance();
                updateContent('Dashboard');
            })
            .catch(error => {
                alert('Error: ' + error);
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
}

});
