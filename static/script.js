// Automatically hide flash messages
document.addEventListener("DOMContentLoaded", function () {
    const messages = document.querySelectorAll(".flash-message");

    messages.forEach(function (message) {
        setTimeout(function () {
            message.style.opacity = "0";
            message.style.transition = "opacity 0.4s ease";
            setTimeout(function () { message.remove(); }, 400);
        }, 3500);
    });
});

const darkModeBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("darkMode") === "enabled") { document.body.classList.add("dark-mode"); if (darkModeBtn) {darkModeBtn.innerHTML = "☀️";}}

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeBtn.innerHTML = "☀️";

        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeBtn.innerHTML = "🌙";
        }
    });
}

// COURSE SEARCH
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("courseSearch");
    const table = document.getElementById("coursesTable");
    if (!searchInput || !table) {return;}

    searchInput.addEventListener("keyup", function () {
        const searchValue = searchInput.value.toLowerCase().trim();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const rowText = row.textContent.toLowerCase();

            if (rowText.includes(searchValue)) {row.style.display = "";} 
            else {row.style.display = "none";}
        });
    });
});

function printBarcode(imageUrl) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Barcode</title>
            <style>
                body {
                    text-align: center;
                    padding: 40px;
                    font-family: Arial, sans-serif;
                }
                img {
                    width: 300px;
                    max-width: 100%;
                }
            </style>
        </head>
        <body>
            <h2>Course Barcode</h2>
            <img src="${imageUrl}" onload="window.print();">
        </body>
        </html>
    `);
    printWindow.document.close();
}

document.addEventListener("DOMContentLoaded", function () {
    const printButtons = document.querySelectorAll(".print-barcode-btn");
    printButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const imageUrl = this.getAttribute("data-barcode-url");
            printBarcode(imageUrl);
        });
    });
});

// LOW STOCK NOTIFICATION
const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotification = document.getElementById("closeNotification");

if (notificationBtn && notificationPanel) {
    notificationBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        notificationPanel.classList.toggle("show");
    });

    if (closeNotification) {
        closeNotification.addEventListener("click", function (event) {
            event.stopPropagation();
            notificationPanel.classList.remove("show");
        });
    }

    document.addEventListener("click", function (event) {
        if (!notificationPanel.contains(event.target) && !notificationBtn.contains(event.target)) {
            notificationPanel.classList.remove("show");
        }
    });
}