# Software Dev Challenge

* What Is Software Development?

- This activity is designed to take 2-3 hours, but everyone is different, how long you take is not important. Our best applicants return this challenge in 5-7 days. Once completed this activity will be used to screen candidates and forwarded to employers who may use it for a discussion topic at interview. 

- To complete this activity, you don’t need experience of writing code or developing solutions as everything can be searched for, Generative AI may be able to help, but remember you may be asked to explain your code at interview... 

- We are more interested in your ability to follow instructions, your attention to detail and desire to solve the problem than if you can cut and paste… 
  
  * In this activity you will: 
    
    * Task 1: Review a series of user stories
    
    * Task 2: Develop a simple web page using HTML, CSS, JavaScript.
    
    * Task 3: Reflect on what you have learned,
    
    * Task 4: Upload your challenge.

## Task 1: Review User Stories:
* Scenario:

As part of their online offer a training business wants to be able to validate a subscriber’s name, email address and credit card number when they book a course.
The commercial director, marketing director and CTO were identified as stakeholders for this app and identified the User Stories in Appendix A:

### Planning: 7/10/2023:

- upon receiving the challenge, I was really excited, not only for making it to this stage but also, the idea of creating something using user stories and a test suite.  This is not something I have done before, but I found myself planning in my head the different things I would need to consider.  This is before I even got on the computer and while I was doing other things.

- using the simplified test suite and the user stories, I intend to come up with a plan of action. First I need to split up what needs to be used for what.

- Based on the user story I need to create a validation form with 3 input fields and a submit button.  While it hasn't explicitly asked for it, I will make the assumption of building the validation form mobile first.  This is an assumption based on the type of validation being for a course purchase, which I'm sure they would like to be available to as many users as possible.

- Starting with the Commercial Directors needs first I will use semantic HTML using aria roles if necessary for the form to be easily navigable by screen readers
  - possible addition: to make keyboard navigable

- current HTML:
```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <meta
      http-equiv="X-UA-Compatible"
      content="ie=edge" />
    <meta
      name="author"
      content="Georgina Carrington" />
    <meta
      name="description"
      content="validation form" />
    <title>Validation Form</title>
    <link
      rel="stylesheet"
      href="challenge.css" />
  </head>
  <body>
    <main class="validation">
      <fieldset class="validation_form_container">
        <form class="validation_form">
          <label for="fullName"> 
            Full Name:
            <input type="text" id="fullName" placeholder="Full Name" aria-required="true">
          </label>
          <br>
          <br>
          <label for="emailAddress">
            Email Address:
            <input type="email" id="emailAddress" placeholder="email@usp.com" aria-required="true">
          </label>
          <br>
          <br>
          <label for="creditCard">
            CreditCard number:
            <input type="text" id="creditCard" placeholder="Please enter 16 digit card number" aria-required="true">
          </label>
          <br>
          <br>
          <button type="submit" class="submit">Submit</button>
        </form>

      </fieldset>

    </main>
    <script src="challenge.js"></script>
  </body>
</html>

```
- I read somewhere that truly accessible code shouldn't need aria statements - they also haven't been specified so thats a for later 

- While I have the HTML framework I've decided to leave the CSS for last.
- Since Javascript will take me the most time, and the user stories and tests are mostly concerning the web page functionality I will concentrate on that part of the form next.

- Having the user stories and test suite has definitely made it easier to identify the steps I need to take to make the webpage functional.
- It gives both a guide and a checklist to follow to reach a solution
- test cases 1  to 6 all concern the needs of the commercial director, with 6 also concerning the CTO (this may be a test to comeback to when I fulfill the CTO needs).

1. User must be able to insert full name into form:
  - Given name and family name
* test conditions:
  - fields in error must be highlighted pink  RGB 231,0,100 - using addEventListener in conjunction with blur should be able to trigger this change on invalid input (Marketing director needs)
    - use javascript and classList add/remove className (valid/invalid) on blur event validation 
  - valid name = 'John Doe' - regex match/test include \s allow all alphabet characters. case sensitive?
  - valid name = 'John Doe-Deer' regex match/test allow for hyphenated pattern after space 
  - invalid names:
    - John - no family name
    - J Doe - initial and family name - regex more than 1 alphabet characters for first name part of pattern preceding space
   - John D - no family name

- Since I'm using regex to ensure only one pattern is allowed. I'll go back over my notes from freecodecamp.org and mozilla developer guide

#### creating the javascript regex for full name input:
```Javascript
// assign fullName input to variable
let fullName = document.body.getElementByID('fullName');
console.log(fullName);
// create regex validation for full name input by user
let fullNameValidation = /^[A-Z][a-z]+\s[A-Z][a-z]+$|^[A-Z][a-z]+\s[A-Z][a-z]+-[A-Z][a-z]+$/;
/* regex pattern to match:
^[A-Z] - begins with uppercase alphabet character
[a-z]+$ - followed by one or more lowercase alphabet characters and prevent partial matches using '$' must match whole pattern for valid match
\s - whitespace to be matched
|- or used so hyphenated family names can also matched as valid
repeat previous pattern but include the hyphen to be matched
*/
fullName.match(fullNameValidation);
fullNameValidation.test(fullName); 
```
- pass user input string to the regex and extract using .match() or return boolean using .test()
   - 'string'.match(/regex/); 
   - /regex/.test('string');
  - if i use ^ before [a-zA-Z] i can ensure the name must begin with an alphabet character and removing [a-z] will ensure its a capital letter to start
  - I need to check for 2 or more consecutive letters as we cannot accept initials for either Given or family name
  - I also need to ban all digits since a HTML input type attribute set to text will still accept numbers as strings/text
  - I also need to account for hyphenated family names so I should use a second pattern using '|'

- now I have the regex patterns, I can now create a function to test user input against it

* Thoughts: at this point, I'm really happy with my progress and excited to continue building, while I'm not completely confident with all the tasks related to Javascript I have to complete. Looking at you luhn algorithm, I'm beyond happy to be pushing myself.
  - using the testing suite ensures I can use test driven development techniques where I know exactly how my webpage should perform without having to see a working example.

#### creating the validation function for full name input:
```javascript
let fullName = document.body.getElementById('fullName');
console.log(fullName);
let emailAddress = document.getElementById('emailAddress');
console.log(emailAddress);
let creditCard = document.getElementById('creditCard');
console.log(creditCard);
let fullNameValidation = /^[A-Z][a-z]+\s[A-Z][a-z]+$|^[A-Z][a-z]+\s[A-Z][a-z]+-[A-Z][a-z]+$/;
// fullNameValidation.test(fullName);
// add event listener and pass name input
fullName.addEventListener('blur', (event) => {
validateFullname(fullName.value/fullName.innerText);
});
// validation function: takes 1 parameter
function validateFullname(nameInput) {
  if (fullNameValidation.test(nameInput)) {
    console.log(nameInput, 'valid input');
    return true;
  } else {
    console.log(nameInput, 'invalid input');
    nameInput.style.background = 'rgb(231,0,100)';
    return false;
  }
}
```
* Thoughts: How much fun is this constant iteration of code, I don't think this will ever get old. Writing instructions and checking the result based on whether it works as intended or not is fantastic.  This challenge has been a perfect way for me to utilise everything I've learned so far and put it all together building something new!
- For the things I can't remember there's MDN web documents and my notes
- Something I've also noticed while going back and forth between building and the user story and test suite is how many needs actually combine.  One example being the input fields, while working on the javascript I realised the Marketing Director and Commercial Directors needs can be solved simultaneously and that the onBlur event code which is the last test on the list can also be written at this point.

