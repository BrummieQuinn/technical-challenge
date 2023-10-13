// a script which validates user input for name, email and card fields
// regular expression used to check all input validity and luhn algorithm used to check card input validity via checksum
// event listeners set to trigger validation functions on blur events
// event listener set to trigger email submission function on click event
// I added and error message object and functions to both display and remove the messages and invalid input highlight for a better user experience

// invalid input message object
const invalidInputMessages = {
  fullName: 'Please enter a valid name in the format "John Doe"',
  emailAddress: 'Please enter a valid email address in the format "example@domain.com\nexample@sub.domain.com\nexample@sub.domain.ac.uk"',
  creditCard: 'Please enter a valid 16-digit card number without spaces'

};
// check message object - development only
// console.log(invalidInputMessages);

// function to display message for invalid input
function invalidInputMessage(inputField, message) {
  /*In order to make the newly created element readable by assistive technology I have added a unique ID for the invalid input message */
  // create unique ID for message
  let invalidMessageId = inputField.id + 'Invalid';
  // create and display message
  let invalidParagraph = document.createElement('p');
  invalidParagraph.classList.add('invalid');
  invalidParagraph.textContent = message;
  // sets unique ID
  invalidParagraph.id = invalidMessageId;

  // log for debug purposes
  console.log(inputField, message);

  // append message below input field
  inputField.parentNode.insertBefore(invalidParagraph, inputField.nextSibling);

  // set aria-describedby attribute for assistive technology
  inputField.setAttribute('aria-describedby', invalidMessageId);

  // highlight field - alert user to error
  inputField.style.borderColor = 'rgb(231,0,100)';

}

// function to remove invalid input message and field highlight
function removeWhenValid(inputField) {
  // remove message when valid
  let invalidParagraph = inputField.nextElementSibling;
  if (invalidParagraph && invalidParagraph.classList.contains('invalid')) {
    inputField.parentNode.removeChild(invalidParagraph);
  }
  // reset field highlight
  inputField.style.borderColor = '';
}

// store fields in a variable
const fullName = document.getElementById('fullName');
const emailAddress = document.getElementById('emailAddress');
const creditCard = document.getElementById('creditCard');
const submitButton = document.querySelector('.submit');

// check variables hold fields - development only
// console.log(submitButton);

// event listeners to trigger validation on blur events

// name field event listener
fullName?.addEventListener('blur', (event) => {
// log input value for debugging
  console.log(fullName.value);
  // call validation function for name field
  validateFullName(fullName.value);
});

// card field event listener
creditCard?.addEventListener('blur', (event) => {
  // log input value for debugging
  console.log(creditCard, creditCard.value, creditCard.value?.length);
  // call validation function for card field
  validateCreditCard(creditCard.value);
});

// email field event listener
emailAddress?.addEventListener('blur', (event) => {
  // log input value for debugging
  console.log(emailAddress.value, emailAddress);
  // call validation function for email field
  validateEmail(emailAddress.value);
});

// event listener to trigger email on submit event
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  // create variables to store validation results
  let fullNameValid = validateFullName(fullName.value);
  let emailAddressValid = validateEmail(emailAddress.value);
  let creditCardValid = validateCreditCard(creditCard.value);
  // log input for debugging
  console.log(fullNameValid, emailAddressValid, creditCardValid);
  // check all fields valid
  if (fullNameValid && emailAddressValid && creditCardValid) {
    // populate user email with relevant values
    // template literals for placement of field input in mailto: url scheme string
    let formSubmission = `mailto:challenge@dn-uk.com?subject=Purchase Submission&body=Name: ${fullName.value}%0D%0AEmail: ${emailAddress.value}%0D%0ACredit Card: ${creditCard.value}`;

    // access user email
    window.location.href = formSubmission;
    console.log(formSubmission, submitButton)
  } else if (!fullNameValid) {
    // highlight field, display message and log;
    invalidInputMessage(fullName, invalidInputMessages.fullName);
  } else if (!emailAddressValid) {
    invalidInputMessage(emailAddress, invalidInputMessages.emailAddress);
  } else if (!creditCardValid) {
    invalidInputMessage(creditCard, invalidInputMessages.creditCard);
  }

	
});

