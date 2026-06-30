const invoiceBody = document.getElementById("invoiceBody");
const searchInput = document.getElementById("search");

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

// Load Dashboard
function loadInvoices(data = invoices) {

    invoiceBody.innerHTML = "";

    let revenue = 0;
    let todayCount = 0;

    const today = new Date().toISOString().split("T")[0];

    data.forEach((invoice, index) => {

        revenue += Number(invoice.total);

        if (invoice.date === today) {
            todayCount++;
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${invoice.invoiceNo}</td>
            <td>${invoice.date}</td>
            <td>${invoice.customer}</td>
            <td>₹${Number(invoice.total).toFixed(2)}</td>

            <td>
                <span class="status ${invoice.status.toLowerCase()}">
                    ${invoice.status}
                </span>
            </td>

            <td>

                <button class="action-btn view"
                    onclick="viewInvoice(${index})">

                    👁

                </button>

                <button class="action-btn edit"
                    onclick="editInvoice(${index})">

                    ✏

                </button>

                <button class="action-btn delete"
                    onclick="deleteInvoice(${index})">

                    🗑

                </button>

            </td>
        `;

        invoiceBody.appendChild(row);

    });

    document.getElementById("totalInvoices").innerText =
        data.length;

    document.getElementById("totalRevenue").innerText =
        "₹" + revenue.toFixed(2);

    document.getElementById("todayInvoices").innerText =
        todayCount;

}

// Search Invoice
searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = invoices.filter(invoice =>

        invoice.invoiceNo.toLowerCase().includes(keyword) ||

        invoice.customer.toLowerCase().includes(keyword)

    );

    loadInvoices(filtered);

});

// Delete Invoice
function deleteInvoice(index) {

    if (confirm("Delete this invoice?")) {

        invoices.splice(index, 1);

        localStorage.setItem("invoices", JSON.stringify(invoices));

        loadInvoices();

    }

}

// View Invoice
function viewInvoice(index) {

    localStorage.setItem("selectedInvoice", JSON.stringify(invoices[index]));

    window.location.href = "index.html";

}

// Edit Invoice
function editInvoice(index) {

    localStorage.setItem("editInvoice", JSON.stringify(invoices[index]));

    window.location.href = "index.html";

}

// Initial Load
loadInvoices();