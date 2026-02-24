let users = [
  { id: 1, nome: "João Silva", email: "joao@email.com" },
  { id: 2, nome: "Maria Souza", email: "maria@email.com" },
  { id: 3, nome: "Carlos Lima", email: "carlos@email.com" },
];

const usersTable = document.getElementById("usersTable").querySelector("tbody");
const searchInput = document.getElementById("searchInput");
const addUserBtn = document.getElementById("addUserBtn");
const userModal = document.getElementById("userModal");
const closeBtn = document.querySelector(".closeBtn");
const modalTitle = document.getElementById("modalTitle");
const userForm = document.getElementById("userForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

let editUserId = null;

function renderTable(data) {
  usersTable.innerHTML = "";
  data.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>
        <button class="editBtn" onclick="openEditModal(${user.id})">Editar</button>
        <button class="deleteBtn" onclick="deleteUser(${user.id})">Excluir</button>
      </td>
    `;
    usersTable.appendChild(row);
  });
}

addUserBtn.addEventListener("click", () => {
  editUserId = null;
  modalTitle.textContent = "Adicionar Usuário";
  userName.value = "";
  userEmail.value = "";
  userModal.style.display = "block";
});

function openEditModal(id) {
  const user = users.find(u => u.id === id);
  editUserId = id;
  modalTitle.textContent = "Editar Usuário";
  userName.value = user.nome;
  userEmail.value = user.email;
  userModal.style.display = "block";
}

closeBtn.onclick = () => {
  userModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == userModal) {
    userModal.style.display = "none";
  }
};

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = userName.value.trim();
  const email = userEmail.value.trim();

  if (editUserId) {
    const user = users.find(u => u.id === editUserId);
    user.nome = nome;
    user.email = email;
  } else {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    users.push({ id: newId, nome, email });
  }

  renderTable(users);
  userModal.style.display = "none";
});

function deleteUser(id) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    users = users.filter(u => u.id !== id);
    renderTable(users);
  }
}

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = users.filter(u => u.nome.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
  renderTable(filtered);
});

renderTable(users);