- Now I've got code to work with, I'll write it including console.log() for checks in the browser dev tools - currently all elements have been stored in variables and are showing up in dev tools console.

### Planning: 8/10/2023:

- I've done some thinking since I stopped work yesterday and have come to the conclusion that once I've completed the given and family name validation function. I will focus on the credit card validation and converting the C++ luhn algorithm into a Javascript algorithm.
- At this point I'm grateful for having researched and learned some basic C# fundamentals that I think will apply based on them both being in the C family.
- Also from experience, Javascript is a looser typed version, I believe if I can work out each line of code and what it does, I should be able to come up with a workable solution.
- However, this only makes me more aware of the fact that this is something new to me and therefore will require the most attention to make it work. If I'm being honest I'm excited to learn both this and how to use mailto: in conjunction with the submit button, since I have only ever used this with a link before.  Both of these parts of the first task will be a challenge but I'm actually looking forward to pushing myself beyond what I know and build something using new techniques.
- There are also a few things the user story doesn't specify I would like to add to increase the user experience.  I'm also concerned with the font size requested by the Marketing Director, may not be a good idea if the app is to conform with web accessibility.
- As I'm not able to ask the question I will research the best solution for this.  I'll look into the minimum font size that complies with web accessibility and if the font size is something that cannot be changed I believe that adding font weight and colour may also be something to consider in order to meet the marketing directors needs.

- Ok so the code for the validation function is written and I'm now testing against the suite of edge cases and checking the console logs to ensure it works as intended.  Once that is complete I will add the code to change the input colour on invalid input on blur

* Results of name tests:
  - All test suite names were passed into the input and the validation function works as intended. It also will not take any numbers

- I have taken another look at  the needs of the CTO and the want to make sure the names are secure with no risk of database corruption through SQL injection (A very real security risk) - in the name field I have covered the need for only standard upper/lower case letters however I need to test to see if I am also allowing these permitted characters: !#$%&'*+-/=?^_`{|}~ in the name field.  If not I will need to change the pattern to allow for them
- after testing for names like O'connor I realised I will also need to allow for these characters in the name input field.  Without the user story I think I would have realised eventually, but it's super helpful to have something to go back to to check you've covered all the edge cases, even those not mentioned in the test suite.  One other edge case thought is that not everyone writes with the appropriate grammar, therefore I should allow for people writing their name as 'john doe' too - this can be achieved by using the /i insensitive flag and reduce the ranges used for alphabet characters

- I'm definitely going to have to make changes to the pattern to include these permitted characters which will mean going back over my notes and more mdn research.
- I remember that there was something about capture groupings. I love that this is forcing me to not only draw on what I currently know but to also seek out the answers for the things that are beyond my current knowledge.  All of this is building my foundations, all of the ideas that do and don't work, mistaken assumptions and correct ones are all adding to my softwared development journey.  Again have I said how much fun I'm having breaking down the needs of both those mentioned in the user story but also those not mentioned - the intended user.  This feels like something I'm meant to do with my life, learning to program is so much a never ending journey and I love that!
- while capture groups are usually used for search and replace I knew I remembered taking notes about them also being good for when you don't know the string to be entered.
- time to see what mdn is saying:
  - (?:x) = non capturing group - matches x but doesn't remember the match
    - groups parts of a pattern together without capturing match as a separate set. 
    - doesn't affect the number of capturing groups
  - ? = makes the preceding part optional as it may or may not exist
  - (x) = capturing group - matches x and remembers match for future reference
    - multiple capturing groups allowed
    - creates an array of matches in same order from left '(' parentheses
    - capturing groups may be nested
      - in this case matches are accessed via index of results (arrays) elements e.g. ([1],...,[n])
    - capturing groups have performance penalty (I wish I knew more about optimisation and big O algorithms at this point) whats the right direction to take here?
    - use non capturing group if using result not necessary

- my current regex:
- currrently covers all tests
- needs to allow for the following edge cases
- mary jane smith = valid input
- John O'connor = valid input
- John Deer-O'connor = valid input
- mary-jane smith-O'connor = valid input
- !#$%&'*+\-\/=?^_`{|}~ = permitted characters
- need to avoid permitted characters from being valid input e.g. !#$%&'*+-/=?^_`{|}~ = invalid input
- john doe = valid input? (not in test suite but using my own judgement I will allow for the following reasons: most users don't necessarily capitalise unless told to specifically, this would alter the marketing directors design and possibly frustrate users not alerted prior to entering details)
```Javascript
let fullNameValidation = /^[A-Z][a-z]+\s[A-Z][a-z]+$|^[A-Z][a-z]+\s[A-Z][a-z]+-[A-Z][a-z]+$/;

/* adjustments:
^[A-Z][a-z]+ = given name 
^[A-Z] - begins with uppercase alphabet character
[a-z]+$ - followed by one or more lowercase alphabet characters and prevent partial matches using '$' must match whole pattern for valid match | change to allow for cases like mary-jane smith-O'connor

^([a-zA-Z]+ = given name
^[a-zA-Z]+ - begins with upper/lower alphabet character placed into a range together for conciseness and matches one or more alphabet characters
[a-zA-Z!#$%&'*+-/=?^_`{|}~]* - followed by zero or more permitted characters and alphabet characters within range
[a-zA-Z]+ = given name
 - followed by one or more alphabet characters in the case the user uses a second given name
