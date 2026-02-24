let reports = [];

const reportList = document.getElementById("reportList");
const filterType = document.getElementById("filterType");
const sortDate = document.getElementById("sortDate");
const addReportBtn = document.getElementById("addReportBtn");

const reportModal = document.getElementById("reportModal");
const closeBtn = document.querySelector(".closeBtn");
const modalTitle = document.getElementById("modalTitle");
const reportForm = document.getElementById("reportForm");
const reportTitle = document.getElementById("reportTitle");
const reportDescription = document.getElementById("reportDescription");
const reportType = document.getElementById("reportType");
const reportDate = document.getElementById("reportDate");

const viewModal = document.getElementById("viewModal");
const closeViewBtn = document.querySelector(".closeViewBtn");
const viewTitle = document.getElementById("viewTitle");
const viewTypeDate = document.getElementById("viewTypeDate");
const viewDescription = document.getElementById("viewDescription");
const exportPDF = document.getElementById("exportPDF");

let editReportIndex = null;

function renderReports(list) {
  reportList.innerHTML = "";
  list.forEach((r, i) => {
    const li = document.createElement("li");
    li.setAttribute("data-type", r.type);
    li.innerHTML = `
      <div class="info">
        <strong>${r.title}</strong>
        <small>Tipo: ${r.type} | Data: ${r.date}</small>
        <p>${r.description}</p>
      </div>
      <div class="actions-btns">
        <button class="editBtn" onclick="openEditModal(${i})"><i class="fas fa-edit"></i></button>
        <button class="deleteBtn" onclick="deleteReport(${i})"><i class="fas fa-trash"></i></button>
      </div>`;
    li.querySelector(".info").addEventListener("click", () => viewReport(i));
    reportList.appendChild(li);
  });
}

addReportBtn.addEventListener("click", () => {
  editReportIndex = null;
  modalTitle.textContent = "Novo Relatório";
  reportTitle.value = "";
  reportDescription.value = "";
  reportType.value = "";
  reportDate.value = "";
  reportModal.style.display = "block";
});

function openEditModal(index) {
  const r = reports[index];
  editReportIndex = index;
  modalTitle.textContent = "Editar Relatório";
  reportTitle.value = r.title;
  reportDescription.value = r.description;
  reportType.value = r.type;
  reportDate.value = r.date;
  reportModal.style.display = "block";
}

reportForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newReport = {
    title: reportTitle.value.trim(),
    description: reportDescription.value.trim(),
    type: reportType.value,
    date: reportDate.value
  };
  if (editReportIndex !== null) reports[editReportIndex] = newReport;
  else reports.push(newReport);
  sortAndRender();
  reportModal.style.display = "none";
});

filterType.addEventListener("change", sortAndRender);
sortDate.addEventListener("change", sortAndRender);

let reportToDeleteIndex = null;
const confirmModal = document.getElementById("confirmModal");
const closeConfirmBtn = document.querySelector(".closeConfirmBtn");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

function deleteReport(index) {
  reportToDeleteIndex = index;
  confirmModal.style.display = "block";
}

confirmDelete.onclick = () => {
  if (reportToDeleteIndex !== null) {
    reports.splice(reportToDeleteIndex, 1);
    sortAndRender();
    reportToDeleteIndex = null;
    confirmModal.style.display = "none";
  }
}

cancelDelete.onclick = () => {
  reportToDeleteIndex = null;
  confirmModal.style.display = "none";
}

closeConfirmBtn.onclick = () => {
  reportToDeleteIndex = null;
  confirmModal.style.display = "none";
}

window.onclick = (e) => {
  if (e.target === confirmModal) confirmModal.style.display = "none";
};


function viewReport(index) {
  const r = reports[index];
  viewTitle.textContent = r.title;
  viewTypeDate.textContent = `Tipo: ${r.type} | Data: ${r.date}`;
  viewDescription.textContent = r.description;
  viewModal.style.display = "block";

  exportPDF.onclick = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(r.title, 10, 20);
    doc.setFontSize(14);
    doc.text(`Tipo: ${r.type} | Data: ${r.date}`, 10, 30);
    const splitText = doc.splitTextToSize(r.description, 180);
    doc.text(splitText, 10, 45);
    doc.save(`${r.title}.pdf`);
  }
}

closeBtn.onclick = () => reportModal.style.display = "none";
closeViewBtn.onclick = () => viewModal.style.display = "none";
window.onclick = (e) => {
  if (e.target === reportModal) reportModal.style.display = "none";
  if (e.target === viewModal) viewModal.style.display = "none";
};

function sortAndRender() {
  let filtered = reports;
  const type = filterType.value;
  if (type !== "Todos") filtered = filtered.filter(r => r.type === type);
  filtered.sort((a, b) => {
    if (sortDate.value === "asc") return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date);
  });
  renderReports(filtered);
}