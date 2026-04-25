class JobTracker {
  constructor() {
    // Initial State.
    this.jobs = [];
    this.jobStates = ["Considering", "Applied", "Interview", "Offer"];

    // Selectors.
    this.companyInput = document.querySelector('[data-js="company-name"]');
    this.roleInput = document.querySelector('[data-js="job-role"]');
    this.jobForm = document.querySelector('[data-js="job-form"]');
    this.displayJobs = document.querySelector('[data-js="display-jobs"]');
    this.actionBtns = document.querySelectorAll('[data-js="action-btns"]');
    this.filterJobs = document.querySelector('[data-js="filter-dropdown"]');

    this.init();
  };

  init() {
    this.jobForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const company = this.companyInput.value.trim();
        const role = this.roleInput.value.trim();
        
        if (!this.requireInput(company, "company") || !this.requireInput(role, "role"))
          return;

        this.updateState({
          company,
          role
        });

        this.clearForm();
    });

    this.filterJobs.addEventListener("change", (e) => {
      this.renderJobs();
    })
  };

  clearForm() {
    this.clearInput([this.companyInput, this.roleInput]);
    this.companyInput.focus();
  };

  requireInput(formInput, inputType){
    if (!formInput) {
      alert(`Please enter a ${inputType}!`);
      return false;
    }
    return true;
  };

  clearInput(inputs) {
    inputs.forEach(input => {
      input.value = "";
    });
  };

  createJob(company, role) {
    return {
      id: crypto.randomUUID(),
      company, 
      role,
      status: this.jobStates[0],
    };
  };

  deleteJob(jobId) {
    console.log("Deleting job!");

    this.jobs = this.jobs.filter(job => job.id !== jobId);
    this.renderJobs();
  };

  createJobElement(job) {
    const btn = this.buildElement("button", {
        text: job.status !== "Offer" ? `Mark as ${this.jobStates[this.jobStates.indexOf(job.status) + 1]}` : "",
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
            this.updateStatus(job);
          }
        }
      }
    );

    const deleteBtn = this.buildElement("button", {
      text: "x",
      classes: ["del-btn"],
      attr: {
        "data-js": "del-btns",
        "data-id": job.id
      },
      event: {
        type: "click",
        handler: (e) => {
          this.deleteJob(job.id);
        }
      }
    });

    const li = this.buildElement("li", {
        text: `Company: ${job.company}, Role: ${job.role}, Status: ${job.status}`,
        classes: ["job-item", "active"],
        attr: {"data-id": job.id},
        child: [btn, deleteBtn]
      }
    );

    return li;
  };

  buildElement(tag, options = {}) {
    const { text, classes, attr, event, child } = options;
    const el = document.createElement(tag);

    if (text) el.textContent = text;
    if (classes) el.classList.add(...classes);
    if (attr) Object.entries(attr).forEach(([k, v]) => el.setAttribute(k, v));
    if (event) el.addEventListener(event.type, event.handler);
    if (child) child.forEach(c => el.append(c));

    return el;
  };

  renderJobs() {
    this.displayJobs.replaceChildren();

    const filteredJobs = this.filterJobs.value === "all" 
            ? this.jobs
            : this.jobs.filter(job => job.status.toLowerCase() === this.filterJobs.value);

    filteredJobs.forEach(job => {
          this.displayJobs.append(this.createJobElement(job));
    });

    console.log(this.displayJobs);
  };

  updateStatus(job) {
    const currentIndex = this.jobStates.indexOf(job.status);

    if (currentIndex < this.jobStates.length - 1) {
      job.status = this.jobStates[currentIndex + 1];
    }
    
    console.log(job);
    this.renderJobs();
  };

  updateState(jobDetails) {
    const { company, role } = jobDetails;
    this.jobs.push(this.createJob(company, role));
    this.renderJobs();
  };
};

const app = new JobTracker();
