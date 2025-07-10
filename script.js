// Tab navigation
function langName(tabName, elmnt, color) {
    const tabcontent = document.querySelectorAll('.tabcontent');
    tabcontent.forEach(content => content.style.display = 'none');

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabName).style.display = 'block';
    elmnt.classList.add('active');
}

document.getElementById('defaultOpen').click();

function navigateToServices() {
    document.querySelectorAll(".tabcontent").forEach(tab => {
        tab.style.display = "none";
    });

    document.getElementById("Services").style.display = "block";

    document.getElementById("Services").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Modal handling
function scheduleNow(service) {
    const modal = document.getElementById("scheduleModal");
    const serviceField = document.getElementById("service");

    const options = Array.from(serviceField.options);
    const matchingOption = options.find(option => option.value === service);
    serviceField.value = matchingOption ? service : "";

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("scheduleModal").style.display = "none";
}

// Form submission with axios
document.getElementById("scheduleForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const appointmentDetails = {
        service: formData.get("service"),
        name: formData.get("name"),
        email: formData.get("email"),
        date: formData.get("date"),
        time: formData.get("time"),
        phone: formData.get("phone"),
    };

    axios.post("http://localhost:8080/api/v1/booking", appointmentDetails)
        .then(response => {
            console.log("Success:", response.data);
            alert("Your appointment has been scheduled successfully!");
            closeModal();
        })
        .catch(error => {
            console.error("Error scheduling appointment:", error);
            alert("There was a problem scheduling your appointment.");
        });
});

// Close modal if clicked outside
window.onclick = function(event) {
    const modal = document.getElementById("scheduleModal");
    if (event.target === modal) {
        closeModal();
    }
};
