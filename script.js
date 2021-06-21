'use strict';

const calcBtn = document.getElementById('start'),
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
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');

let reset = false;

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
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
   }

   start() {
      if(salaryAmount.value === '') {
         alert('Введите корректное значение в поле Месячный доход');
      }  else {
         this.budget = +salaryAmount.value;
         this.getExpenses();
         this.getIncome();
         this.getExpensesMonth();
         this.getInfoDeposit();
         this.getBudget();
         this.getAddExpenses();
         this.getAddIncome();
         this.changePeriod();
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
      let expensesItems = document.querySelectorAll('.expenses-items');
      const expensesItemsClone = expensesItems[0].cloneNode(true);

      expensesItems[0].parentNode.insertBefore(expensesItemsClone, expensesAdd);
      expensesItems = document.querySelectorAll('.expenses-items');

      if(expensesItems.length === 3) {
         expensesAdd.style.display = 'none';
      }
   }

   addIncomeBlock() {
      let incomeItems = document.querySelectorAll('.income-items');
      const incomeItemsClone = incomeItems[0].cloneNode(true);

      incomeItems[0].parentNode.insertBefore(incomeItemsClone, incomeAdd);

      incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length === 3) {
         incomeAdd.style.display = 'none';
      }

      console.log(incomeItems.length);
   }

   getExpenses() {
      expensesItems.forEach((item) => {
         const itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
   
         if(itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
         }
      });
   }

   getIncome() {
      incomeItems.forEach((item) => {
         const itemIncome = item.querySelector('.income-title').value,
               cashIncome = item.querySelector('.income-amount').value;
         if(itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
         }
      });
   
      for(const key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   }

   getAddExpenses() {
      const addExpenses = additionalExpensesItem.value.split(',');

      addExpenses.forEach((item) => {
         item = item.trim();

         if(item !== '') {
            this.addExpenses.push(item);
         } 
      });
   }

   getAddIncome() {
      additionalInputs.forEach((item) => {
         const itemValue = item.value.trim();
         
         if(itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      });
   }

   getExpensesMonth() {
      for(const key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   }

   getBudget() {
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

      this.budgetMonth =  this.budget + this.incomeMonth  + monthDeposit - this.expensesMonth;
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
         this.percentDeposit = depositPercent.value;
         this.moneyDeposit = depositAmount.value;
      }
   }

   changePercent() {
      const valueSelect = depositBank.value;
      if(valueSelect === 'other') {
         depositPercent.style.display = 'inline-block';
         depositPercent.value = '0';
         depositPercent.addEventListener('input', () => {
            if(depositPercent.value >= 100) {
               depositPercent.value = 99;
            }
            if(depositPercent.value < 0) {
               depositPercent.value = 0;
            }
         });
      }  else {
         depositPercent.style.display = 'none';
         depositPercent.value = valueSelect;
      }
   }

   depositHandler() {
      if(depositCheck.checked) {
         depositBank.style.display = 'inline-block';
         depositAmount.style.display = 'inline-block';
         this.deposit = true;
         depositBank.addEventListener('change', this.changePercent);
      } else {
         depositBank.style.display = 'none';
         depositAmount.style.display = 'none';
         depositBank.value = '';
         depositAmount.value = '';
         this.deposit = false;
         depositBank.removeEventListener('change', this.changePercent);
      }
   }

   changePeriod() {
      const periodAmount = document.querySelector('.period-amount');

      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = this.calcSavedMoney();
   }

   calcSavedMoney() {
      return Math.ceil(this.budgetMonth * periodSelect.value);
   }

   stop() {
      const data = document.querySelector('.data'),
            dataInputs = data.querySelectorAll('input[type=text]');

      dataInputs.forEach(function(item) {
         item.disabled = true;
      });

      depositBank.disabled = true;

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

      depositBank.value = '';
      depositBank.disabled = false;

      calcBtn.style.display = 'block';
      resetBtn.style.display = 'none';
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';

      if(depositPercent) {
         depositPercent.style.display = 'none';
      }

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
      this.percentDeposit = 0;
      this.moneyDeposit = 0;

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
      depositCheck.addEventListener('change', this.depositHandler.bind(this));
   }
}

const appData = new AppData();
appData.eventsListeners();