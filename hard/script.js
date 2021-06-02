'use strict';

const inputString = prompt("Введите строку"),
      upgradeString = function(data) {
         if(!isNaN(data)) {
            console.log('Ошибка! Введите строку');
         } else {
            data = data.trim();
            if(data.length > 30) {
               data = data.slice(0, 30) + '...';
            }
         }

         return data;
      };

console.log(upgradeString(inputString));