'use strict';

let num = 266219;
let sum = 1;
num = num.toString();

for (let i = 0; i < num.length; i++) {
   sum *= +num[i];
}

console.log(sum);

sum = sum**3;

sum = sum.toString();

console.log(sum.slice(0,2));

/////////////////////////////////

const lang = prompt('ru или en');
const arr = [
   [
      'Понедельник', 
      'вторник', 
      'cреда', 
      'четверг', 
      'пятница', 
      'суббота', 
      'воскресенье'
   ], 
   [
      'monday',
      'tuesday', 
      'wednesday',
      'thursday ',
      'friday ',
      'saturday ',
      'sunday' 
   ]
];

if(lang === 'ru') {
   console.log([
      'Понедельник', 
      'вторник', 
      'cреда', 
      'четверг', 
      'пятница', 
      'суббота', 
      'воскресенье'
   ]);
} else if (lang === 'en'){
   console.log([
      'monday',
      'tuesday', 
      'wednesday',
      'thursday ',
      'friday ',
      'saturday ',
      'sunday' 
      ]);
} else {
   console.log('Ошибка');
}

switch(lang)  {
   case 'ru': 
      console.log([
      'Понедельник', 
      'вторник', 
      'cреда', 
      'четверг', 
      'пятница', 
      'суббота', 
      'воскресенье'
      ]);
   break;

   case 'en':
      console.log([
         'monday',
         'tuesday', 
         'wednesday',
         'thursday ',
         'friday ',
         'saturday ',
         'sunday' 
         ]);
      break;

   default: console.log('Ошибка');
}

lang === 'ru' ? console.log(arr[0]) : console.log(arr[1]);

///////////////////////////////////////////////////////////

const namePerson = prompt("Имя");

