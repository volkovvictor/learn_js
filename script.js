'use strict';

const money = prompt('Ваш месячный доход?'),
   income = 'Фриланс',
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 300000,
   period = 12;


const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?');
const budgetMonth = amount1 + amount2;
const budgetDay = budgetMonth / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев(-а)');

console.log(Math.floor(budgetDay));

if(budgetDay >= 1200) {
   console.log('У вас высокий уровень дохода');
} else if(budgetDay >= 600 && budgetDay < 1200) {
   console.log('У вас средний уровень дохода');
} else if(budgetDay < 600 && budgetDay > 0) {
   console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
   console.log('Что то пошло не так');
}