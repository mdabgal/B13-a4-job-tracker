// Elements
const allJobs = document.getElementById("all-jobs");
const totalCountEl = document.getElementById("total-count");
const availableCount = document.getElementById("available-count");
const interviewCountEl = document.getElementById("interview-count");
const rejectedCountEl = document.getElementById("rejected-count");
const noJobsMsg = document.getElementById("no-jobs-msg");

// Tabs
const tabAll = document.getElementById("tab-all");
const tabInterview = document.getElementById("tab-interview");
const tabRejected = document.getElementById("tab-rejected");

// Counters
let interviewCount = 0;
let rejectedCount = 0;

// Update total 
function updateTotal() {
    const totalJobs = allJobs.querySelectorAll(".job-card").length;
    totalCountEl.innerText = totalJobs;
    availableCount.innerText = totalJobs + " jobs";
}
updateTotal();

// Show tab
function showTab(tabName) {
    let visibleCount = 0;
    allJobs.querySelectorAll(".job-card").forEach(card => {
        if (tabName === "All" || card.dataset.status === tabName) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleCount === 0) {
        noJobsMsg.classList.remove("hidden");
    } else {
        noJobsMsg.classList.add("hidden");
    }
}

// Event 
allJobs.addEventListener("click", e => {
    const card = e.target.closest(".job-card");
    if (!card) return;

    // Interview button
    if (e.target.closest(".border-green-500")) {
        if (card.dataset.status === "Rejected") rejectedCount--;
        if (card.dataset.status !== "Interview") interviewCount++;
        card.dataset.status = "Interview";
    }

    // Rejected button
    if (e.target.closest(".border-red-500")) {
        if (card.dataset.status === "Interview") interviewCount--;
        if (card.dataset.status !== "Rejected") rejectedCount++;
        card.dataset.status = "Rejected";
    }

    // Delete button
    if (e.target.closest(".delete-btn")) {
        if (card.dataset.status === "Interview") interviewCount--;
        if (card.dataset.status === "Rejected") rejectedCount--;
        card.remove();
        updateTotal();
    }

    
    interviewCountEl.innerText = interviewCount;
    rejectedCountEl.innerText = rejectedCount;

    
    const activeTab = document.querySelector(".tab-active")?.dataset.tab || "All";
    showTab(activeTab);
});

// 
[tabAll, tabInterview, tabRejected].forEach(tab => {
    const tabName = tab.id.replace("tab-", "");
    tab.dataset.tab = tabName;
    tab.addEventListener("click", function () {
        // Remove  active
        const prevActive = document.querySelector(".tab-active");
        if (prevActive) {
            prevActive.classList.remove("bg-blue-500", "text-white", "tab-active");
            prevActive.classList.add("bg-white", "text-gray-500");
        }

        //  tab active
        this.classList.add("bg-blue-500", "text-white", "tab-active");
        this.classList.remove("bg-white", "text-gray-500");

        const showName = tabName === "all" ? "All" : tabName.charAt(0).toUpperCase() + tabName.slice(1);
        showTab(showName);
    });
});


tabAll.classList.add("bg-blue-500", "text-white", "tab-active");
showTab("All");