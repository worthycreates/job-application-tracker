const jobs = [];

const companyInput = document.querySelector('[data-js="company-name"]');
const jobForm = document.querySelector('[data-js="job-form"]');

const displayJobs = document.querySelector('[data-js="display-jobs"]');


jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = companyInput.value.trim();

  if (!name) {
    alert("Please enter a Company name!");
    return;
  }

  console.log(`Adding job for: ${name}`);
  jobs.push(createJob(name));
  console.log(jobs);

  companyInput.value = "";
  companyInput.focus();

  renderJobs(jobs);
});


const createJob = (name) => {
  return {name};
};

const renderJobs = (jobs) => {
  displayJobs.children = "";
  
  jobs.forEach(job => {
    const li = document.createElement("li");
    li.textContent = job.name;
    displayJobs.append(li);
  });

  console.log(displayJobs);
};
