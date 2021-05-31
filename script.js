const money = prompt('Ваш месячный доход?'),
   income = 'Фриланс',
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
   deposit = confirm('Есть ли у вас депозит в банке?'),
   mission = 300000,
   period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(', '));

const budgetDay = money / 30;

console.log(budgetDay);

const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?');

const budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев(-а)');