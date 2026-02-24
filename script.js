

// job section

const jobCards = document.querySelectorAll('.job-card');

// elemant
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');

// tab
const tabAll = document.getElementById('tab-all');
const tabInterview = document.getElementById('tab-interview');
const tabRejected = document.getElementById('tab-rejected');


const availableCountEl = document.getElementById('available-count');

// delet button
jobCards.forEach(card => {
    const interviewBtn = card.querySelector('.interview-btn');
    const rejectedBtn = card.querySelector('.rejected-btn');
    const deleteBtn = card.querySelector('.delete-btn');

    interviewBtn.addEventListener('click', () => {
        card.dataset.status = 'Interview';
        updateDashboard();
        showTab(getActiveTab());
    });

    rejectedBtn.addEventListener('click', () => {
        card.dataset.status = 'Rejected';
        updateDashboard();
        showTab(getActiveTab());
    });

    deleteBtn.addEventListener('click', () => {
        card.remove();
        updateDashboard();
        showTab(getActiveTab());
    });
});

// updat
function updateDashboard() {
    const total = document.querySelectorAll('.job-card').length;
    const interview = document.querySelectorAll('.job-card[data-status="Interview"]').length;
    const rejected = document.querySelectorAll('.job-card[data-status="Rejected"]').length;

    totalCountEl.textContent = total;
    interviewCountEl.textContent = interview;
    rejectedCountEl.textContent = rejected;

    availableCountEl.textContent = total + ' jobs';
}


function getActiveTab() {
    if(tabAll.classList.contains('active')) return 'All';
    if(tabInterview.classList.contains('active')) return 'Interview';
    if(tabRejected.classList.contains('active')) return 'Rejected';
    return 'All';
}

function showTab(tab) {
    let hasJobs = false;
    jobCards.forEach(card => {
        if(tab === 'All' || card.dataset.status === tab) {
            card.style.display = 'block';
            hasJobs = true;
        } else {
            card.style.display = 'none';
        }
    });

    const noJobsMsg = document.getElementById('no-jobs-msg');
    if(!hasJobs) noJobsMsg.classList.remove('hidden');
    else noJobsMsg.classList.add('hidden');
}

// Tab click
tabAll.addEventListener('click', () => {
    setActiveTab(tabAll);
    showTab('All');
});
tabInterview.addEventListener('click', () => {
    setActiveTab(tabInterview);
    showTab('Interview');
});
tabRejected.addEventListener('click', () => {
    setActiveTab(tabRejected);
    showTab('Rejected');
});


function setActiveTab(tabButton) {
    const tabs = [tabAll, tabInterview, tabRejected];
    tabs.forEach(tab => {
        if(tab === tabButton){
            tab.classList.add('bg-blue-500', 'text-white');
            tab.classList.remove('bg-white', 'text-gray-500');
            tab.classList.add('active');
        } else {
            tab.classList.remove('bg-blue-500', 'text-white', 'active');
            tab.classList.add('bg-white', 'text-gray-500');
        }
    });
}


updateDashboard();
setActiveTab(tabAll);
showTab('All');





