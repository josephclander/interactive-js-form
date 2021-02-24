/**
 * focus to initial text field
 */
const nameInput = document.querySelector('#name');
nameInput.focus();

/**
 * show/hide job role entry for "other"
 */
const otherJobInput = document.querySelector('#other-job-role');
otherJobInput.style = 'display: none';
const otherJobSelect = document.querySelector('#title');
otherJobSelect.addEventListener('change', () => {
  if (otherJobSelect.value === 'other') {
    otherJobInput.style = 'display: inline-block';
  } else {
    otherJobInput.style = 'display: none';
    // need to remove the value or it will
    // be submitted even when no longer selected
    otherJobInput.value = '';
  }
});

/**
 * setup option handling for t-shirt colors
 */
const tshirtColor = document.querySelector('#color');
tshirtColor.disabled = true;
const designSelection = document.querySelector('#design');
designSelection.addEventListener('change', () => {
  // sufficient to always enable tshirtColor here
  // as default option will be disabled
  tshirtColor.disabled = false;
  tshirtColor.selectedIndex = 0;
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

/**
 * setup "register for activities" total cost
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

/**
 * setup payment info for credit card by default and add hide functions
 */
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
/**
 * eventlistener for payment selection
 */
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
 * @param {string} name
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
 * @param {string} email
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
 * @param {array} arrayOfActivities
 */
const isValidActivities = (activitiesBox) => {
  const collectionOfActivities = activitiesBox.children;
  const length = collectionOfActivities.length;
  for (let i = 0; i < length; i++) {
    const activity = collectionOfActivities[i].firstElementChild;
    // immediately return true if one is checked
    if (activity.checked) return true;
  }
  console.error('Activities: 1 or more must be checked');
  return false;
};

/**
 * credit card number validator
 * 13 - 16 digit number with no dashes or spaces
 * @param {number} ccNumber
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
 * @param {number} zip
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
 * @param {number} cvv
 */
const isValidCVV = (cvv) => {
  const regex = /^\d{3}$/;
  const isValid = regex.test(cvv);
  if (!isValid) console.error('Credit Card CVV: Must be 3 digits');
  return isValid;
};

/**
 * invalid notification handler
 * @param {element}
 */
const invalidNotificationHandler = (element) => {
  const parent = element.parentElement;
  parent.classList.add('not-valid');
  parent.classList.remove('valid');
  parent.lastElementChild.classList.remove('hint');
};

/**
 * valid option handler
 * @param {element}
 */
const validHandler = (element) => {
  const parent = element.parentElement;
  parent.classList.remove('not-valid');
  parent.classList.add('valid');
  parent.lastElementChild.classList.add('hint');
};

/**
 * validation lookup
 * function to select correct validation function & notification handler
 */
const validationMethod = {
  name: isValidName,
  email: isValidEmail,
  activities: isValidActivities,
  credit: isValidCreditCardNumber,
  zip: isValidZip,
  cvv: isValidCVV,
};
const validate = (type, input, e) => {
  let isValid;
  if (type === 'activities') {
    isValid = validationMethod[type](input);
  } else {
    isValid = validationMethod[type](input.value);
  }
  if (isValid) {
    validHandler(input);
  } else {
    e.preventDefault();
    invalidNotificationHandler(input);
  }
};

/**
 * form submit listener
 */
const form = document.querySelector('form');
// input fields to validate
const emailInput = document.querySelector('#email');
const activitiesBox = document.querySelector('#activities-box');
const creditCardInput = document.querySelector('#cc-num');
const zipcodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');
form.addEventListener('submit', (e) => {
  // I think clearing the console is not a good idea in production
  // however without it the console doesn't distinguish a new submit request
  // are there alternatives that are used?
  console.clear();

  validate('name', nameInput, e);
  validate('email', emailInput, e);
  validate('activities', activitiesBox, e);
  // checks for credit card options
  if (paymentSelector.value === 'credit-card') {
    validate('credit', creditCardInput, e);
    validate('zip', zipcodeInput, e);
    validate('cvv', cvvInput, e);
  }
});

/**
 * Add event listeners to activity checkboxes
 * add clearer styling for focused states
 */
const activitiesInput = document.querySelectorAll(
  '#activities-box label input'
);
activitiesInput.forEach((item) => {
  item.addEventListener('focus', () => {
    item.parentElement.className = 'focus';
  });
  item.addEventListener('blur', () => {
    item.parentElement.className = '';
  });
});
