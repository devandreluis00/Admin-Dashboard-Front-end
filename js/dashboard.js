document.getElementById("users").innerText = 120;
document.getElementById("sales").innerText = 87;
document.getElementById("visits").innerText = 1340;

const sidebar = document.getElementById("sidebar");
document.getElementById("toggleSidebar").addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

const labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const visitsData = [50, 80, 30, 100, 60, 90, 120];
const salesData = [5, 8, 3, 10, 6, 9, 12];

const visitsCtx = document.getElementById("visitsChart").getContext("2d");
new Chart(visitsCtx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Visitas',
      data: visitsData,
      backgroundColor: function (ctx) {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#60a5fa');
        gradient.addColorStop(1, '#2563eb');
        return gradient;
      },
      borderRadius: 8,
      barPercentage: 0.6,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 6
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#334155', stepSize: 20 },
        grid: { color: '#e2e8f0' }
      },
      x: { ticks: { color: '#334155', font: { size: 14 } }, grid: { display: false } }
    }
  }
});

const salesCtx = document.getElementById("salesChart").getContext("2d");
new Chart(salesCtx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Vendas',
      data: salesData,
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#10b981',
      pointRadius: 5,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 6
      }
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#334155', stepSize: 2 }, grid: { color: '#e2e8f0' } },
      x: { ticks: { color: '#334155', font: { size: 14 } }, grid: { display: false } }
    }
  }
});