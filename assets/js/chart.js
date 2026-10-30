// ==========================
// CHARTS (Chart.js Initialization)
// ==========================

function initCharts() {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    salesChartInstance = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Ingresos (€)',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: '#0d9488',
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                fill: true,
                tension: 0.3,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 10 } } }
            }
        }
    });

    const catCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChartInstance = new Chart(catCtx, {
        type: 'doughnut',
        data: {
            labels: ['Analgésicos', 'Antibióticos', 'Cardio', 'Antiinflamatorios', 'Otros'],
            datasets: [{
                data: [1, 1, 1, 1, 1],
                backgroundColor: ['#0d9488', '#2563eb', '#d97706', '#7c3aed', '#475569'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } } }
        }
    });

    const marginCtx = document.getElementById('profitMarginChart').getContext('2d');
    new Chart(marginCtx, {
        type: 'bar',
        data: {
            labels: ['Analgésicos', 'Antibióticos', 'Cardio', 'Antiinflamatorios'],
            datasets: [{
                label: 'Margen %',
                data: [35, 28, 45, 30],
                backgroundColor: '#0d9488',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 10 } } }
            }
        }
    });

    const peakCtx = document.getElementById('peakHoursChart').getContext('2d');
    new Chart(peakCtx, {
        type: 'line',
        data: {
            labels: ['09:00', '11:00', '13:00', '16:00', '18:00', '20:00'],
            datasets: [{
                label: 'Operaciones',
                data: [5, 22, 18, 30, 45, 12],
                borderColor: '#2563eb',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 10 } } }
            }
        }
    });
}