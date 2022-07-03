const inputs = document.querySelectorAll('input');
const firstSquare = document.querySelector('.first');
console.log(localStorage);
if(localStorage.active){
  firstSquare.classList.add('greenColor');
}

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    firstSquare.classList.add('greenColor');
    localStorage.setItem('active', 'true');
  });
});