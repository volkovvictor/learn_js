'use strict';

const calcBtn = document.getElementById('start'),
      income = document.querySelector('.income'),
      incomeAdd = income.querySelector('button'),
      expenses = document.querySelector('.expenses'),
      expensesAdd = expenses.querySelector('button'),
      depositCheck = document.querySelector('#deposit-check'),
      additionalInputs = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value'),
      budgetDayValue = document.getElementsByClassName('budget_day-value'),
      expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
      additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
      incomePeriodValue = document.getElementsByClassName('income_period-value'),
      targetMonthValue = document.getElementsByClassName('target_month-value');

console.log(calcBtn);
console.log(incomeAdd);
console.log(expensesAdd);
console.log(depositCheck);
console.log(additionalInputs);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);

let money;

//const isNumber = function (n) {
//         return !isNaN(parseFloat(n)) && isFinite(n);
//      }, 
//      start = function(n) {
//         do {
//            money = prompt('Ваш месячный доход?');
//         }
//         while(!isNumber(money));
//      };

//start(money);

//const appData = {
//   income: {}, 
//   addIncome: [], 
//   expenses: {}, 
//   addExpenses: [], 
//   deposit: false, 
//   mission: 300000, 
//   period: 12, 
//   budget: money, 
//   budgetDay: 0, 
//   budgetMonth : 0, 
//   expensesMonth: 0, 
//   asking: function() {
//      if(confirm('Есть ли у вас дополнительный источник заработка?')) {
//         let itemIncome, cashIncome;
//         do {
//            itemIncome = prompt('Какой у вас дополнительный заработок?', 'фриланс');
//         } while(!isNaN(itemIncome) || itemIncome.trim() === '' || itemIncome === null);

//         do {
//            cashIncome = prompt('Сколько вы на этом зарабатываете', 20000);
//         } while(!isNumber(cashIncome));

//         appData.income[itemIncome] = cashIncome;
//      }

//      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
//         addExpensesArr = addExpenses.toLowerCase().split(', ');
      
//      for(let i = 0; i < addExpensesArr.length; i++) {
//         addExpensesArr[i].substring(0, 1).toUpperCase();
//         addExpensesArr[i] = addExpensesArr[i][0].toUpperCase() + addExpensesArr[i].slice(1);

//      }

//      console.log(addExpensesArr.join(', '));

//      appData.addExpenses = addExpenses.toLowerCase().split(', '); 

//      for(let i = 0; i < 2; i++) {
//         let amount;

//         do {
//            appData.addExpenses[i] = prompt('Введите обязательную статью расходов?');
//         }
//         while(!isNaN(appData.addExpenses[i]) || 
//                     appData.addExpenses[i].trim() === '' || 
//                     appData.addExpenses[i] === null);

//         do {
//            amount = prompt('Во сколько это обойдется?');
//         }
//         while(!isNumber(amount));

//         appData.expenses[appData.addExpenses[i]] = +amount;
//      }

//      appData.deposit = confirm('Есть ли у вас депозит в банке?');
//   },
//   getExpensesMonth: function() {
//      let sum = 0;

//      for(let key in appData.expenses) {
//         sum += appData.expenses[key];
//      }

//      return sum;
//   },
//   getBudget: function() {
//      appData.budgetMonth =  appData.budget - appData.getExpensesMonth();
//      appData.budgetDay = appData.budgetMonth / 30;
//   },
//   getTargetMonth: function() {
//      return Math.ceil(appData.mission / appData.budgetMonth);
//   },
//   getStatusIncome: function() {
//      if(appData.budgetDay >= 1200) {
//         return ('У вас высокий уровень дохода');
//      } 
//      if(appData.budgetDay >= 600 && appData.budgetDay < 1200) {
//         return ('У вас средний уровень дохода');
//      } 
//      if(appData.budgetDay < 600 && appData.budgetDay >= 0) {
//         return ('К сожалению у вас уровень дохода ниже среднего');
//      } else {
//         return ('Что то пошло не так');
//      }
//   },
//   getInfoDeposit: function() {
//      if(appData.deposit) {
//         do {
//            appData.percentDeposit = prompt('Какой годовой процент?', 10);
//         }
//         while(!isNumber(appData.percentDeposit));

//         do {
//            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//         }
//         while(!isNumber(appData.moneyDeposit));
//      }
//   },
//   calcSavedMoney: function() {
//      return appData.budgetMonth * appData.period;
//   }
//};

//appData.asking();
//appData.getInfoDeposit();
//appData.getBudget();


//console.log(`Расходы за месяц ${appData.getExpensesMonth()}`);

//if(appData.getTargetMonth() >= 0) {
//   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
//} else {
//   console.log('Цель не будет достигнута');
//}

//console.log(appData.getStatusIncome());

//for(let key in appData) {
//   console.log(`Наша программа включает в себя данные: ${key}: ${appData[key]}`);
//}
