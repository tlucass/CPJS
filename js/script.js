let salarios = [800, 1500, 1250, 2000, 3500, 10000, 5000, 4500, 8000, 2200]

let salariosAumento = salarios.map(salario => {
  if (salario <= 2000) {
    return Math.round(salario * 1.15); 
  } else {
    return Math.round(salario * 1.10); 
  }
});
  
console.log(salariosAumento);
  
let salariosMaior2500 = salariosAumento.filter(salario => salario > 2500);

console.log(salariosMaior2500);

let somaDosSalarios = salariosMaior2500.reduce((total, salario) => total + salario, 0);

console.log(somaDosSalarios);