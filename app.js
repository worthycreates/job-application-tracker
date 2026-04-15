const companyInput = document.querySelector('[data-js="company-name"]');
const jobForm = document.querySelector('[data-js="job-form"]');

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = companyInput.value.trim();

  if (!name) {
    alert("Please enter a Company name!");
    return;
  }

  console.log(`Adding job for: ${name}`);
  companyInput.value = "";
  companyInput.focus();
});
