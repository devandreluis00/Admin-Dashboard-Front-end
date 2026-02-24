const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  sidebar.style.width = sidebar.classList.contains("collapsed") ? "60px" : "220px";
});

const productModal = document.getElementById("productModal");
const saleModal = document.getElementById("saleModal");
const addProductBtn = document.getElementById("addProductBtn");
const registerSaleBtn = document.getElementById("registerSaleBtn");
const closeBtns = document.querySelectorAll(".close");

let editIndex = null;

let produtos = [
  { id: 1, nome: "Produto A", preco: 50.00, estoque: 120 },
  { id: 2, nome: "Produto B", preco: 30.50, estoque: 80 },
  { id: 3, nome: "Produto C", preco: 70.00, estoque: 40 },
];
let vendas = [];

addProductBtn.addEventListener("click", () => {
  productModal.style.display = "flex";
  document.getElementById("modalTitle").textContent = "Adicionar Produto";
  document.getElementById("productForm").reset();
  editIndex = null;
});

registerSaleBtn.addEventListener("click", () => {
  saleModal.style.display = "flex";
  const select = document.getElementById("saleProduct");
  select.innerHTML = "";
  produtos.forEach((p, index) => {
    select.innerHTML += `<option value="${index}">${p.nome} (Estoque: ${p.estoque})</option>`;
  });
  document.getElementById("saleForm").reset();
});

closeBtns.forEach(btn => btn.addEventListener("click", () => {
  productModal.style.display = "none";
  saleModal.style.display = "none";
}));
window.addEventListener("click", (e) => {
  if (e.target === productModal) productModal.style.display = "none";
  if (e.target === saleModal) saleModal.style.display = "none";
});

function updateDashboard() {
  const tbody = document.querySelector("#productsTable tbody");
  tbody.innerHTML = "";
  produtos.forEach((p, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nome}</td>
        <td>R$ ${p.preco.toFixed(2)}</td>
        <td>${p.estoque}</td>
        <td>
          <button onclick="editProduct(${index})">Editar</button>
          <button onclick="deleteProduct(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("totalProducts").textContent = produtos.length;
  document.getElementById("totalStock").textContent = produtos.reduce((sum, p) => sum + p.estoque, 0);
  document.getElementById("totalSales").textContent = "R$ " + vendas.reduce((sum, v) => sum + v.total, 0).toFixed(2);

  const salesTbody = document.querySelector("#salesTable tbody");
  salesTbody.innerHTML = "";
  vendas.forEach(v => {
    salesTbody.innerHTML += `
      <tr>
        <td>${v.id}</td>
        <td>${v.produto}</td>
        <td>${v.quantidade}</td>
        <td>R$ ${v.total.toFixed(2)}</td>
      </tr>
    `;
  });
}

document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("productName").value;
  const preco = parseFloat(document.getElementById("productPrice").value);
  const estoque = parseInt(document.getElementById("productStock").value);

  if (editIndex !== null) {
    produtos[editIndex] = { ...produtos[editIndex], nome, preco, estoque };
  } else {
    const id = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;
    produtos.push({ id, nome, preco, estoque });
  }

  productModal.style.display = "none";
  updateDashboard();
});

window.editProduct = (index) => {
  editIndex = index;
  const p = produtos[index];
  document.getElementById("productName").value = p.nome;
  document.getElementById("productPrice").value = p.preco;
  document.getElementById("productStock").value = p.estoque;
  document.getElementById("modalTitle").textContent = "Editar Produto";
  productModal.style.display = "flex";
};

window.deleteProduct = (index) => {
  if (confirm("Deseja realmente excluir este produto?")) {
    produtos.splice(index, 1);
    updateDashboard();
  }
};

document.getElementById("saleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const productIndex = parseInt(document.getElementById("saleProduct").value);
  const quantidade = parseInt(document.getElementById("saleQuantity").value);
  const produto = produtos[productIndex];

  if (quantidade > produto.estoque) {
    customAlert("Estoque insuficiente!");
    return;
  }

  produto.estoque -= quantidade;

  const id = vendas.length ? vendas[vendas.length - 1].id + 1 : 1;
  vendas.push({
    id,
    produto: produto.nome,
    quantidade,
    total: quantidade * produto.preco
  });

  saleModal.style.display = "none";
  updateDashboard();
});

const alertModal = document.getElementById("alertModal");
const alertMessage = document.getElementById("alertMessage");
const alertOk = document.getElementById("alertOk");
const alertClose = document.getElementById("alertClose");

function customAlert(message) {
  alertMessage.textContent = message;
  alertModal.style.display = "flex";

  alertOk.onclick = () => {
    alertModal.style.display = "none";
  };

  alertClose.onclick = () => {
    alertModal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === alertModal) alertModal.style.display = "none";
  };
}

updateDashboard();