\s - matches any whitespace characters 
)* - allows for zero or more times the capturing group pattern occurs
[a-zA-Z]+ = family name
[a-zA-Z!#$%&'*+-/=?^_`{|}~]* - followed by zero or more permitted characters and alphabet characters within range
[a-zA-Z]+ = family name
$ - ensure matches whole pattern for valid match
*/
let fullNameRegex = /^([a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~][a-zA-Z]+\s)*[a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~]*[a-zA-Z]+$/;
// create regex to test for correct pattern in name field
/* iteration 1: (didn't include permitted characters but passed all tests)
let fullNameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$|^[A-Z][a-z]+\s[A-Z][a-z]+-[A-Z][a-z]+$/;
*/
/* iteration 2: fullNameRegex pattern includes - a capturing group for given names including permitted characters and whitespace for zero or more occurances
- ranges are used to pattern match for family names including permitted characters and whitespace for one or more/zero or more occurances
let fullNameRegex =
  /^([a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~][a-zA-Z]+\s)*[a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~]*[a-zA-Z]+$/;
*/

```
- By creating a capturing group I was able to account for unusual names and allow for the permitted characters mentioned in the user story.
- I also combined ranges for conciseness [a-z][A-Z] to [a-zA-Z] which also allows the pattern to be more easily read
- there's no mention of case sensitivity, however I will allow the default to stand as insensitivity would allow for JoHn DoE which would be a database headache.
- I think the adjustments should be complete to solve the edge cases I was able to identify that were not included in the test suite.
- I'm making this app to both the best of my ability and as if it were a real life page that will have many users
- It works! my regex is working for my edge case.  One thing I've noticed is that permitted characters are only allowed in one name not both or all. I'm not sure if I want to change this as it may leave it up to abuse by passing input in the name field that consists of all the permitted characters
- The CTO needs only mention the characters should be allowed in the name field, which they are, just with restrictions to avoid edge cases where this may lead to database corruption through SQL injection
- I have decided that to change the whole input field to that colour would make it difficult for users to see what they had written that was invalid.  In order to strike the balance between making invalid input noticeable and user friendliness, I have opted to highlight the border colour which I believe is a common way to alert users to an issue and where it is
- Now I have the name input working I feel like I'm on track with my progress.
- tomorrow i begin converting the algorithm for credit card validation


/


### Planning: 9/10/2023:
- After finishing yesterday I thought over my regex pattern for the name field. I've used a capturing group, which isn't strictly necessary since I don't need to work with the captured matches.  Since using capturing groups can affect performance, and I read on MDN to use non capturing groups unless necessary, I've decided to tweak my current regex pattern to a non capturing group pattern.
- While I don't know too much about optimisation as I've mentioned before, I'm willing to create efficiencies wherever I can in my code.
```Javascript
// objective: change capturing group () into non capturing (?:) groups to increase efficiency while retaining current functionality
let fullNameRegex =
  /^(?:[a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~][a-zA-Z]+\s)*(?:[a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~]*[a-zA-Z]+)$/;

```
- the 2 non-capturing groups worked fine, however it was necessary to adjust the family name pattern non capturing group by adding * before the $ ending anchor so the final working regex is:
```Javascript
let fullNameRegex =
  /^(?:[a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~][a-zA-Z]+\s)*(?:[a-zA-Z]+[a-zA-Z!#$%&'*+-/=?^_`{|}~]*[a-zA-Z]+)*$/;
```
- I'm confident after my testing against the testing suite test data, and my own edge case test data that wasn't included, but occured to me after seeing the test data and thinking about real users
- another thing I noticed about the user journey is that noone seems to have considered the users of the app, so my approach will be to fulfill the needs of the stakeholders, while also thinking about real users of the app and make adjustments according to that.
- I think once I have the basic functionality down, I will attempt to make things more convenient to the user.  The highlighted border is a good way to show invalid input, but due to the branding colours I believe colour blindness must be considered an issue to work around.  
- I would like to add a warning to users for invalid input with a warning text cue that only appears on error and disappears when not necessary, like the highlghted border. The key here is giving a screen reader something to cue users who may rely on this technology to navigate the web. I also would like to add keyboard navigation if I have the time too.

- Todays task is to work on the credit card input, there are a few things to note here.
- The Commercial Director needs the user to insert credit/debit card into form - use LUHN algorithm
- The CTO would like this to happen on the page using the same blur event used for the name field
- credit card test data:
  - valid numbers begin with 4 and are 16 digits long
  - invalid numbers can:
    - begin with 4 and too many digits
    - begin with 4 and too few digits
    - 0000000000000000 begins with 0 and continuous 0's
- validation of credit cards occurs on blur event with invalid input triggering field highlight

- I'm not familiar with LUHN algorithm but I do get the gist of it, and I'm grateful for the step by step instruction for 11 digits and my job is to extrapolate the algorithm for the use of 16 digits.
- My Javascript code needs to implement the following steps to check a credit card number - candidtes are expected to follow the steps and implement them, not cut and paste, which is actually a challenge I'm looking forward too, not gonna lie.
- They also provide the algorithm in C++ which at first glance seems very similar to C#.
- If I can make the example work with 11 digits in Javascript, I should be able to understand the working logic of the code and that should lead me to understanding how to make it work with 16 digits.

- example: using account number 79 92 73 98 713

1. check the length of the number
console.log(creditCard.length);

2. check for number only contains numeric values
simple regex for digits could be 
creditCardRegex = /^\d+$*/

3. check SUM of number is not 0
let sum = 0;
for (let i = creditCard.length; i <= creditCard.length; i--){
  sum += creditCard[i];
}  
an if/else statement to filter numbers that sum 0
if (sum === 0) {

} else {

4. starting from the right, double value of every 2nd digit at this point I have no way of working out any kind of code without looking at the c++ algorithim which I'm going to copy and try to translate and work it out based on the steps given in this part of the challenge. This is so fun, just problem solving and basically seeing what does and doesn't work can get frustrating, but when the penny drops and it does what you hoped is such a great feeling that I really can't stop. 
}

- LUHN algorithim in C++:
```C++
//C++ program to implement LUHN algorithm
//preprocessor directive to include large set of C++ libraries without individual specification - not necessary in javascript.
#include <bits/stdc++.h>
using namespace std;

// Returns true if given card number valid
bool checkLuhn(cont string& cardNo)
{
// assign variable to hold card length for my algorithm this so mine would be let creditCardNo = creditCard.length
/* here I will need to use creditCardNo variable to do initial length check if less than 16 it will be invalid, my input range has been set to 16 for maxlength*/
  int nDigits = cardNo.length();
// here is the line that assigns variables for the SUM check (nSum = 0;) and alternating every second digit check (isSecond = false) ensures loop termination
  int nSum = 0, isSecond = false;
  // for loop started. iterates through the card length assigned to i starting from the right, while i less than or equal to 0, i decrements
  for (int i = nDigits - 1; i >= 0; i--) {

// assigns a variable to every second digit, d = cardNo[i] - 0;
    int d = cardNo[i] - '0';
// if isSecond is true every 2nd digit multiplied by 2
    if (isSecond == true)
      d = d * 2;

    // if addition of 2 digits where d*2 leads to two digit numbers e.g 10
    nSum += d / 10;
    nSum += d % 10;
// toggle value of isSecond back to false ensuring the next value skips each iteration
    isSecond = !isSecond;
  }
  // checks if final nSum is divisible by 10 (luhn algorithm logic)
  return (nSum % 10 == 0);
}

// Driver code - code that fires the algorithm - mine will involve the event listener being passed the luhn algorithm which will include the main functions logic
int main()
{
  string cardNo = '79927398713';
  if (checkLuhn(cardNo))
    printf('This is a valid card');
  else
    printf('This is not a valid card');
  return 0;
}
```
- Based on the steps, what I know of javascript, and the above code, I'll attempt to make the same as a working example 
- using dot notation I've been able to access the length of the string input using creditCard.value.length. I've also been able to check that it will only accept 16 characters by adding an event listener that triggers the blur event for the field.  I'm hoping I have time to optimise this program by combining some methods and functions
```Javascript
// access card field and assign to variable
const creditCard = document.getElementById('creditCard');
// check field input stored in variable
console.log(creditCard, creditCard?.value, creditCard?.value.length);

function validateCreditCard(cardInput) {
  // step 1: check length of number input into field
let creditCardDigits = creditCard.value.length;
// use if/else statement to check length
if (creditCardDigits === 16) {
// step 2: check number contains only numeric characters
// regex checks for pattern of 16 consecutive digits with no spaces or hyphens allowed
// last thing now is to invalidate all 0 input too
let creditCardRegex = /^\d{16}$/;
  if(creditCardRegex.test(creditCard.value)) {
    console.log(creditCard.value, creditCardDigits);
    
  // sum variable stores and calculates the summed card digits 
let sum = 0;
// secondDigit variable tracks every second digit is being processed
let secondDigit = false;
// for loop to iterate through card digits from the right
for (let i = creditCardDigits - 1; i >= 0; i--) {
  // assign variable to creditCardDigits[i] index to process every second digit
  let digitCheck = creditCardDigits[i] - 0;
  // 
}


  } else {
    console.log('invalid input', creditCard.value, creditCardDigits);
   // highlight field - alert user to error
  creditCard.style.borderColor = 'rgb(231,0,100)';
  }
} else { 
  console.log('invalid input', creditCard.value, creditCardDigits);
   // highlight field - alert user to error
  creditCard.style.borderColor = 'rgb(231,0,100)';
}

}

// 
```
- while building this algorithm in Javascript I've come to the realisation that it doesn't matter how many digits are passed to the algorithm. 10, 11 or 16 the core logic remains the same
- because the key to luhn algorithm is that the algorithm iterates from right to left, doubling every second digit, followed by the luhn algorithm check sum.
- Therefore it's up to me to find a way to intergrate the length check and  the regex check alongside the luhn algorithm check to validate the credit card number. Omigosh I think I totally understand it now - LIGHTBULB! - Lol!!!
- Now with new understanding I'm going to translate this sucker into Javascript
```Javascript
// access card field and assign to variable
const creditCard = document.getElementById('creditCard');
// check field input stored in variable
console.log(creditCard, creditCard?.value, creditCard?.value.length);

// assign event listener for blur event triggered validation
creditCard?.addEventListener('blur', (event) => {
// using dot notation creditCard.value.length allows access to field input length for check
  console.log(creditCard, creditCard.value, creditCard.value?.length);
//  call card validation here
validateCreditCard(creditCard.value);
});

// create function to validate credit card
function validateCreditCard(cardInput) {
// step 1 & 2: check card length and format using regex
let creditCardDigits = creditCard.value.length;
let creditCardRegex = /^\d{16}$/;
if(creditCardRegex.test(creditCard.value)) {
    console.log(creditCard.value, creditCard.value.length);
// step 3: check sum of number not 0
// sum variable stores and calculates the sum of card digits 
let sum = 0;
// secondDigit variable tracks every second digit is being processed - starts false to miss first digit
let secondDigit = false;
// step 4: starting from rightmost digit, double value of every second digit
// for loop to iterate through card digits from the right using .length - 1
for (let i = creditCardDigits - 1; i >= 0; i--) {
 // assign variable to creditCardDigits[i] index to process every second digit - 0 lets algorithm know to use next digit use (+) opertator to convert string to numbers
  let digit = +creditCardDigits[i] - 0;
  // when secondDigit is true 
  if(secondDigit === true) {
  // multiply and assign 2 (double it)
    digit *= 2;
// step 5: if doubling number results in number greater than 9 = two digit number
    if (digit > 9) {
    // calculate sum of individual digits:
    // split into idividual digits; use dot notation
    // convert to string: use string methods use toString()method. use split('') method to create array of individual characters. map(Number) method in conjunction with Number to convert each character back to a number type. Now that it is an array, array methods are available to me, meaning I can use the reduce((acc, val) => acc + val, 0) method to sum each number in the map(Number) array
let doubleDigits = digit.toString().split('').map(Number).reduce((total, currentDigit) => total + currentDigit, 0);
// I changed the parameters from those usually used as this is my first time using reduce(). This was soley to help me with my understanding of the code and the parameters usage in my code
// I have started with an initial value of 0 as the second argument
// the first parameter consists of the acc(accumulation of each element summed) and the val(each element in the array) - to make sure I could keep track of what the code was doing I changed it to a more relevant total = acc and currentDigit = val
// add and assign to the sum variable
      sum += doubleDigits;
// step 6: take the sum of all single digits
    } else {
       sum += +digit;
    }
// step 7: if sum modulo 10 equal to 0
} else if(sum % 10 === 0){
console.log('valid'sum, creditCard.value);
} else {
    console.log('invalid input', creditCard.value, creditCardDigits);
   // highlight field - alert user to error
  creditCard.style.borderColor = 'rgb(231,0,100)';
  }
  //  toggle for next iteration using !secondDigit will toggle automatically between boolean values - may move to end
 secondDigit = !secondDigit;
} 
}
}
```
- when you realise that you've been an idiot and nearly checked something twice in different ways for no reason. This is why I plan my code in an md document first, I know it should probably be pseudocode, but honestly I need to write in syntax to get things to make sense to me. But playing around with code initially in a document allows me to see how it would look.  Lucky for me as I was looking at the length check code and the regex code I had written in planning, I went back over my regex noted from freecodecamp.org and realised by adding {16}, {}(quantity specifiers) are used after the pattern character to specify an exact number of  matches, meaning I'd ensured it had to be 16 consecutive digits already, therefore a length check is totally redundant, by adding this regex to the luhn algorithm I can create a function that uses both to check the card and validate if the pattern and sum match

### Planning: 10/10/2023:
- Today I plan to complete my luhn algortihm for the credit card validation function. I believe I'm on the right track. If I can split the doubled digits > 9, sum them, add and assign to the sum I need to create from those less than 9
- I think I may have had some inspiration in the night and after bouncing a few ideas off of chatgpt, mainly to make sure my understanding of what the C++ code was doing on each line was correct. I think I've been able to finalise the planned code for my version of a credit card validation using luhn algorithm. You really have to know what each line of the C++ code does and match it with the steps provided. There's absolutely no way to build it in Javascript otherwise.
- step 2 of the example caused me the most trouble and I'm guessing I need to do more programming as it took me a while to think of how to sum digits > 9.  But it was while I was ruminating on this that I realised I had forgotten to explicitly convert the string to number type.  It would have been bad practice to rely on automatic type conversion as my code could have become harder to understand for others.  
- It came to me as I was working on the methods to split and sum the individual characters, once I realised I would have to use map(Number) to convert to number type for the reduce method to work.
- step 2 of 2 required me to break the problem down even further, how do I get individual characters? never mind sum them.  I remembered I could use the split method for strings, but because I'd already converted them to numbers this meant I would have to convert back using toString(), using the split('') method then gave me an array of individual string characters 
- This is the point where dot notation became my friend as I was able to use the map(Number) method with number between the parentheses to create an array with individual numbers again.
- Now I had an array of individual numbers I was now able to use the array method reduce((acc, val) => acc + val, 0) which I had previously learned through various books and courses is a simple way to sum the elements of an array, which is perfect as it means I could avoid using a performance costing for loop
- I decided to use my own parameter names in the reduce method to remind me of their purpose in my code since using the method outside of practice is new to me
- after this I add and assign doubleDigits to sum and complete step 2 of 2
- calculate sum of individual digits:
- split into idividual digits; use dot notation
- convert to string: use string methods use toString()method. use split('') method to create array of individual characters. map(Number) method in conjunction with Number to convert each character back to a number type. Now that it is an array, array methods are available to me, meaning I can use the reduce((acc, val) => acc + val, 0) method to sum each number in the map(Number) array
- all of that worrying about converting to numbers and it turns out - 0 will do the conversion too e.g. '5' - 0 = 5. But I don't make mistakes or waste time, its all valuable learning experience for the future
```Javascript
// access card field and assign to variable
const creditCard = document.getElementById('creditCard');
// check field input stored in variable
console.log(creditCard, creditCard?.value, creditCard?.value.length);

// assign event listener for blur event triggered validation
creditCard?.addEventListener('blur', (event) => {
// using dot notation creditCard.value.length allows access to field input length for check
  console.log(creditCard, creditCard.value, creditCard.value?.length);
//  call card validation here
validateCreditCard(creditCard.value);
});

// create function to validate credit card
function validateCreditCard(cardInput) {
  // step 0 & step 1: check length & only numeric characters
  let creditCardRegex = /^\d{16}$/;
  if(creditCardRegex.test(creditCard.value)) {
    // check
    console.log(creditCard.value, creditCard.value.length);
  // step 2: check that sum is not 0
  // step 1 - double value of every other digit from right
  let creditCardDigits = cardInput.length;
  let sum = 0;
  let secondDigit = false;
  // loop through credit card digits from the right
  for (let i = creditCardDigits - 1; i >= 0; i--) {
    // - 0 converts to number type
    let digit = cardInput[i] - 0;
    if(secondDigit === true) {
      digit *= 2;
    }
 
   // step 2: if doubling results in two-digit number greater than 9, add the product
      if(digit > 9) {
        let doubleDigits = digit
        .toString()
        .split('')
        .map(Number)
        .reduce((total, currentDigit) => total + currentDigit, 0);

        sum += doubleDigits;
        console.log(sum. doubleDigits);
      } else {
         // step 3 - now take the sum of all the single digits
    sum += digit;
    console.log(sum, digit)
      }

 // toggle secondDigit for next iteration
    secondDigit = !seconDigit;
  // step 4 - if total modulo 10 equal to 0 number valid; else not valid
        if(sum % 10 === 0) {
          // sum multiple of 10
          console.log('valid')
        } else {
          console.log('invalid input', creditCard.value, creditCardDigits);
   // highlight field - alert user to error
          creditCard.style.borderColor = 'rgb(231,0,100)';
        }
    }
  }
  } else {
    console.log('invalid input', creditCard.value, creditCardDigits);
   // highlight field - alert user to error
    creditCard.style.borderColor = 'rgb(231,0,100)';
  }
  

```
- I will now use the test suite to try to identify any errors
- 4111111111111111 = valid input

### Planning: 11/10/2023:

- Today I'm going to investigate the luhn algorithm i've created.  Yesterday it suddenly seemed to work, but without knowing why, or being able to replicate it, i won't consider this done.

- Okay, so I decided to test my algorithm against the example for 11 numbers '79927398713' when the luhn algorithm is correct this number is valid as its sum is 70.  
- If my code can work for this example, it will work for the test suite is my hope. Luckily, using the regex quantity specifier, makes changing the number of allowed numeric characters easy.
- And yes I'm the idiot who realised that I forgot to add sum += digit; as an else for the conditional statement: 
```Javascript
if (digit > 9) {

} else {
  sum += digit;
}
```
- As soon as I made this change to the code, the example number became valid!
- continuing from yesterday's plan I will test against the suite with 16 digits and then try to refactor my algorithm into a more efficient form like the C++ luhn algrithm.
- It returns the result of the algorithm to a separate 'driver' code which separates the validation aspect from the algorithm.
- I have also worked out the two lines of C++ code related to the handling of cases where two digits need to be made after doubling:
```c++
nSum += d / 10; 
nSum += d % 10; 
```
- This is the equivalent of both the code I wrote using the string to array to number method and:
```Javascript
// another way to get individual digits from 2-digit number
// tensDigit = separates the 10's
let tensDigit = Math.floor(digit /10);
// unitsDigit = separates the 1's (units)
let unitsDigit = digit % 10;

sum += firstDigit + secondDigit
```
- I'm not sure which would show my abilities more, the above shows my ability to create a 2 line solution to sum 2-digit numbers using maths, however the longer version shows the methods I know how to use to manipulate a string using string and array methods and also explicit type conversion.

- I will now use the test suite to try to identify any errors, once this is done, I will move onto refactoring the code.  Once I've completed this I will have the following left:
  1. email field
  2. user email created and sent on submit
  3. css design
  4. add extra invalid input message toggle for users - make available for screen readers
  5. keyboard navigation

- 4111111111111111 = valid input
- 41111111111111111 = invalid input
- 411111111111111 = invalid input
- 0000000000000000 = valid input (should be invalid)
- the changes I've made hold for the test suite too.
- The only thing I need to do before refactor is to make 16 consecutive 0's invalid input which I believe I can do with my regex, using both non capturing groups and a negative lookout and quatity specifier to make sure the 16 consecutive 0's cannot match the pattern
```Javascript
let creditCardRegex =  /^\d{16}$/;

// create non capturing group and nest negative lookout
// add current regex pattern to the end of non capturing group
let creditCardRegex = /^(?:(?!^0{16}$)\d{16})$/;
```
- Adding this regex means that now the credit card validation function using luhn algorithm works and passes all the test suite test data, so finally refactoring is in sight
- By returning validateFullName function to name field event listener as: if (!validateFullName(fullName.value)) 
- By returning validateCreditCard function to card field event listener as: if (!validateCreditCard(creditCard.value)).

- Time to work on the email field, if I have the time I will refactor the code, however getting a functional validation page finished within the required time with the extras I wan't to add for the user experience will come first as always

- project tasks to do:
  1. email field
  2. user email created and sent on submit
  3. css design
  4. add extra invalid input message toggle for users - make available for screen readers
  5. keyboard navigation for accessibility

- Commercial Directior needs:
  - insert email into form
- CTO needs:
  - html field type="email" or Regex for email - why not both
- Test suite:
  - requires field to highlight on invalid input as the other fields
  - test@abc.com = valid input
  - @abc.com = invalid input
  - test@.com = invalid input
  - test@abc = invalid input

 - Now email field has an event listener I'll create the regex for the email validation function
 ```Javascript
 const emailAddress = document.getElementById('emailAddress');
 // add event listener to call blur event and fire validation function for email
emailAddress?.addEventListener('blur', (event) => {
  console.log(emailAddress.value, emailAddress);
});

// function to validate email field input using regex pattern
function emailValidation(emailInput) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailInput)) {
    console.log ('valid')
  } else {
    console.log('invalid')
  }
}
 ``` 
 - from previous work where I had to validate an email using regex I found and used this pattern without thinking let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  - begins ^ anchor
  - [Before the @ in email] negated range of whitespace and @ sign one or more occurrances (allow everything but)
  - @
  -[after the @ in email] repeat negated range one or more occurrances (allows everything but)
  - \. escape . in email pattern
  - [after the . in email]repeat negated range one or more occurrances (allows everything but)
  - end $ anchor
- This has allowed me to see the progress that I've made from copying and pasting regex patterns or code like back then to looking at the regex pattern and know how it works, why it works and I could build or adapt myself if necessary.
- adding this regex to my code will hopefully pass all of the test data in the test suite
- my email validation function passes all of the test in the suite
- so after looking up information on email regex the existence of subdomains (which honestly who doesn't know about them) came to my attention and made me think of domains for schools and universities that use .ac.uk and government uses gov.uk 
- user@sub.ac.uk
- user@sub.gov.uk
- user@sub.domain.com
- the above are all valid emails that would be invalid with my current regex which only allows for basic emails e.g. user@domain.com
```Javascript
let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z.]{2,}$/
```
- my new regex now accomodates for real life email addresses beyond the test cases
- ^ start anchor
- [^\s@]+ everything but one or more occurrances of the negated range
- @
- repeat negated range for one or more occurances
- \. escape .
- [a-zA-Z.] everything within the range allowed for pattern match (allows for sub domain extensions)
- {2,} quantity specifier to match domain extensions at least two characters long

- project tasks to do:
  2. user email created on submit button - use submit event?
  3. css design - according to user story and webaccessibility/mobile first
  4. add extra invalid input message toggle for users - make available for screen readers
  5. keyboard navigation for accessibility
  6. refine comments

- I need to research how to send the form by opening the users email and having it be populated with the user information from the form.
- I have used the mailto: before with links and I've created a submit event before, but I have never tried to combine the two.  
- This is another new concept I have never attempted before and I'm excited to see what I am able to come up with based on what I'm able to learn on the fly. This is completely different to the luhn algorithm, with that I knew there was a solution in C++ and I could read and match to each step in the example given for this checksum. 
- I know for a fact I have no notes on this, but I do have a few Javascript coding books that I can check, this will be followed by MDN and if that doesn't work for me I'll check out what W3Schools

### Planning: 12/10/2023:

- Today I intend to fulfil the final Commercial Director need of:
  - The user needs to send an email to challenge@dn-uk.com when submit button pressed and all fields are valid
  - i.e. use the mailto: HTML tag mailto: send an email to challenge@dn-uk.com with the entered data in the form

1. onClick event - prevent default behaviour (prevents refresh of page and possibly opening of blank page)
2. collect the value of name, email and card fields
3. open user default email populated with data

```Javascript
// store fields in a variable
const submitButton = document.querySelector('.submit');

