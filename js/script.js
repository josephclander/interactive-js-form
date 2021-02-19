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
