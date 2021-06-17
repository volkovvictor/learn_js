'use strict';

let calcBtn = document.getElementById('start'),
      income = document.querySelector('.income'),
      incomeAdd = income.getElementsByTagName('button')[0],
      expenses = document.querySelector('.expenses'),
      expensesAdd = expenses.getElementsByTagName('button')[0],
      depositCheck = document.querySelector('#deposit-check'),
      additionalInputs = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeItems = document.querySelectorAll('.income-items'),
      expensesTitle = document.querySelector('input.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select');

const isNumber = function (n) {
         return !isNaN(parseFloat(n)) && isFinite(n);
      };

const appData = {
   income: {}, 
   incomeMonth: 0,
   addIncome: [], 
   expenses: {}, 
   addExpenses: [], 
   deposit: false, 
   budget: 0, 
   budgetDay: 0, 
   budgetMonth : 0, 
   expensesMonth: 0,
   start: function(n) {
      this.budget = +salaryAmount.value;
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getInfoDeposit();
      this.getBudget();
      this.getAddExpenses();
      this.getAddIncome();
      this.showResult();
   },
   showResult: function() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
   },
   addExpensesBlock: function() {
      let expensesItemsClone = expensesItems[0].cloneNode(true);

      expensesItems[0].parentNode.insertBefore(expensesItemsClone, expensesAdd);
      expensesItems = document.querySelectorAll('.expenses-items');

      if(expensesItems.length === 3) {
         expensesAdd.style.display = 'none';
      }
   },
   addIncomeBlock: function() {
      let incomeItemsClone = incomeItems[0].cloneNode(true);

      incomeItems[0].parentNode.insertBefore(incomeItemsClone, incomeAdd);
      incomeItems = document.querySelectorAll('.income-items');

      if(incomeItems.length === 3) {
         incomeAdd.style.display = 'none';
      }
   },
   getExpenses: function() {
      expensesItems.forEach(function(item) {
         let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;

         if(itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
         }
      });
   },
   getIncome: function() {
      incomeItems.forEach(function(item) {
         let itemIncome = item.querySelector('.income-title').value,
         cashIncome = item.querySelector('.income-amount').value;
         if(itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
         }
      });

      for(let key in appData.income) {
         appData.incomeMonth += +appData.income[key];
      }
   },
   getAddExpenses: function() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
         item = item.trim();

         if(item !== '') {
            appData.addExpenses.push(item);
         } 
      });
   },
   getAddIncome: function() {
      additionalInputs.forEach(function(item) {
         let itemValue = item.value.trim();
         
         if(itemValue !== '') {
            appData.addIncome.push(itemValue);
         }
      });
   },
   getExpensesMonth: function() {
      for(let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   },
   getBudget: function() {
      this.budgetMonth =  this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.ceil(this.budgetMonth / 30);
   },
   getTargetMonth: function() {
      return Math.ceil(targetAmount.value / this.budgetMonth);
   },
   getStatusIncome: function() {
      if(this.budgetDay >= 1200) {
         return ('У вас высокий уровень дохода');
      } 
      if(this.budgetDay >= 600 && this.budgetDay < 1200) {
         return ('У вас средний уровень дохода');
      } 
      if(this.budgetDay < 600 && this.budgetDay >= 0) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else {
         return ('Что то пошло не так');
      }
   },
   getInfoDeposit: function() {
      if(this.deposit) {
         do {
            this.percentDeposit = prompt('Какой годовой процент?', 10);
            
         }
         while(!isNumber(appData.percentDeposit));

         do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         }
         while(!isNumber(appData.moneyDeposit));
      }
   },
   changePeriod: function() {
      let periodAmount = document.querySelector('.period-amount');

      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = this.calcSavedMoney();
      
   },
   calcSavedMoney: function() {
      return this.budgetMonth * periodSelect.value;
   }
};

calcBtn.addEventListener('click', function() {
   if(salaryAmount.value !== '') {
      appData.start();
   }
});
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod.bind(appData));


//if(appData.getTargetMonth() >= 0) {
//   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
//} else {
//   console.log('Цель не будет достигнута');
//}

//for(let key in appData) {
//   console.log(`Наша программа включает в себя данные: ${key}: ${appData[key]}`);
//}
