
const jobs = [];
const jobStates = ["Considering", "Applied", "Interview", "Offer"];

const companyInput = document.querySelector('[data-js="company-name"]');
const roleInput = document.querySelector('[data-js="job-role"]');
const jobForm = document.querySelector('[data-js="job-form"]');
const displayJobs = document.querySelector('[data-js="display-jobs"]');
const actionBtns = document.querySelectorAll('[data-js="action-btns"]');


jobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const company = companyInput.value.trim();
  const role = roleInput.value.trim();
  
  if (!requireInput(company, "company") || !requireInput(role, "role"))
    return;

  console.log(`Adding job for: ${company}: ${role}`);
  jobs.push(createJob(company, role));
  console.log(jobs);

  clearInput([companyInput, roleInput]);
 
  companyInput.focus();

  renderJobs();
});

const requireInput = (formInput, inputType) => {
  if (!formInput) {
    alert(`Please enter a ${inputType}!`);
    return false;
  }
  return true;
};

const clearInput = (inputs) => {
  inputs.forEach(input => {
    input.value = "";
  });
};


const createJob = (company, role) => {
  return {
    id: crypto.randomUUID(),
    company, 
    role,
    status: jobStates[0],
  };
};


const createJobElement = (job) => {
  const btn = document.createElement("button");
  btn.textContent = job.status !== "Offer" ? `Mark as ${jobStates[jobStates.indexOf(job.status) + 1]}` : "";
  btn.classList.add('action-btn');
  btn.setAttribute('data-js', 'action-btns');
  btn.setAttribute('data-id', job.id);

  btn.addEventListener("click", (e) => {
    updateStatus(job);
  });

  const li = document.createElement("li");
  li.textContent = `Company: ${job.company}, Role: ${job.role}, Status: ${job.status}`;
  li.append(btn)
  return li;
};


const renderJobs = () => {
  displayJobs.replaceChildren();
  
  jobs.forEach(job => {
    displayJobs.append(createJobElement(job));
  });

  console.log(displayJobs);
};

const updateStatus = (job) => {
  if (job.status !== "Offer") {
    job.status = jobStates[jobStates.indexOf(job.status) + 1];
  }
  
  console.log(job);
  renderJobs();
};