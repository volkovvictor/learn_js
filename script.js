const money = 50000,
   income = 'Фриланс',
   addExpenses = 'Интернет, Продукты, Коммуналка',
   deposit = false,
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