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

const AppData = function() {
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
};

AppData.prototype.start = function(n) {
   this.budget = +salaryAmount.value;
   this.getExpenses();
   this.getIncome();
   this.getExpensesMonth();
   this.getInfoDeposit();
   this.getBudget();
   this.getAddExpenses();
   this.getAddIncome();
   this.showResult();
};
AppData.prototype.showResult = function() {
   budgetMonthValue.value = this.budgetMonth;
   budgetDayValue.value = this.budgetDay;
   expensesMonthValue.value = this.expensesMonth;
   additionalExpensesValue.value = this.addExpenses.join(', ');
   additionalIncomeValue.value = this.addIncome.join(', ');
   targetMonthValue.value = this.getTargetMonth();
};
AppData.prototype.addExpensesBlock = function() {
   let expensesItemsClone = expensesItems[0].cloneNode(true);

   expensesItems[0].parentNode.insertBefore(expensesItemsClone, expensesAdd);
   expensesItems = document.querySelectorAll('.expenses-items');

   if(expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
   }
};
AppData.prototype.addIncomeBlock = function() {
   let incomeItemsClone = incomeItems[0].cloneNode(true);

   incomeItems[0].parentNode.insertBefore(incomeItemsClone, incomeAdd);
   incomeItems = document.querySelectorAll('.income-items');

   if(incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
   }
};
AppData.prototype.getExpenses = function() {
   const _this = this;
   expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value,
         cashExpenses = item.querySelector('.expenses-amount').value;

      if(itemExpenses !== '' && cashExpenses !== '') {
         _this.expenses[itemExpenses] = cashExpenses;
      }
   });
};
AppData.prototype.getIncome = function() {
   const _this = this;
   incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value,
      cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '') {
         _this.income[itemIncome] = cashIncome;
      }
   });

   for(let key in this.income) {
      this.incomeMonth += +this.income[key];
   }
};
AppData.prototype.getAddExpenses = function() {
   const _this = this;
   let addExpenses = additionalExpensesItem.value.split(',');
   addExpenses.forEach(function(item) {
      item = item.trim();

      if(item !== '') {
         _this.addExpenses.push(item);
      } 
   });
};
AppData.prototype.getAddIncome = function() {
   const _this = this;
   additionalInputs.forEach(function(item) {
      let itemValue = item.value.trim();
      
      if(itemValue !== '') {
         _this.addIncome.push(itemValue);
      }
   });
};
AppData.prototype.getExpensesMonth = function() {
   for(let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
   }
};
AppData.prototype.getBudget = function() {
   this.budgetMonth =  this.budget + this.incomeMonth - this.expensesMonth;
   this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
   return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function() {
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
};
AppData.prototype.getInfoDeposit = function() {
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
};
AppData.prototype.changePeriod = function() {
   let periodAmount = document.querySelector('.period-amount');

   periodAmount.textContent = periodSelect.value;
   incomePeriodValue.value = this.calcSavedMoney();
   
};
AppData.prototype.calcSavedMoney = function() {
   return this.budgetMonth * periodSelect.value;
};
AppData.prototype.stop = function() {
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
};
AppData.prototype.reset = function() {
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
};
AppData.prototype.eventsListeners = function() {
   const _this = this;
   calcBtn.addEventListener('click', function() {
      if(salaryAmount.value !== '') {
         _this.start();
         _this.stop();
      }
   });
   expensesAdd.addEventListener('click', _this.addExpensesBlock);
   incomeAdd.addEventListener('click', _this.addIncomeBlock);
   periodSelect.addEventListener('input', _this.changePeriod.bind(_this));
   resetBtn.addEventListener('click', _this.reset.bind(_this));
};

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
