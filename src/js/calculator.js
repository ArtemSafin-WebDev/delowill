export default function calculator() {
    const elements = Array.from(document.querySelectorAll('.js-calculator'));

    elements.forEach(element => {
        const financialInputs = Array.from(element.querySelectorAll('.financial-model__numbers-input'));
        const revenueMonth = element.querySelector('.js-revenue-month');
        const revenueDay = element.querySelector('.js-revenue-day');

        const salesAmountMonth = element.querySelector('.js-sales-amount-month');
        const salesAmountDay = element.querySelector('.js-sales-amount-day');

        const averageBillMonth = element.querySelector('.js-average-bill-month');
        const averageBillDay = element.querySelector('.js-average-bill-day');

        const expensesMonth = element.querySelector('.js-expenses-month');
        const expensesDay = element.querySelector('.js-expenses-day');

        const buyAmountMonth = element.querySelector('.js-buy-amount-month');
        const buyAmountDay = element.querySelector('.js-buy-amount-day');

        const rentMonth = element.querySelector('.js-rent-month');
        const rentDay = element.querySelector('.js-rent-day');
        const wageMonth = element.querySelector('.js-wage-month');
        const wageDay = element.querySelector('.js-wage-day');

        const profitMonth = element.querySelector('.js-profit-month');
        const profitDay = element.querySelector('.js-profit-day');

        const averageBillCalculation = element.querySelector('.js-average-bill-calclation');
        const salesCalculation = element.querySelector('.js-sales-calclation');
        const totalRevenueCalculation = element.querySelector('.js-total-revenue-calculation');

        const chartElement = element.querySelector('.js-chart');

        const chartProfit = element.querySelector('.js-chart-profit');
        const chartBuy = element.querySelector('.js-chart-buy');
        const chartExpenses = element.querySelector('.js-chart-expenses');

        const paybackDate = element.querySelector('.js-payment-date');
        const investmentAmount = element.querySelector('.js-investment');


        let profit = 0;

        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        let chart = null;

        const options = {
            title: '',
            pieHole: 0.45,
            legend: {
                position: 'none'
            },
            pieSliceBorderColor: 'none',
            pieSliceText: 'none',
            tooltip: {
                trigger: 'none'
            },
            colors: ['#4658FF', '#C2D0FF', '#85A0FF'],
            theme: 'maximized',
            enableInteractivity: false
        };

        function drawChart() {
            chart = new google.visualization.PieChart(chartElement);

            recalculate();
        }

        const DAYS_IN_MONTH = 30;

        function recalculate() {
            const bill = Number(averageBillMonth.value);
            const sales = Number(salesAmountMonth.value);
            const rent = Number(rentMonth.value);
            const wage = Number(wageMonth.value);

            const buy = Number(buyAmountMonth.textContent.split(' ').join(''));

            const totalRevenue = sales * bill;

            console.log(buyAmountMonth);

            console.log({ bill, sales, rent, wage, buy });

            totalRevenueCalculation.textContent = totalRevenue;
            salesCalculation.textContent = sales;
            averageBillCalculation.textContent = bill;
            revenueMonth.textContent = totalRevenue;
            revenueDay.textContent = Math.ceil(totalRevenue / DAYS_IN_MONTH);

            salesAmountDay.textContent = Math.ceil(sales / DAYS_IN_MONTH);

            averageBillDay.textContent = bill;
            buyAmountDay.textContent = Math.ceil(buy / DAYS_IN_MONTH);

            wageDay.textContent = Math.ceil(wage / DAYS_IN_MONTH);

            rentDay.textContent = Math.ceil(rent / DAYS_IN_MONTH);
            const totalExpenses = rent + wage + buy;

            expensesMonth.textContent = totalExpenses;

            expensesDay.textContent = Math.ceil(totalExpenses / DAYS_IN_MONTH);

            profitMonth.textContent = totalRevenue - totalExpenses;
            profitDay.textContent = Math.ceil((totalRevenue - totalExpenses) / DAYS_IN_MONTH);

            profit = totalRevenue - totalExpenses;

            calculatePayback();

            if (chart) {
                const data = google.visualization.arrayToDataTable([
                    ['Task', 'Диаграмма доходов/расходов'],
                    ['Profit', profit >= 0 ? profit : 0],
                    ['Buy', buy],
                    ['Expense', totalExpenses]
                ]);

                chart.draw(data, options);

                chartProfit.textContent = `${totalRevenue - totalExpenses} ₽`;
                chartBuy.textContent = `${buy} ₽`;
                chartExpenses.textContent = `${totalExpenses} ₽`;
            }
        }

        function calculatePayback() {
            if (profit <= 0) {
                paybackDate.textContent = '∞'
            } else {
                const date = Math.ceil(Number(investmentAmount.value) / profit);
                paybackDate.textContent = `${date} мес.`;
            }
        }

        investmentAmount.addEventListener('input', () => {
            calculatePayback();
        })

        financialInputs.forEach(input => {
            input.addEventListener('input', () => {
                recalculate();
            });
        });

        recalculate();
    });
}
