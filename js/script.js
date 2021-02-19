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