// check variables hold fields - development only
console.log(submitButton);

// event listener to trigger email on submit event
submitButton.addEventListener('click', (event) => {
	
// here I need to collect the valid values 
if (validateFullName() & validateEmail() & validateCreditCard()) {
  event.preventDefault();
  // populate user email with relevant values
  let formSubmission = 
// access user email
window.location.href = formSubmission;
} else if (!validateEmail() || !validateCreditCard() || !validateFullName) {

// use document.createElement to add a <p> to inform user of errors in message, toggle to hide when input valid

}


	
});
```
- So I've started my research with looking up what MDN said about submit - usually used as type attribute for an ```<input>``` element.
- This lead to me being reminded of the formaction attribute used in the ```<form>``` element
- formaction - a string indicating the url to which to submit the data.  Takes precedence over the action attribute on the ```<form>``` element that owns the ```<input>```
- So now I'm reminded that I forgot to add the attributes for sending/getting on my form element back on the html side. Wow, the amount I know but just need refreshing on is amazing.
- So turns out the button itself can also have the formaction attribute so I don't need to touch the ```<form>``` element and add the formaction attribute to my ```<button>```
- formenctype can also specify how to encode the form data submitted
  - the default value of this is application/x-www-form-urlencoded
- after reading more on MDN I found that if I set the button type to button I can remove default behaviours and use Javascript to take care of things using an event handler but if I set the type to submit I can use form method attribute with the value post
  - the second option would include all data from the form in the body of a http request sent to the server, but I'm not sure this would be the right action given in a real world setting this would't be secure

- because of the tests in the suite, relying on the form built in validation which the form attributes perform, wouldn't be as customisable as a script with an event listener to prevent default after all.
- Again, this was a dead end, but I was able to find out why this isn't an option in this challenge. Mainly because I'm not linking to a back end server.
- so while my original plan is the right direction I also learned something new. I love this challenge.
- Breaking this down:
  - I'm validating input on blur event for each field
  - I need to create an eventlistener for the Submit button and inside of that use the validation from the functions validateFullName(), validateEmail() and validateCreditCard() and use them to inform the logic
  - based on that logic send the form data in the user email

- stack overflow provided a snippet on how to create an email within a script using window.location.href = "mailto:address@dmail.com";
- since I've never done this before, I found out more about window.location.href apparently setting this value will navigate to the provided url, so using mailto: as part of the right hand side must trigger the user email client as if it were a hyperlink/anchor element using the users browser window
- the mailto: url scheme is a string constructed by creating a variable e.g. let formSubmission = "recipient email address - ?subject - body of the email"
- ? in a mailto url indicates the beginning of a query parameter, used to specify additional information such as subject and body of email
- & used as a separator between different query parameters. Query Parameters specify additional information about the email such as subject body recipients etc...
- %0D%0A is used for line breaks in email body used between each key/value pair so each input has its own line
- the body format contains Name:[name], Email:[email], Credit Card:[card]

- so for my string 
```Javascript
// store fields in a variable
const submitButton = document.querySelector('.submit');

