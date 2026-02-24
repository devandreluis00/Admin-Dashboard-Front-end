# 🖥️ Admin Dashboard | Gestão de Usuários, Relatórios e Vendas

Um **painel administrativo completo e responsivo**, projetado para gerenciar usuários, relatórios, produtos e vendas. Este projeto é um exemplo de **front-end profissional**, combinando HTML5, CSS3 moderno, JavaScript e boas práticas de UX/UI para portfólio.

## 🔹 Badges

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🔹 Login

O painel possui um **login simples** para acessar o dashboard.
Use os seguintes dados de teste:

| Campo   | Valor   |
| ------- | ------- |
| Usuário | `admin` |
| Senha   | `1234`  |

O login valida o usuário e senha, mostrando uma mensagem de sucesso ou erro:

```javascript
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (usuario === "admin" && senha === "1234") {
        mensagem.style.color = "green";
        mensagem.textContent = "Login realizado com sucesso!";

        setTimeout(() => {
            window.location.href = "../pages/dashboard.html";
        }, 1000);

    } else {
        mensagem.style.color = "red";
        mensagem.textContent = "Usuário ou senha inválidos!";
    }
});
```

> ✅ **Observação:** Este login é apenas para demonstração no front-end. Em produção, o ideal é validar usuário e senha no back-end.

## 🔹 Funcionalidades

* **Dashboard** com cards de resumo e gráficos de visitas e vendas semanais.
* Gestão de **Usuários**: adicionar, editar, excluir e pesquisar.
* Gestão de **Relatórios**: criar, visualizar, filtrar, ordenar e exportar PDF.
* Gestão de **Produtos e Vendas**: adicionar produtos, registrar vendas, controlar estoque.
* Layout **100% responsivo** para desktop, tablet e mobile.
* Modais interativos para formulários, visualização e alertas.
* Uso de **HTML5 semântico**, **CSS3 moderno** e boas práticas de UX/UI.

## 🔹 Tecnologias Utilizadas

* **HTML5** – Estrutura semântica das páginas.
* **CSS3** – Flexbox, Grid, animações sutis e responsividade.
* **JavaScript (Vanilla)** – Lógica de CRUD, modais, filtros, gráficos e PDF export.
* **Chart.js** – Gráficos de barras e linhas para dashboard.
* **jsPDF** – Exportação de relatórios em PDF.
* **Font Awesome** – Ícones para botões e ações.

## 🔹 Estrutura do Projeto

📂 admin-dashboard/
│
├─ index.html          # Dashboard principal com cards e gráficos
├─ colaboradores.html  # Gestão de usuários
├─ relatorios.html     # Gestão de relatórios
├─ vendas.html         # Gestão de produtos e vendas
│
├─ css/
│   ├─ dashboard.css
│   ├─ colaboradores.css
│   ├─ relatorios.css
│   └─ vendas.css
│
├─ js/
│   ├─ dashboard.js
│   ├─ colaboradores.js
│   ├─ relatorios.js
│   └─ vendas.js
│
└─ img/                # Ícones e imagens do projeto
```

## 🔹 Créditos

* Desenvolvimento: **André**

## 🔹 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).