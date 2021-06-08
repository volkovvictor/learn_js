'use strict';

let money;

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
      let addExpenses;

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

      do {
         addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      }while(!isNaN(addExpenses) || addExpenses.trim() === '' || addExpenses === null);

      appData.addExpenses = addExpenses.toLowerCase().split(', '); 
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      for(let i = 0; i < 2; i++) {
         let amount;
         appData.addExpenses[i] = prompt('Введите обязательную статью расходов?');
         amount = prompt('Во сколько это обойдется?');

         while(!isNumber(amount)) {
            amount = prompt('Во сколько это обойдется?');
         }

         appData.expenses[appData.addExpenses[i]] = +amount;
      }

      console.log(appData.expenses);
   },
   getExpensesMonth: function() {
      let sum = 0;

      for(let key in appData.expenses) {
         sum += appData.expenses[key];
      }

      return sum;
   },
   getBudget: function() {
      appData.budgetMonth =  appData.budget - appData.getExpensesMonth();
      appData.budgetDay = appData.budgetMonth / 30;
   },
   getTargetMonth: function() {
      return Math.ceil(appData.mission / appData.budgetMonth);
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
         appData.percentDeposit = prompt('Какой годовой процент?', 10 + ' %');
         appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
   },
   calcSavedMoney: function() {
      return appData.budgetMonth * appData.period;
   }
};

appData.asking();

appData.getBudget();


console.log(`Расходы за месяц ${appData.getExpensesMonth()}`);

if(appData.getTargetMonth() >= 0) {
   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
} else {
   console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

for(let key in appData) {
   console.log(`Наша программа включает в себя данные: ${key}: ${appData[key]}`);
}