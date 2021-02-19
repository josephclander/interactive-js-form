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