// check variables hold fields - development only
console.log(submitButton);

// event listener to trigger email on submit event
submitButton.addEventListener('click', (event) => {
	event.preventDefault();

// check all fields are valid
if (validateFullName() && validateEmail() && validateCreditCard()) { 
// using template literals for placement of field input in mailto: url string
let formSubmission = `mailto:challenge@dn-uk.com?subject=Form Submission&body=Name: ${fullName.value}%0D%0AEmail: ${emailAddress.value}%0D%0ACredit Card: ${creditCard.value}`;
// access user email
window.location.href = formSubmission;
} 
});
// else if (!validateEmail() || !validateCreditCard() || !validateFullName()) {
// const invalidInput = document.createElement('p');

// 	invalidInput.classList.add('warning');

// 	invalidInput.textContent = `Please enter name in the format 'John Doe'`;

// 	fullName.parentNode.insertBefore(warning, fullName);
	
// warning.style.display = 'none';
// use document.createElement to add a <p> to inform user of errors in message, toggle to hide when input valid

// }
// using template literals to allow for placement of variables in string
// let formSubmission = `mailto:challenge@dn-uk.com?subject=Form Submission&body=Name: ${fullName}%0D%0AEmail: ${emailAddress}%0D%0ACredit Card: ${creditCard}`
```
- I'm trying to be aware of the most secure way to send the information without having a back end server I guess.
- I intend to provide user feedback on the blur event which will involve creating error message variables as well as a comprehensive error message on the submit event for final validation
- Taking inspiration  from previous projects using a submit event to create a warning message to the user:
```Javascript
const invalidInput = document.createElement('p');

