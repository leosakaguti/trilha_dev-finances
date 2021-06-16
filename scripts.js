const Modal = {
  toggle(){ // Mostra e oculta o modal da tela
    var select = document.querySelector('.modal-overlay.active') !== null; // faz select da classe e atribui a variavel se não for nulo
    if(select){ //se a variavel for true(não for nula)
      document //document seleciona todo o documento html e disponibiliza funçoes para o js
      .querySelector('.modal-overlay') // querySelector retorna o primeiro elemento encontrado que for igual ao informado
      .classList.remove('active') // remove a classe que for informada
    }else { // se a variavel for false(for nula)
      document
      .querySelector('.modal-overlay')
      .classList
      .add('active') // adiciona a classe que for informada
    }
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: 50000,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '23/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -201050,
    date: '23/01/2021',
  },
]

const Transaction = {
  incomes(){
    let income = 0;
    // para cada transação
    transactions.forEach(transaction => {
      //se o valor for maior que zero
      if(transaction.amount > 0){
        //somar o valor à variável income
        income+=transaction.amount;
      }
    })

    return income
  },
  expenses(){
    let expense = 0;
    // para cada transação
    transactions.forEach(transaction => {
      // se a transação for menor que zero
      if(transaction.amount < 0){
        // somar à variável expense
        expense+=transaction.amount;
      }
    })

    return expense
  },
  total(){
    return Transaction.incomes() + Transaction.expenses()
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index){
    const tr = document.createElement('tr') // cria o elemento tr
    tr.innerHTML = DOM.innerHTMLTransaction(transaction) // criar o elemento tr em volta do innerHTLMTransaction

    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction){
    const CSSclass = transaction.amount > 0 ? "income" : "expense" // se o valor da transação for maior que zero, então o tipo é income, senão, expense

    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover Transação">
        </td>
    `
    //console.log(html)
    return html
  },
  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "" // se o valor for menor que zero recebe o valor negativo senão, nada
    
    value = String(value).replace(/\D/g, "") // ´/\D/g´ = remove do valor qualquer coisa diferente de número globalmente

    value = Number(value) / 100 // divide o valor por cem porque o valor é recebido multiplicado por cem

    value = value.toLocaleString("pt-BR", { //seta a lingua falada localmente
      style: "currency", // seta o estilo que é currency ou moeda
      currency: "BRL" // seta qual moeda é
    })
    return signal + value
  }
}

transactions.forEach(function(transaction) {
  DOM.addTransaction(transaction)
})

DOM.updateBalance()