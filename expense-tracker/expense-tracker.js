const account = {
    name:'DaneLooman',
    expenses: [],
    income: [],
    addExpense: function (description,amount){
        this.expenses.push({
            description: description,
            amount: amount
        })
    },
    addIncome: function (description,amount){
        this.income.push({
            description: description,
            amount: amount
        })
    },
    getAccountSummary: function (){
        let totalExp = 0.00
        this.expenses.forEach(function(item){
            totalExp = totalExp + item.amount
        })
        let totalIncome = 0.00
        this.income.forEach(function(item){
            totalIncome = totalIncome + item.amount
        })
        return `${this.name} has $${(totalIncome - totalExp).toPrecision(2)} as a balance.$${totalIncome} in income. $${totalExp} in expenses.`
    }
}
account.addIncome('Found Money', 10)
account.addExpense('Jimmy Johns', 8.99)
account.addExpense('Soda',.75)
console.log(account.getAccountSummary())

