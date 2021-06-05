'use strict';

let money,
   income = 'Фриланс',
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 300000,
   period = 12,
   expenses = [],
   amount;
   //expenses2 = prompt('Введите обязательную статью расходов?'),
   //amount2 = +prompt('Во сколько это обойдется?');

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

const getExpensesMonth = function() {
         let sum = 0;

         for(let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов?');
            amount = prompt('Во сколько это обойдется?');

            if(isNumber(amount)) {
               sum += +amount;
            }
         }
         return sum;
      },
      expensesAmount = getExpensesMonth(),
      getAccumulatedMonth = function() {
         return money - expensesAmount;
      },
      accumulatedMonth = getAccumulatedMonth(),
      getTargetMonth = function() {
         return Math.ceil(mission / accumulatedMonth);
      },
      budgetDay = accumulatedMonth / 30,
      showTypeOf = function(data) {
         return typeof(data);
      },
      getStatusIncome = function() {
         if(budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
         } else if(budgetDay >= 600 && budgetDay < 1200) {
            return ('У вас средний уровень дохода');
         } else if(budgetDay < 600 && budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
         } else {
            return ('Что то пошло не так');
         }
      };


console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ' + expensesAmount);

if(getTargetMonth() >= 0) {
   console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев(-а)');
} else {
   console.log('Цель не будет достигнута');
}

console.log(Math.floor(budgetDay));

console.log(getStatusIncome());