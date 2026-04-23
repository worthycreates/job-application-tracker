
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


// const createJobElement = (job) => {
//   const btn = document.createElement("button");
//   btn.textContent = job.status !== "Offer" ? `Mark as ${jobStates[jobStates.indexOf(job.status) + 1]}` : "";
//   btn.classList.add('action-btn');
//   btn.setAttribute('data-js', 'action-btns');
//   btn.setAttribute('data-id', job.id);

//   btn.addEventListener("click", (e) => {
//     updateStatus(job);
//   });

//   const li = document.createElement("li");
//   li.textContent = `Company: ${job.company}, Role: ${job.role}, Status: ${job.status}`;
//   li.append(btn)
//   return li;
// };

const createJobElement = (job) => {
  const btn = buildElement("button", {
      text: job.status !== "Offer" ? `Mark as ${jobStates[jobStates.indexOf(job.status) + 1]}` : "",
      classes: ["action-btn"],
      attr: {
        "data-js": "action-btns",
        "data-id": job.id
      },
      event: {
        type: "click",
        handler: (e) => {
          console.log("The event object is here:", e);
          console.log("You clicked the button for:", job.company);
          updateStatus(job);
        }
      }
    }
  );

  const li = buildElement("li", {
      text: `Company: ${job.company}, Role: ${job.role}, Status: ${job.status}`,
      classes: ["job-item", "active"],
      attr: {"data-id": job.id},
      child: btn
    }
  );

  return li;
};

const buildElement = (tag, options = {}) => {
  const { text, classes, attr, event, child } = options;
  const el = document.createElement(tag);

  if (text) el.textContent = text;
  if (classes) el.classList.add(...classes);
  if (attr) Object.entries(attr).forEach(([k, v]) => el.setAttribute(k, v));
  if (event) el.addEventListener(event.type, event.handler);
  if (child) el.append(child);

    // el.addEventListener(event.eventType, (e) => {
    //   event.action(e);
    // });

  return el;
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