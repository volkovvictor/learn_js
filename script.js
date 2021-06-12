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
      incomeItems = document.querySelectorAll('income-items'),
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
      if(salaryAmount.value === '') {
         alert('Ошибка! Поле "Месячный доход" не должно быть пустым');
         return;
      }
      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getInfoDeposit();
      appData.getBudget();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.showResult();
   },
   showResult: function() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcSavedMoney();
   },
   addExpensesBlock: function() {
      let expensesItemsClone = expensesItems[0].cloneNode(true);

      expensesItems[0].parentNode.insertBefore(expensesItemsClone, expensesAdd);
      expensesItems = document.querySelectorAll('.expenses-items');

      if(expensesItems.length === 3) {
         expensesAdd.style.display = 'none';
      }

      console.log(expensesItems.length);

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
      if(confirm('Есть ли у вас дополнительный источник заработка?')) {
         let itemIncome, cashIncome;
         do {
            itemIncome = prompt('Какой у вас дополнительный заработок?', 'фриланс');
         } while(!isNaN(itemIncome) || itemIncome.trim() === '' || itemIncome === null);

         do {
            cashIncome = prompt('Сколько вы на этом зарабатываете', 20000);
         } while(!isNumber(cashIncome));

         appData.income[itemIncome] = cashIncome;
      }

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
      for(let key in appData.expenses) {
         appData.expensesMonth += +appData.expenses[key];
      }
   },
   getBudget: function() {
      appData.budgetMonth =  appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;
   },
   getTargetMonth: function() {
      return Math.ceil(targetAmount.value / appData.budgetMonth);
   },
   getStatusIncome: function() {
      if(appData.budgetDay >= 1200) {
         return ('У вас высокий уровень дохода');
      } 
      if(appData.budgetDay >= 600 && appData.budgetDay < 1200) {
         return ('У вас средний уровень дохода');
      } 
      if(appData.budgetDay < 600 && appData.budgetDay >= 0) {
         return ('К сожалению у вас уровень дохода ниже среднего');
      } else {
         return ('Что то пошло не так');
      }
   },
   getInfoDeposit: function() {
      if(appData.deposit) {
         do {
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
         }
         while(!isNumber(appData.percentDeposit));

         do {
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         }
         while(!isNumber(appData.moneyDeposit));
      }
   },
   calcSavedMoney: function() {
      return appData.budgetMonth * periodSelect.value;
   }
};

calcBtn.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);

//if(appData.getTargetMonth() >= 0) {
//   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
//} else {
//   console.log('Цель не будет достигнута');
//}

//for(let key in appData) {
//   console.log(`Наша программа включает в себя данные: ${key}: ${appData[key]}`);
//}