invalidInput.classList.add('warning');

invalidInput.textContent = `Please enter name in the format 'John Doe'`;

fullName.parentNode.insertBefore(warning, fullName);

warning.style.display = 'none';
```
- Now I have my validation on submit event function that sends an email, I think now would be a good time to add the warning messages I plan to create to warn the user visually that they've made an error and where, I will also use aria to ensure screen readers can access this information and relay it to the user.
- The warning message I used in a previous project is good but too static having to write error messages into each validation was very DRY when I did it for the fields being highlighted, by using an object to hold messages for each input would make it usable throughout the code and I can keep the code organaised, if any new fields were added, it would be simple to add the error to another input, this is something to perhaps refine in my current invalid input code
- It also allows for the error messages to be consistent over the whole application. another thing that would be good for my current code.
```Javascript
// a script which validates user input for name, email and card fields
// regular expression used to check all input validity and luhn algorithm used to check card input validity via checksum
// event listeners set to trigger validation functions on blur events
// event listener set to trigger email submission function on click event
// I added and error message object and functions to both display and remove the messages for a better user experience

// store fields in a variable
const fullName = document.getElementById('fullName');
const emailAddress = document.getElementById('emailAddress');
const creditCard = document.getElementById('creditCard');
const submitButton = document.querySelector('.submit');

// check variables hold fields - development only
console.log(submitButton);

// messages for users when input invalid
const invalidInputMessages = {
  fullName: 'Please enter a valid name in the format "John Doe"',
  emailAddress: 'Please enter valid email address in the format "example@domain.com/example@sub.domain.com/example@sub.domain.ac.uk"',
  creditCard: 'Please enter a valid 16-digit card number. Please do not use spaces'
};
// check message object - development only
console.log(invalidInputMessages);

// function to display message on invalid user input
function invalidInputMessage(inputField, message) {
// create and display message
let invalidParagraph = document.createElement('p');
invalidParagraph.classList.add('invalid');
invalidParagraph.textContent = message;
// log for debugging
console.log(inputField, message);
// append message below input field
inputElement.parentNode.insertBefore(invalidParagraph, inputElement.nextSibling);

// highlight field - alert user to error
inputElement.style.borderColor = 'rgb(231,0,100)';
}

// function to remove invalid input message and remove field highlight when input valid
function removeWhenValid(inputElement) {
  // remove message
  let invalidParagraph = inputElement.nextElementSibling;
  if (invalidParagraph && invalidParagraph.classList.contains('invalid')) {
  
    inputElement.parentNode.RemoveChild(invalidParagraph);
  }
  // reset field highlight
  inputElement.style.borderColor = '';
}



// event listeners to trigger validation on blur events

// namefield event listener
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

