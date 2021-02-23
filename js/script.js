// focus to initial text field
const nameInput = document.querySelector('#name');
nameInput.focus();

// show/hide job role entry for "other"
const otherJobInput = document.querySelector('#other-job-role');
otherJobInput.style = 'display: none';
const otherJobSelect = document.querySelector('#title');
otherJobSelect.addEventListener('change', () => {
  if (otherJobSelect.value === 'other') {
    otherJobInput.style = 'display: inline-block';
  } else {
    otherJobInput.style = 'display: none';
  }
});
/**
 * CHECK - the other input element will still have
 *          a value if you type and then hide it
 */

// setup option handling for t-shirt colors
const tshirtColor = document.querySelector('#color');
tshirtColor.disabled = true;
const designSelection = document.querySelector('#design');
designSelection.addEventListener('change', () => {
  // sufficient to always enable tshirtColor here
  // as default option will be disabled
  tshirtColor.disabled = false;
  const options = tshirtColor.children;
  // start at 1 to miss default select option
  for (let i = 1; i < options.length; i++) {
    const option = options[i];
    const designChoice = designSelection.value;
    const optionType = option.dataset.theme;
    // show items if design and option type match
    if (designChoice === optionType) option.hidden = false;
    else option.hidden = true;
  }
});

// setup "register for activities" total cost
/**
 * CHECK - selection validation to be added
 */
const activityField = document.querySelector('#activities');
const costDisplay = document.querySelector('#activities-cost');
let runningTotal = 0;
activityField.addEventListener('change', (e) => {
  if (e.target.tagName === 'INPUT') {
    const activity = e.target;
    const isChecked = activity.checked;
    const activityCost = parseInt(activity.dataset.cost);
    if (isChecked) runningTotal += activityCost;
    else runningTotal -= activityCost;
    const updatedCostText = `Total: $${runningTotal}`;
    costDisplay.textContent = updatedCostText;
  }
});

// setup payment info for credit card by default and add hide functions
const paymentSelector = document.querySelector('#payment');
const payMethods = {
  'credit-card': document.querySelector('#credit-card'),
  paypal: document.querySelector('#paypal'),
  bitcoin: document.querySelector('#bitcoin'),
};
// initialize credit card as default option payment
const creditCardOption = paymentSelector.querySelector(
  'option[value="credit-card"]'
);
creditCardOption.selected = true;
/**
 * @functions show or hide an element
 * @param {*} el - element you want to change
 */
const hideElement = (el) => (el.style = 'display:none');
const showElement = (el) => (el.style = 'display:block');

hideElement(payMethods['paypal']);
hideElement(payMethods['bitcoin']);
// eventlistener for payment selection
paymentSelector.addEventListener('change', (e) => {
  const paymentSelection = e.target.value;
  const methods = Object.keys(payMethods);
  for (const method of methods) {
    if (paymentSelection === method) showElement(payMethods[method]);
    else hideElement(payMethods[method]);
  }
});

/**
 *
 * Validation functions
 */

/**
 * name check present
 * no blanks or spaces
 */
const isValidName = (name) => {
  const regex = /\S+/;
  const isValid = regex.test(name);
  if (!isValid) console.error('Name: No blanks or spaces');
  return isValid;
};

/**
 * valid email address
 * format = word@word.com
 */
const isValidEmail = (email) => {
  const regex = /\w+@\w+.com/;
  const isValid = regex.test(email);
  if (!isValid) console.error('Email: format must be word@word.com');
  return isValid;
};

/**
 * activity validation
 *  1 or more activities checked
 */
const isValidActivities = () => {
  const activities = document.querySelectorAll('#activities-box label input');
  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    // immediately return true if one is checked
    if (activity.checked) return true;
  }
  console.error('Activities: 1 or more must be checked');
  return false;
};

/**
 * credit card number validator
 * 13 - 16 digit number with no dashes or spaces
 */
const isValidCreditCardNumber = (ccNumber) => {
  const regex = /^\d{13,16}$/;
  const isValid = regex.test(ccNumber);
  if (!isValid)
    console.error('Credit Card Number: 13-16 digits, no spaces or dashes');
  return isValid;
};

/**
 * zip code validator
 * 5 digit number
 */
const isValidZip = (zip) => {
  const regex = /^\d{5}$/;
  const isValid = regex.test(zip);
  if (!isValid) console.error('Credit Card Zip: Must be 5 digits');
  return isValid;
};

/**
 * cvv validator
 * 3 digit number
 */
const isValidCVV = (cvv) => {
  const regex = /^\d{3}$/;
  const isValid = regex.test(cvv);
  if (!isValid) console.error('Credit Card CVV: Must be 3 digits');
  return isValid;
};

// form submission validation
const form = document.querySelector('form');
// input fields to validate
const emailInput = document.querySelector('#email');
const creditCardInput = document.querySelector('#cc-num');
const zipcodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');
// form submit listener
form.addEventListener('submit', (e) => {
  !isValidName(nameInput.value) ? e.preventDefault() : null;
  !isValidEmail(emailInput.value) ? e.preventDefault() : null;
  !isValidActivities() ? e.preventDefault() : null;
  // checks for credit card options
  if (paymentSelector.value === 'credit-card') {
    !isValidCreditCardNumber(creditCardInput.value) ? e.preventDefault() : null;
    !isValidZip(zipcodeInput.value) ? e.preventDefault() : null;
    !isValidCVV(cvvInput.value) ? e.preventDefault() : null;
  }
});

/**
 * Add event listeners to activity checkboxes
 * add clearer styling for focused states
 */
const activities = document.querySelectorAll('#activities-box label input');
activities.forEach((item) => {
  item.addEventListener('focus', () => {
    item.parentElement.className = 'focus';
  });
});

activities.forEach((item) => {
  item.addEventListener('blur', () => {
    item.parentElement.className = '';
  });
});
