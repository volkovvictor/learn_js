'use strict';

let money,
   amount;

const isNumber = function (n) {
         return !isNaN(parseFloat(n)) && isFinite(n);
      }, 
      start = function(n) {
         do {
            money = prompt('Ваш месячный доход?');
         }
         while(!isNumber(money));
      };

start(money);

const appData = {
   income: {}, 
   addIncome: [], 
   expenses: {}, 
   addExpenses: [], 
   deposit: false, 
   mission: 300000, 
   period: 12, 
   budget: money, 
   budgetDay: 0, 
   budgetMonth : 0, 
   expensesMonth: 0, 
   asking: function() { 
      const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

      appData.addExpenses = addExpenses.toLowerCase().split(', '); 
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      for(let i = 0; i < 2; i++) {
         appData.addExpenses[i] = prompt('Введите обязательную статью расходов?');
         amount = prompt('Во сколько это обойдется?');

         while(!isNumber(amount)) {
            amount = prompt('Во сколько это обойдется?');
         }

         appData.expenses[appData.addExpenses[i]] = +amount;
      }

      console.log(appData.expenses);
   },
};

appData.asking();

appData.getExpensesMonth = function() {
      let sum = 0;

      for(let key in appData.expenses) {
         sum += appData.expenses[key];
      }

      return sum;
   };


appData.expensesAmount = appData.getExpensesMonth();

console.log(appData.expensesAmount);

appData.getBudget = function() {
         appData.budgetMonth =  appData.budget - appData.expensesAmount;
         appData.budgetDay = appData.budgetMonth / 30;
      };

const accumulatedMonth = appData.getBudget();

appData.getTargetMonth = function() {
         return Math.ceil(appData.mission / appData.budgetMonth);
      };
const getStatusIncome = function() {
         if(appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
         } else if(appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
         } else if(appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
         } else {
            return ('Что то пошло не так');
         }
      };

console.log(appData.addExpenses.length);

console.log(`Период равен ${appData.period} месяцев`);
console.log(`Цель заработать ${appData.mission} рублей`);

console.log('Бюджет на месяц: ' + appData.expensesAmount);

if(appData.getTargetMonth() >= 0) {
   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
} else {
   console.log('Цель не будет достигнута');
}

console.log(Math.floor(appData.budgetDay));

console.log(getStatusIncome());