
// elemnts
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const availableCountEl = document.getElementById('available-count');

const tabAll = document.getElementById('tab-all');
const tabInterview = document.getElementById('tab-interview');
const tabRejected = document.getElementById('tab-rejected');

const jobContainer = document.getElementById('all-jobs');
const noJobsMsg = document.getElementById('no-jobs-msg');

// Update dashboard counts
function updateCounts() {
    const allJobs = jobContainer.querySelectorAll('.job-card');
    const interviewJobs = jobContainer.querySelectorAll('.job-card[data-status="Interview"]');
    const rejectedJobs = jobContainer.querySelectorAll('.job-card[data-status="Rejected"]');

    totalCountEl.textContent = allJobs.length;
    interviewCountEl.textContent = interviewJobs.length;
    rejectedCountEl.textContent = rejectedJobs.length;
    availableCountEl.textContent = allJobs.length + ' jobs';
}

// show hidden
function showTab(tab) {
    const allJobs = jobContainer.querySelectorAll('.job-card');
    let hasJobs = false;

    allJobs.forEach(card => {
        if (tab === 'All' || card.dataset.status === tab) {
            card.style.display = 'block';
            hasJobs = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (!hasJobs) {
        noJobsMsg.classList.remove('hidden');
    } else {
        noJobsMsg.classList.add('hidden');
    }
}

//set tab style
function setActiveTab(tabButton) {
    [tabAll, tabInterview, tabRejected].forEach(tab => {
        if (tab === tabButton) {
            tab.classList.add('bg-blue-500','text-white','active');
            tab.classList.remove('bg-white','text-gray-500');
        } else {
            tab.classList.remove('bg-blue-500','text-white','active');
            tab.classList.add('bg-white','text-gray-500');
        }
    });
}

// Tab active
function getActiveTab() {
    if(tabAll.classList.contains('active')) return 'All';
    if(tabInterview.classList.contains('active')) return 'Interview';
    if(tabRejected.classList.contains('active')) return 'Rejected';
    return 'All';
}

// job card
function initJobCards() {
    const jobCards = jobContainer.querySelectorAll('.job-card');

    jobCards.forEach(card => {
        const interviewBtn = card.querySelector('.interview-btn');
        const rejectedBtn = card.querySelector('.rejected-btn');
        const deleteBtn = card.querySelector('.delete-btn');
        const statusBtn = card.querySelector('button:not(.interview-btn):not(.rejected-btn):not(.delete-btn)'); // extra status button

        function setStatus(status) {
            card.dataset.status = status;
            if(statusBtn) {
                if(status === 'Interview') {
                    statusBtn.textContent = 'INTERVIEW';
                    statusBtn.classList.remove('bg-[#EEF4FF]','text-gray-800','border-gray-300');
                    statusBtn.classList.add('bg-green-100','text-green-500','border','border-green-500');
                } else if(status === 'Rejected') {
                    statusBtn.textContent = 'REJECTED';
                    statusBtn.classList.remove('bg-[#EEF4FF]','text-gray-800','border-gray-300');
                    statusBtn.classList.add('bg-red-100','text-red-500','border','border-red-500');
                }
            }
            updateCounts();
            showTab(getActiveTab());
        }

        // evenlistener
        interviewBtn.addEventListener('click', () => setStatus('Interview'));
        rejectedBtn.addEventListener('click', () => setStatus('Rejected'));
        deleteBtn.addEventListener('click', () => {
            card.remove();
            updateCounts();
            showTab(getActiveTab());
        });
    });
}

// event tab click
tabAll.addEventListener('click', () => { setActiveTab(tabAll); showTab('All'); });
tabInterview.addEventListener('click', () => { setActiveTab(tabInterview); showTab('Interview'); });
tabRejected.addEventListener('click', () => { setActiveTab(tabRejected); showTab('Rejected'); });



// initialize
updateCounts();
initJobCards();
setActiveTab(tabAll);
showTab("All")