// validation functions
// full name validation function
function validateFullName(nameInput) {
  /* 
  validate name input using regular expression
  regex pattern allows certain characters and patterns in a name
  when input matches pattern - input valid
  */
  let fullNameRegex =
    /^(?:[a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~][a-zA-Z]+\s)+(?:[a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~]*[a-zA-Z]+)*$/;
  if (fullNameRegex.test(nameInput)) {
    // log input value for debugging
    console.log('valid input', nameInput);
    // reset border colour and remove message when input becomes valid
    removeWhenValid(fullName);
    // return for use in submit event
    return true;
  } else {
    // highlight field, display message and log error
    invalidInputMessage(fullName, invalidInputMessages.fullName);
    // log for debug purposes
    console.log('invalid input', nameInput);
    return false;
  }
}

// credit card validation function using regex and luhn algorithm
function validateCreditCard(cardInput) {
  /* 
  step 0: & 1: check length of input & check numeric characters
  regex pattern checks for valid credit card format
  luhn algorithm verifies whether checksum valid
 
  */
  let creditCardRegex = /^(?:(?!^0{16}$)\d{16})$/;

  if (creditCardRegex.test(cardInput)) {
    // log input for debugging
    console.log('valid input', cardInput, cardInput.length);
    // reset border colour and remove message when input becomes valid
    removeWhenValid(creditCard);
  

    // step 2: & step 1 - check sum not 0 & double every other digit from right
    // luhn algorithm verification starts here
    let creditCardDigits = cardInput.length;
    let sum = 0;
    let everySecondDigit = false;

    for (let i = creditCardDigits - 1; i >= 0; i--) {
      let digit = +cardInput[i];

      if (everySecondDigit === true) {
        digit *= 2;
      }

      // step 2 - if doubling results in two-digit number > 9, add product
      if (digit > 9) {
        console.log(digit);
        // convert toString() gives an array of two-digit strings allowing string method split() which gives individual string digits map(Number) creates new array of individual numbers allowing array method reduce() to sum digits in array
        let doubleDigits = digit
          .toString()
          .split('')
          .map(Number)
          .reduce((acc, val) => acc + val, 0);

        // step 3 - Now take the sum of all single
        sum += doubleDigits;

        console.log(sum);
      } else {
        sum += digit;
        console.log(sum);
      }

      // toggle everySecondDigit automatically for next iteration
      everySecondDigit = !everySecondDigit;
    }
    // step 4 - if total modulo equal to 0 number valid; else not valid

    if (sum % 10 === 0) {
      // log for debug purposes
      console.log('valid input', sum, cardInput);
      // reset border colour and remove message when input becomes valid
      removeWhenValid(creditCard);
      return true;
    } else {
      console.log('invalid input', cardInput, creditCardDigits, sum);
      // highlight field, display message and log error
      invalidInputMessage(creditCard, invalidInputMessages.creditCard);
      console.log('invalid input', cardInput);
      return false;
    }
  } else {
    console.log('invalid input', cardInput.length, cardInput);
    // highlight field, display message and log error
    invalidInputMessage(creditCard, invalidInputMessages.creditCard);
    console.log('invalid input', cardInput);
    return false;
  }
}

// email validation function regex used to match most common email formats
function validateEmail(emailInput) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z.]{2,}$/;

  if (emailRegex.test(emailInput)) {
    console.log('valid input', emailInput);
    // reset border colour and remove message when input becomes valid
    removeWhenValid(emailAddress);
    return true;
  } else {
    console.log('invalid input', emailInput);
    // highlight field, display message and log error
    invalidInputMessage(emailAddress, invalidInputMessages.emailAddress);
    return false;
  }
}

