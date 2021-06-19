'use strict';

let calcBtn = document.getElementById('start'),
      resetBtn = document.getElementById('cancel'),
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
      periodSelect = document.querySelector('.period-select'),
      reset = false;

const isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
      };

class AppData {
   constructor() {
      this.income = {}; 
      this.incomeMonth = 0;
      this.addIncome = []; 
      this.expenses = {}; 
      this.addExpenses = []; 
      this.deposit = false; 
      this.budget = 0; 
      this.budgetDay = 0; 
      this.budgetMonth = 0; 
      this.expensesMonth = 0;
   }

   start() {
      if(salaryAmount.value !== '') {
         this.budget = +salaryAmount.value;
         this.getExpenses();
         this.getIncome();
         this.getExpensesMonth();
         this.getInfoDeposit();
         this.getBudget();
         this.getAddExpenses();
         this.getAddIncome();
         this.showResult();
   
         this.stop();
      }
   }

   showResult() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
   }

   addExpensesBlock() {
      let expensesItemsClone = expensesItems[0].cloneNode(true);

      expensesItems[0].parentNode.insertBefore(expensesItemsClone, expensesAdd);

      if(expensesItems.length === 3) {
         expensesAdd.style.display = 'none';
      }
   }

   addIncomeBlock() {
      let incomeItemsClone = incomeItems[0].cloneNode(true);

      incomeItems[0].parentNode.insertBefore(incomeItemsClone, incomeAdd);

      if(incomeItems.length === 3) {
         incomeAdd.style.display = 'none';
      }
   }

   getExpenses() {
      expensesItems.forEach(function(item) {
         let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
   
         if(itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
         }
      }, this);
   }

   getIncome() {
      incomeItems.forEach(function(item) {
         let itemIncome = item.querySelector('.income-title').value,
         cashIncome = item.querySelector('.income-amount').value;
         if(itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
         }
      }, this);
   
      for(let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   }

   getAddExpenses() {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
         item = item.trim();

         if(item !== '') {
            this.addExpenses.push(item);
         } 
      }, this);
   }

   getAddIncome() {
      additionalInputs.forEach(function(item) {
         let itemValue = item.value.trim();
         
         if(itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      }, this);
   }

   getExpensesMonth() {
      for(let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   }

   getBudget() {
      this.budgetMonth =  this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.ceil(this.budgetMonth / 30);
   }

   getTargetMonth() {
      return Math.ceil(targetAmount.value / this.budgetMonth);
   }

   getStatusIncome() {
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
   }

   getInfoDeposit() {
      if(this.deposit) {
         do {
            this.percentDeposit = prompt('Какой годовой процент?', 10);
         }
         while(!isNumber(this.percentDeposit));
   
         do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         }
         while(!isNumber(this.moneyDeposit));
      }
   }

   changePeriod() {
      let periodAmount = document.querySelector('.period-amount');

   periodAmount.textContent = periodSelect.value;
   incomePeriodValue.value = this.calcSavedMoney();
   }

   calcSavedMoney() {
      return this.budgetMonth * periodSelect.value;
   }

   stop() {
      const data = document.querySelector('.data'),
         dataInputs = data.querySelectorAll('input[type=text]');

      dataInputs.forEach(function(item) {
         item.disabled = true;
      });

      calcBtn.style.display = 'none';
      resetBtn.style.display = 'block';

      expensesAdd.removeEventListener('click', this.addExpensesBlock);
      incomeAdd.removeEventListener('click', this.addIncomeBlock);

      reset = true;
   }

   reset() {
      const allInputs = document.querySelectorAll('input');
      allInputs.forEach(function(item){
         if(item.disabled) {
            item.disabled = false;
         }
         if(item.getAttribute('type') === 'range') {
            item.value = 1;
         } else if (item.getAttribute('type') === 'checkbox') {
            item.checked = false;
         } else {
            item.value = '';
         }
      });

      calcBtn.style.display = 'block';
      resetBtn.style.display = 'none';

      this.income = {}; 
      this.incomeMonth = 0;
      this.addIncome = []; 
      this.expenses = {}; 
      this.addExpenses = []; 
      this.deposit = false; 
      this.budget = 0;
      this.budgetDay = 0; 
      this.budgetMonth  = 0; 
      this.expensesMonth = 0;

      expensesAdd.addEventListener('click', this.addExpensesBlock);
      incomeAdd.addEventListener('click', this.addIncomeBlock);
      this.changePeriod();
   }

   eventsListeners() {
      calcBtn.addEventListener('click', this.start.bind(this));
      expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
      incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
      periodSelect.addEventListener('input', this.changePeriod.bind(this));
      resetBtn.addEventListener('click', this.reset.bind(this));
   }
}

//AppData.prototype.start = function(n) {
//   if(salaryAmount.value !== '') {
//      this.budget = +salaryAmount.value;
//      this.getExpenses();
//      this.getIncome();
//      this.getExpensesMonth();
//      this.getInfoDeposit();
//      this.getBudget();
//      this.getAddExpenses();
//      this.getAddIncome();
//      this.showResult();

//      this.stop();
//   }
//};
//AppData.prototype.showResult = function() {
//   budgetMonthValue.value = this.budgetMonth;
//   budgetDayValue.value = this.budgetDay;
//   expensesMonthValue.value = this.expensesMonth;
//   additionalExpensesValue.value = this.addExpenses.join(', ');
//   additionalIncomeValue.value = this.addIncome.join(', ');
//   targetMonthValue.value = this.getTargetMonth();
//};
//AppData.prototype.addExpensesBlock = function() {
//   let expensesItemsClone = expensesItems[0].cloneNode(true);

//   expensesItems[0].parentNode.insertBefore(expensesItemsClone, expensesAdd);

