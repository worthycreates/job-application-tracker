
const jobs = [];

const companyInput = document.querySelector('[data-js="company-name"]');
const jobForm = document.querySelector('[data-js="job-form"]');

const displayJobs = document.querySelector('[data-js="display-jobs"]');


jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const company = companyInput.value.trim();

  if (!company) {
    alert("Please enter a Company name!");
    return;
  }

  console.log(`Adding job for: ${company}`);
  jobs.push(createJob(company));
  console.log(jobs);

  companyInput.value = "";
  companyInput.focus();

  renderJobs(jobs);
});


const createJob = (company) => {
  return {
    id: crypto.randomUUID(),
    company, 
    status: "Applied",
  };
};

const createJobElement = (job) => {
  const btn = document.createElement("button");
  btn.textContent = "Mark as Interview";
  btn.setAttribute('class', 'action-btn');

  const li = document.createElement("li");
  li.textContent = `Company: ${job.company}, Status: ${job.status}`;
  li.append(btn)
  return li;
};


const renderJobs = (jobs) => {
  displayJobs.replaceChildren();
  
  jobs.forEach(job => {
    displayJobs.append(createJobElement(job));
  });

  console.log(displayJobs);
};
