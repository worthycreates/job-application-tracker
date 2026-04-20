
const jobs = [];
const jobStates = ["Considering", "Applied", "Interview", "Offer"];

const companyInput = document.querySelector('[data-js="company-name"]');
const jobForm = document.querySelector('[data-js="job-form"]');
const displayJobs = document.querySelector('[data-js="display-jobs"]');
const actionBtns = document.querySelectorAll('[data-js="action-btns"]');


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

  renderJobs();
});


const createJob = (company) => {
  return {
    id: crypto.randomUUID(),
    company, 
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
  li.textContent = `Company: ${job.company}, Status: ${job.status}`;
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