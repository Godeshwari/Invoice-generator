// Auto Invoice Number
document.getElementById("invoiceNo").value =
"INV-" + Math.floor(Math.random() * 100000);

// Today's Date
document.getElementById("date").value =
new Date().toISOString().split("T")[0];

const tbody = document.getElementById("tbody");
const addRow = document.getElementById("addRow");

// Add New Product Row
addRow.addEventListener("click", () => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
        
    <input
        type="text"
        class="product"
        placeholder="Product Name">
</td>
        

        <td>
            <input type="number"
            class="qty"
            value="1"
            min="1">
        </td>

        <td>
            <input type="number"
            class="price"
            value="0">
        </td>

        <td class="total">0</td>

        <td>
            <button class="delete">🗑</button>
        </td>
    `;

    tbody.appendChild(row);

    calculate();
});

// Delete Row
tbody.addEventListener("click", function(e){

    if(e.target.classList.contains("delete")){

        e.target.closest("tr").remove();

        calculate();

    }

});

// Live Calculation
tbody.addEventListener("input", calculate);

document.getElementById("gst")
.addEventListener("input", calculate);

document.getElementById("discount")
.addEventListener("input", calculate);

function calculate(){

    let subtotal = 0;

    const rows = tbody.querySelectorAll("tr");

    rows.forEach(row=>{

        const qty =
        Number(row.querySelector(".qty").value);

        const price =
        Number(row.querySelector(".price").value);

        const total = qty * price;

        row.querySelector(".total").innerText = total;

        subtotal += total;

    });

    document.getElementById("subtotal").innerText = subtotal;

    const gst =
    Number(document.getElementById("gst").value);

    const gstAmount = subtotal * gst / 100;

    document.getElementById("gstAmount").innerText =
    gstAmount.toFixed(2);

    const discount =
    Number(document.getElementById("discount").value);

    const grandTotal =
    subtotal + gstAmount - discount;

    document.getElementById("grandTotal").innerText =
    grandTotal.toFixed(2);

}

// Initial Calculation
calculate();

// Print Invoice
document.getElementById("printBtn")
.addEventListener("click", ()=>{

    window.print();

});
// Download PDF

document.getElementById("pdfBtn").addEventListener("click", () => {

    const invoice = document.getElementById("invoice");

    html2canvas(invoice).then(canvas => {

        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = 210;

        const imgWidth = 190;

        const imgHeight =
            canvas.height * imgWidth / canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            10,
            10,
            imgWidth,
            imgHeight
        );

        pdf.save("Invoice.pdf");

    });

});