// full name validation function
// I would like to refactor this part so it returns to a validation function if I have the time
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
  } else {
    // highlight field, display message and log error 
    invalidInputMessage(fullName, invalidInputMessages.fullName);
    console.log('invalid input', nameInput);
  }
}

// credit card validation function using regex and luhn algorithm
function validateCreditCard(cardInput) {
  /* 
  step 0: & 1: check length of input & check numeric characters
  regex pattern checks for valid credit card format
  luhn algorithm verifies whether checksum valid
  if input valid after being invalid - border colour is reset
  if input invalid - border colour highlighted to alert user and message displayed to user
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
    // I would like to refactor this part so it returns to a validation function if I have the time
    if (sum % 10 === 0) {
      // reset border colour when input becomes valid
      console.log('valid input', sum, cardInput);
       // reset border colour and remove message when input becomes valid
    removeWhenValid(creditCard);
    } else {
      console.log('invalid input', cardInput, creditCardDigits, sum);
      // highlight field, display message and log error 
    invalidInputMessage(creditCard, invalidInputMessages.creditCard);
    console.log('invalid input', nameInput);
    }
    
  } else {
    console.log('invalid input', cardInput.length, cardInput);
    // highlight field, display message and log error 
    invalidInputMessage(creditCard, invalidInputMessages.creditCard);
    console.log('invalid input', nameInput);
  }
}

// email validation function regex used to match most common email formats
function validateEmail(emailInput) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z.]{2,}$/;

  if (emailRegex.test(emailInput)) {
    console.log('valid input', emailInput);
     // reset border colour and remove message when input becomes valid
    removeWhenValid(emailAddress);
  } else {
    console.log('invalid input', emailInput);
    // highlight field, display message and log error 
    invalidInputMessage(emailAddress, invalidInputMessages.emailAddress);;
  }
}

// event listener to trigger email on submit event
submitButton.addEventListener('click', (event) => {
	event.preventDefault();
// create variables to store validation result
let fullNameValid = validateFullName();
let emailAddressValid = validateEmail();
let creditCardValid = validateCreditCard();

// check all fields are valid
if (fullNameValid && emailAddressValid && creditCardValid) { 
// using template literals for placement of field input in mailto: url string
let formSubmission = `mailto:challenge@dn-uk.com?subject=Form Submission&body=Name: ${fullName.value}%0D%0AEmail: ${emailAddress.value}%0D%0ACredit Card: ${creditCard.value}`;
// access user email
window.location.href = formSubmission;
console.log(formSubmission, submitButton);

} else if (!fullNameValid) {
   // highlight field, display message and log error 
    invalidInputMessage(fullName, invalidInputMessages.fullName);

} else if (!emailAddressValid) {
  // highlight field, display message and log error 
    invalidInputMessage(emailAddress, invalidInputMessages.emailAddress);
} else if (!creditCardValid) {
// highlight field, display message and log error 
    invalidInputMessage(creditCard, invalidInputMessages.creditCard);
}
});
```
- Not me forgetting to return the boolean values from the validation functions that the submit event needed to perform its own validation check.
- Once I remembered that I had email submission on submit event working!
- I can see the light at the end of the tunnel! I only have left to do now 3 things left to complete and I'm on day 5/7 - I'm full of pride at myself for keeping to my timetable and building a functional validation form following the user stories and testing suite.  I even managed to apply features that will help with user accessibility
- project tasks to do:
  3. css design - according to user story and webaccessibility/mobile first
  5. keyboard navigation for accessibility
  6. Activity 3

### Planning: 13/10/2023:
- given the date and how close I am to finishing this technical challenge within my personal deadline of 7 days I plan to upload into my github into a private repository, both for posterity and to have my work somewhere safe in the case of worse case scenario.
- I feel so much better knowing my github is in a repository, safe and sound.  While not I'm not using it for version control, its still something I try to use regularly while building anything and this is something I would normally set up first, but the pull of the project had me not follow my normal practice here.

- So today is the final day and I plan to add aria and keyboard navigation to the HTML framework before matching the app to the wireframe using CSS.
- My first stop was to look up more about are roles and attributed relevent to my html, I've heard that if the html is semantic, aria shouldn't be required.  However I believe it would be better to rely on aria that will inform the users screen reader.  I've also found out about tab Index but since I never use anything I can't fully explain, whether they're used relys on my comprehension

- I have used semantic html elements which apparantly has better support for assistive technology so I may not need to do much
- The tab index attribute allows me to make the input fields focusable sequentially - sequential focus navigation (more new things, this challenge has been so good for me, I've grown my skills, learned new things through research and gained so much more confidence in my abilities as a developer)
- Accept integer as a value, results integer value dependent
- an HTML element with tabindex attribute with any valid integer value - can be focused with Javascript:
  - call focus() method
  - visually by click of mouse (click event?)
- By giving element tabindex="1" - will control whether element is tabbable  - reachable via tab key using sequential keyboard navigation
- turns out both ```<input>``` and ```<button>``` both have a default tabindex="0" - makes them automatically focusable by keyboard and script
- it seems since they're already in semantic order there isn't anything I need to do here. The key here is less is more and the more you know the more chance you can make the right decision
- I definitely need the invalid input message to be accessible to assistive technologies, so more research, I am so over my head at this point though lol

- Get in, so I found that I  can use the setAttribute() method for the p element created in the invalidInputMessage() function I created can allow me to add the attribute aria-describedby that I used in the html input elements which would make them instantly available to the technology as it appears in real time hopefully

- aria-decribedby according to MDN identifies the element(s) that describes the element on which it is set
  - lists id's of elements that describe object
  - establishes a relationship between groups e.g. inputs and the text that describes them
  - can be used on hidden elements

- I had to modify my script slightly to make sure I could get the assistive technology to read the error input and found that by modifying the invalidInputMessage function  to set the aria-describedby attribute on the input field
- The attribute references the elements ID that contains the error message. I added the line to set the aria-describedby attribute to the invalid input message, this would also assign the new element an ID to match the hard coded elements
- I then needed to create a variable to store and create the input id concatenated with 'Invalid' like the hardcoded html elements
- I had to update the html to reflect new aria-describedby attribute too
- this means screen readers will know the invalid input message with id="fullNameInvald" that is created is associated with the fullName input field, thereby reading the message when the input is invalid

- Right now thats done onto the CSS.  I added a legend for assistive technology so the first thing I need to do is hide the legend from sighted users in order to match the wireframe from the user stories
- I went on CSS Tricks to research this and found an approach referred to as the screen reader only or sr-only class which is considered best practice for hiding content while maintaining accessiblity
```css
/* Hiding class, making content visible only to screen readers but not visually */
/* "sr" meaning "screen-reader" */

.sr-only:not(:focus):not(:active) {
  /* clip property- specifies rectangular region to be displayed - hides element by setting to (0 0 0 0) */
  clip: rect(0 0 0 0); 
  /* clip-path property - create shapes/paths to define visible part of an element - inset(50%* = create path covering 50% of element to hide it */
  clip-path: inset(50%);
  height: 1px;
  /* overflow property - ensures any content that exceeds defines space is hidden */
  overflow: hidden;
  /* position property - set to absolute - taken out of flow and positioned according to nearest ancestor (fieldset) */
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
```
- The way this css works is by making it extremely small by setting the clip region to zero
- after adding this I will begin matching the wireframe

- and we're done. in less than 7 days from when i started!

## Task 3: Reflection: 
### Planning: 12/12/2023:
- Now I've come to this point, possibly just over halfway? I've decided to start the reflection task as I think of it now, this will give me something to work with for the actual one I  will write (200+ words)

- I gave myself a personal challenge to complete it in 7 days - after reading the timeframe for the best candidates.  I wanted to prove to myself that despite my disability of Fibromyalgia, that I could work to the same time table. I recieved the challenge at 16:20 on Friday 6th and spent the rest of the evening lost in thought.
- In my head I began working out what skills I currently had, which parts were within my ability scope and which parts would require more research.  This meant that by Saturday 7th I was at my computer with a general idea of what I needed to accomplish, how I would approach the challenge and how I could possibly enhance the final product with accessibility features i noticed had not mentioned in the user stories.  I noticed the same about the testing suite. While simple I decided to go with the approach that I was building a real life app that would be used by many.
- This technical challenge has been really fun, I was able to use skills I currently have and learn new ones. 
- I was able to learn a new checksum algortithm, which, while frustrating, was a challenging, enjoyable and rewarding learning experience.
- I was able to match each line of the  C++ code example given to the intructions steps, by doing this, I was able to build a luhn algorithm for a credit card that uses regular expression to check for both pattern and length in javascript
- I have been interested in learning C# for a long time and had planned to do this after gaining some proficiency in Javascript, however I have dabbled in learning some fundamentals such as strict typing and the data types the language uses.
- I was able to levarage that knowledge to read the C++ code which is remarkably similar to C#.  This is how I was able to read the example code and match it to the steps I was instructed to follow.  This didn't mean the conversion was any easier for me as a beginner, but it did mean I knew what my javascript needed to do at each step.
- I have been  able to increase my understanding of regular expressions to the point I can craft my own patterns for specific criteria now.
- This technical challenge also allowed me to work from a user story and I was able to fulfil their needs by using the testing suite to guard against both the invalid test data given, but it also gave me a something to expand on for real life situations.
- I read over each user story need and checked for any overlap of need, this occurred most with the CTO and Commercial Director.  I was able to consolidate and fulfil their needs at the same time.
- I was able to break down the challenge into:
  - HTML - framework - semantic html
  - Javascript - name field
  - Javascript - card field
  - Javascript - email field
  - Javascript - submit as email
  - CSS - layout and design - mobile first/ web accessiblity
- I broke this down based on my current knowledge and ability (at the time) and what I would have to learn as I went along.  I left the CSS until last as I believe both this and HTML are my strongest skills
- I noticed the user stories didn't include anything about web accessibility so I decided I would add things that would enable a smoother experience for all users.
- I decided to make the validation page with semantic HTML
- I decided to add text cues for the user along with the highlighted fields, and make this accessible to screen readers
- I also decided to build mobile first, with the desktop design as a media query, while still fulfilling the Marketing Directors needs
- I would have liked to have been able to ask the Marketing Director for feedback and guidance on the wireframe and whether his needs could still be fulfilled if I had added instructions to the user for the format to use in each field. I believe that would enhance the user experience by cutting down on invalid input patterns
- I can honestly say I have grown as a developer by completing this technical challenge
- One thing I would have done differently would

- How was working from User Stories?
- Working from user stories provided a clear framework for understanding the specific needs and requirements of different stakeholders, including the Marketing Director, CTO, and Commercial Director. This allowed me to empathize with end-users and tailor my development efforts to meet their expectations. The user stories served as a valuable guide throughout the development process, ensuring that I addressed all the essential features and functionalities required.

- Expanding on this response, you can mention how user stories helped you prioritize features and meet the needs of different stakeholders. For example, you can explain how you identified overlapping requirements among stakeholders, such as the CTO and Commercial Director, and consolidated them to create a more efficient solution. You might also discuss how user stories served as a foundation for your design and development choices.


- How was it having the test cases before you started development?
- Having test cases before starting development was immensely helpful. It provided a structured approach to building the application and allowed me to verify the functionality incrementally. With the test cases in place, I could ensure that each component of the form met the expected criteria. It served as a safeguard against errors and invalid data, making the development process smoother and more focused.

- In this section, you can elaborate on the benefits of having test cases. Explain how having test cases allowed you to maintain a focus on meeting specific criteria and requirements. Describe how they helped you structure your development process and validate each component of the form. You could also discuss any challenges you encountered during testing and how you overcame them.

- How did you implement the code?
- I implemented the code systematically, following a well-defined plan. I began by breaking down the challenge into manageable components, starting with the HTML framework and then moving on to JavaScript for each form field, finally concluding with CSS for layout and design. This step-by-step approach ensured that I could tackle the challenge effectively while continuously testing and verifying each part. The choice to use semantic HTML and prioritize mobile-first design aligned with best practices and accessibility standards.
- I extensively used the dev tools emulators to ensure I could build a solid app that can render on both mobile and desktop.
- I did do a few searches to refresh my memory in order to make sure the design was responsive. Here I made use of CSS tricks which is my go to for help with design and layout and was able to use the em unit and flexbox to accomodate the messages to the user for invalid input

- Expanding on this response, you can provide more details about your workflow plan. Discuss how you approached each component, including HTML, JavaScript, and CSS. Explain your rationale for starting with HTML and following a mobile-first design approach. Mention any specific methodologies or best practices you followed, such as using semantic HTML and ensuring web accessibility. You can describe how you structured your code files and the tools or libraries you used.

- What have you learned?
- This technical challenge has been a valuable learning experience. I not only enhanced my coding skills but also gained new knowledge, particularly in crafting regular expressions and understanding the Luhn algorithm. Additionally, the ability to interpret and apply C++ code to JavaScript was an enlightening experience. I learned the importance of considering web accessibility for a more inclusive user experience and how to work from user stories to meet specific requirements.

- while I would class my html and css abilities my strongest out of the three including Javascript.  While ensuring my validation page would be accessible I had to refresh my knowledge of aria labels and best use cases. I also enhanced my Javascript knowledge by learning how to dynamically add content that can be read by assistive technology in real time using the setAttribute() method and creating assosiative ID's.  while researching keyboard navigation I was pleasently surprised to have found I had covered it by making sure my HTML was semantic and logical.  I'm also happy to have learned how to hide content visually but keep available to screen readers.  Accessibility is really important to me, so being able to add these new skills is invaluble to me as a developer

- In this section, you can delve into the specific technical skills you acquired during this challenge. Discuss how you deepened your understanding of regular expressions and the Luhn algorithm. Explain how your knowledge of C# fundamentals allowed you to interpret C++ code and apply it to JavaScript. You can also mention any new insights into web accessibility and how it impacts user experience.

- What would you do differently?
- If I were to approach this challenge differently, I would seek feedback from the Marketing Director or other stakeholders about the wireframe. I would inquire whether adding instructions to guide users on the expected input format in each field would enhance the user experience while still fulfilling the Marketing Director's needs. Such feedback could further refine the form and minimize issues related to invalid input patterns.

- discuss your aspirations for code optimization and efficiency. You can explain that you recognize the potential for improvement in your validation functions but felt constrained by your current knowledge and time limitations. You might express your eagerness to further develop your skills in this area to enhance the performance and efficiency of your code in future projects.

- If I knew more about code optimisation, efficiency and performance such as 'Big O' I would have used this while writing my code.  I also know I could have written my Javascript differently if I had known more about the Object Oriented Design Paradigm. If I knew how to refine and refactor my functions better I believe I would have reduced redundancy in my code also

- When discussing what you would do differently, emphasize the importance of seeking feedback from stakeholders, such as the Marketing Director. Explain that you would inquire about the wireframe and potential enhancements, like adding instructions for expected input formats. Discuss how such feedback can lead to a more user-friendly solution and streamline the process of dealing with invalid input patterns.