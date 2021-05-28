let num = 266219;
num = num.toString();
let sum = 1;

for (let i = 0; i < num.length; i++) {
   sum *= +num[i];
}

console.log(sum);

sum = sum**3;
sum = sum.toString();

console.log(sum.slice(0,2));