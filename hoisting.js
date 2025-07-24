console.log(dodawanie(5, 10));

function dodawanie(param1, param2) {
return param1 + param2;
}

console.log(mnozenie(2, 5));

function mnozenie(num1, num2) {

    return num1 * num2;
}

console.log(timesThree(2))

function timesThree(num) {
  return num * 3;
}

const logUserToConsole = () => {
    const user = {
      firstName: "Andrzej",
      lastName: "Brak",
    };
  
    console.log(user); // { firstName: "Andrzej", lastName: "Brak" }
  }

  logUserToConsole();

