'use strict';

let money,
   income = 'Фриланс',
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 300000,
   period = 12,
   expenses1 = prompt('Введите обязательную статью расходов?'),
   amount1 = +prompt('Во сколько это обойдется?'),
   expenses2 = prompt('Введите обязательную статью расходов?'),
   amount2 = +prompt('Во сколько это обойдется?'),
   isNumber = function(num) {
      return isNaN(parseFloat(num));
   },
   getExpensesMonth = function(a, b) {
      return a + b;
   },
   getAccumulatedMonth = function() {
      return money - getExpensesMonth(amount1 + amount2);
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
   },
   start = function() {
      do {
         money = prompt('Ваш месячный доход?');
      } while(isNumber(money));
   };

   start();


console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ' + getExpensesMonth());
console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев(-а)');

console.log(Math.floor(budgetDay));

console.log(getStatusIncome());