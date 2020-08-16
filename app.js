const resultsElement = document.querySelector("#results");
const loadingElement = document.querySelector("#loading");

document.querySelector('form').addEventListener("submit", function(e){
  loadingElement.style.display="block";
  resultsElement.style.display = "none";
  setTimeout(calculateResults, 2000);
  e.preventDefault();
})



function calculateResults(){
  const loanedAmountElement = document.querySelector('#loaned-amount');
  const annualInterestElement = document.querySelector('#annual-interest');
  const yearsToPayElement = document.querySelector('#years-to-pay');
  const monthlyPaymentElement = document.querySelector('#monthly-payment');
  const totalPaymentElement = document.querySelector('#total-payment');
  const totalInterestElement = document.querySelector('#total-interest');
  


  const loanedAmount = parseFloat(loanedAmountElement.value);
  const monthlyInterest = parseFloat(annualInterestElement.value) / 12 /100;
  const monthsToPay = parseFloat(yearsToPayElement.value) * 12;
  const x = Math.pow(1 + monthlyInterest, monthsToPay);
  const monthlyPayment = (loanedAmount * x * monthlyInterest) / (x - 1);
  const totalPayment = monthlyPayment * monthsToPay;
  const totalInterest = totalPayment - loanedAmount;


  if (isFinite(monthlyPayment)) {
    loadingElement.style.display="none";
    resultsElement.style.display = "block";
    monthlyPaymentElement.value = monthlyPayment.toFixed(2);
    totalPaymentElement.value = totalPayment.toFixed(2);
    totalInterestElement.value = totalInterest.toFixed(2);

  } else {
    loadingElement.style.display="none";
    renderErrorMessage();
    
  }

}

function renderErrorMessage(){
  const errorElement = document.createElement("div");
  errorElement.className = "alert alert-danger";
  errorElement.innerText = "Please check your input";
  const cardElement = document.querySelector(".card");
  const headingElement = document.querySelector(".heading");
  cardElement.insertBefore(errorElement, headingElement);
  setTimeout(clearErrorMessage, 3000, errorElement);
}

function clearErrorMessage(errorElement){
  
  errorElement.remove();

}