//   if(expensesItems.length === 3) {
//      expensesAdd.style.display = 'none';
//   }
//};
//AppData.prototype.addIncomeBlock = function() {
//   let incomeItemsClone = incomeItems[0].cloneNode(true);

//   incomeItems[0].parentNode.insertBefore(incomeItemsClone, incomeAdd);
//   incomeItems = document.querySelectorAll('.income-items');

//   if(incomeItems.length === 3) {
//      incomeAdd.style.display = 'none';
//   }
//};
//AppData.prototype.getExpenses = function() {
//   expensesItems.forEach(function(item) {
//      let itemExpenses = item.querySelector('.expenses-title').value,
//         cashExpenses = item.querySelector('.expenses-amount').value;

//      if(itemExpenses !== '' && cashExpenses !== '') {
//         this.expenses[itemExpenses] = cashExpenses;
//      }
//   }, this);
//};
//AppData.prototype.getIncome = function() {
//   incomeItems.forEach(function(item) {
//      let itemIncome = item.querySelector('.income-title').value,
//      cashIncome = item.querySelector('.income-amount').value;
//      if(itemIncome !== '' && cashIncome !== '') {
//         this.income[itemIncome] = cashIncome;
//      }
//   }, this);

//   for(let key in this.income) {
//      this.incomeMonth += +this.income[key];
//   }
//};
//AppData.prototype.getAddExpenses = function() {
//   let addExpenses = additionalExpensesItem.value.split(',');
//   addExpenses.forEach(function(item) {
//      item = item.trim();

//      if(item !== '') {
//         this.addExpenses.push(item);
//      } 
//   }, this);
//};
//AppData.prototype.getAddIncome = function() {
//   additionalInputs.forEach(function(item) {
//      let itemValue = item.value.trim();
      
//      if(itemValue !== '') {
//         this.addIncome.push(itemValue);
//      }
//   }, this);
//};
//AppData.prototype.getExpensesMonth = function() {
//   for(let key in this.expenses) {
//      this.expensesMonth += +this.expenses[key];
//   }
//};
//AppData.prototype.getBudget = function() {
//   this.budgetMonth =  this.budget + this.incomeMonth - this.expensesMonth;
//   this.budgetDay = Math.ceil(this.budgetMonth / 30);
//};
//AppData.prototype.getTargetMonth = function() {
//   return Math.ceil(targetAmount.value / this.budgetMonth);
//};
//AppData.prototype.getStatusIncome = function() {
//   if(this.budgetDay >= 1200) {
//      return ('У вас высокий уровень дохода');
//   } 
//   if(this.budgetDay >= 600 && this.budgetDay < 1200) {
//      return ('У вас средний уровень дохода');
//   } 
//   if(this.budgetDay < 600 && this.budgetDay >= 0) {
//      return ('К сожалению у вас уровень дохода ниже среднего');
//   } else {
//      return ('Что то пошло не так');
//   }
//};
//AppData.prototype.getInfoDeposit = function() {
//   if(this.deposit) {
//      do {
//         this.percentDeposit = prompt('Какой годовой процент?', 10);
//      }
//      while(!isNumber(this.percentDeposit));

//      do {
//         this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//      }
//      while(!isNumber(this.moneyDeposit));
//   }
//};
//AppData.prototype.changePeriod = function() {
//   let periodAmount = document.querySelector('.period-amount');

//   periodAmount.textContent = periodSelect.value;
//   incomePeriodValue.value = this.calcSavedMoney();
//};
//AppData.prototype.calcSavedMoney = function() {
//   return this.budgetMonth * periodSelect.value;
//};
//AppData.prototype.stop = function() {
//   const data = document.querySelector('.data'),
//         dataInputs = data.querySelectorAll('input[type=text]');

//   dataInputs.forEach(function(item) {
//      item.disabled = true;
//   });

//   calcBtn.style.display = 'none';
//   resetBtn.style.display = 'block';

//   expensesAdd.removeEventListener('click', this.addExpensesBlock);
//   incomeAdd.removeEventListener('click', this.addIncomeBlock);

//   reset = true;
//};
//AppData.prototype.reset = function() {
//   const allInputs = document.querySelectorAll('input');
//   allInputs.forEach(function(item){
//      if(item.disabled) {
//         item.disabled = false;
//      }
//      if(item.getAttribute('type') === 'range') {
//         item.value = 1;
//      } else if (item.getAttribute('type') === 'checkbox') {
//         item.checked = false;
//      } else {
//         item.value = '';
//      }
//   });

//   calcBtn.style.display = 'block';
//   resetBtn.style.display = 'none';

//   this.income = {}; 
//   this.incomeMonth = 0;
//   this.addIncome = []; 
//   this.expenses = {}; 
//   this.addExpenses = []; 
//   this.deposit = false; 
//   this.budget = 0;
//   this.budgetDay = 0; 
//   this.budgetMonth  = 0; 
//   this.expensesMonth = 0;

//   expensesAdd.addEventListener('click', this.addExpensesBlock);
//   incomeAdd.addEventListener('click', this.addIncomeBlock);
//   this.changePeriod();
//};
//AppData.prototype.eventsListeners = function() {
//   calcBtn.addEventListener('click', this.start.bind(this));
//   expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
//   incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
//   periodSelect.addEventListener('input', this.changePeriod.bind(this));
//   resetBtn.addEventListener('click', this.reset.bind(this));
//};

const appData = new AppData();
appData.eventsListeners();


if(appData.getTargetMonth() >= 0) {
   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
} else {
   console.log('Цель не будет достигнута');
}

for(let key in appData) {
   console.log(`Наша программа включает в себя данные: ${key}: ${appData[key]}`);
}
