document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('presence-chart').getContext('2d');
    const presenceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Entrada', 'Saída', 'Pausa', 'Volta Pausa', 'Ausência'],
            datasets: [{
                label: 'Registros de Presença',
                data: getChartData(), // Obtém os dados do gráfico
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Atualiza o gráfico quando os filtros são aplicados
    document.getElementById('filter-week-chart').addEventListener('click', () => updateChart('week'));
    document.getElementById('filter-month-chart').addEventListener('click', () => updateChart('month'));
    document.getElementById('filter-today-chart').addEventListener('click', () => updateChart('today'));
    document.getElementById('apply-custom-filter-chart').addEventListener('click', () => updateChart('custom'));

    function updateChart(filter) {
        presenceChart.data.datasets[0].data = getChartData(filter);
        presenceChart.update();
    }

    function getChartData(filter = null) {
        const registers = getRegisterLocalStorage();
        let filteredRegisters = registers;

        if (filter) {
            const now = new Date();
            if (filter === 'week') {
                const lastWeek = new Date(now.setDate(now.getDate() - 7));
                filteredRegisters = registers.filter(register => new Date(register.data) >= lastWeek);
            } else if (filter === 'month') {
                const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
                filteredRegisters = registers.filter(register => new Date(register.data) >= lastMonth);
            } else if (filter === 'today') {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                filteredRegisters = registers.filter(register => {
                    const registerDate = new Date(register.data);
                    registerDate.setHours(0, 0, 0, 0);
                    return registerDate.getTime() === today.getTime();
                });
            } else if (filter === 'custom') {
                const startDate = new Date(document.getElementById('filter-start-date-chart').value);
                const endDate = new Date(document.getElementById('filter-end-date-chart').value);
                filteredRegisters = registers.filter(register => new Date(register.data) >= startDate && new Date(register.data) <= endDate);
            }
        }

        const data = {
            entrada: 0,
            saida: 0,
            pausa: 0,
            volta_pausa: 0,
            ausencia: 0
        };

        filteredRegisters.forEach(register => {
            if (data[register.tipo] !== undefined) {
                data[register.tipo]++;
            }
        });

        return [data.entrada, data.saida, data.pausa, data.volta_pausa, data.ausencia];
    }

    function getRegisterLocalStorage() {
        return JSON.parse(localStorage.getItem("register")) || [];
    }
});