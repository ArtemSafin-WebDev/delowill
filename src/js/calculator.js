export default function calculator() {
    const elements = Array.from(document.querySelectorAll('.js-calculator'));

    elements.forEach(element => {
        const financialInputs = Array.from(element.querySelectorAll('.financial-model__numbers-input'));
        const revenueMonthElement = element.querySelector('.js-revenue-month');
        const revenueDayElement = element.querySelector('.js-revenue-day');

        const salesAmountMonthElement = element.querySelector('.js-sales-amount-month');
        const salesAmountDayElement = element.querySelector('.js-sales-amount-day');

        const averageBillMonthElement = element.querySelector('.js-average-bill-month');
        const averageBillDayElement = element.querySelector('.js-average-bill-day');

        const expensesMonthElement = element.querySelector('.js-expenses-month');
        const expensesDayElement = element.querySelector('.js-expenses-day');

        const buyAmountMonthElement = element.querySelector('.js-buy-amount-month');
        const buyAmountDayElement = element.querySelector('.js-buy-amount-day');

        const rentMonthElement = element.querySelector('.js-rent-month');
        const rentDayElement = element.querySelector('.js-rent-day');
        const wageMonthElement = element.querySelector('.js-wage-month');
        const wageDayElement = element.querySelector('.js-wage-day');

        const profitMonthElement = element.querySelector('.js-profit-month');
        const profitDayElement = element.querySelector('.js-profit-day');

        const chartElement = element.querySelector('.js-chart');

        const chartProfitElement = element.querySelector('.js-chart-profit');
        const chartBuyElement = element.querySelector('.js-chart-buy');
        const chartExpensesElement = element.querySelector('.js-chart-expenses');

        const paybackDateElement = element.querySelector('.js-payback-date');

        const investmentsAmountElement = element.querySelector('.js-investments');

        const rentalScaleElement = element.querySelector('.js-rental-scale');
        const graphInvestments = element.querySelector('.js-graph-investments')

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
            colors: ['#39B833', '#FFEBB5', '#F9CC46'],
            theme: 'maximized',
            enableInteractivity: false
        };

        function drawChart() {
            chart = new google.visualization.PieChart(chartElement);

            recalculate();
        }

        const DAYS_IN_MONTH = 30;

        function recalculate() {
            const billPerDay = Number(averageBillDayElement.value);

            averageBillMonthElement.textContent = billPerDay;

            const salesPerDay = Number(salesAmountDayElement.value);
            const salesPerMonth = salesPerDay * DAYS_IN_MONTH;

            salesAmountMonthElement.textContent = Math.ceil(salesPerMonth);

            const revenuePerDay = Math.ceil(salesPerDay * billPerDay);
            const revenuePerMonth = Math.ceil(salesPerMonth * billPerDay);

            revenueMonthElement.textContent = revenuePerMonth;
            revenueDayElement.textContent = revenuePerDay;

            const buyDay = Number(buyAmountDayElement.textContent.replace(/\s/g, ''));
            const buyMonth = buyDay * DAYS_IN_MONTH;

            buyAmountMonthElement.textContent = Math.ceil(buyMonth);

            const rentDay = Number(rentDayElement.value);
            const rentMonth = rentDay * DAYS_IN_MONTH;

            rentMonthElement.textContent = rentMonth;

            const wageDay = Number(wageDayElement.value);
            const wageMonth = wageDay * DAYS_IN_MONTH;

            console.log('Wage day', wageDay);

            wageMonthElement.textContent = wageMonth;

            const totalExpensesPerDay = buyDay + rentDay + wageDay;
            const totalExpensesPerMonth = totalExpensesPerDay * DAYS_IN_MONTH;

            expensesDayElement.textContent = totalExpensesPerDay;
            expensesMonthElement.textContent = totalExpensesPerMonth;

            const totalProfitDay = revenuePerDay - totalExpensesPerDay;
            const totalProfitMonth = revenuePerMonth - totalExpensesPerMonth;

            profitDayElement.textContent = totalProfitDay;
            profitMonthElement.textContent = totalProfitMonth;

            const investmentsAmount = Number.parseFloat(investmentsAmountElement.textContent.replace(/\s/g, ''));

            if (totalProfitMonth <= 0) {
                paybackDateElement.textContent = '∞';
                rentalScaleElement.textContent = '∞';
                graphInvestments.textContent = `- ${investmentsAmount} ₽`
            } else {
                const months = Math.ceil(investmentsAmount / totalProfitMonth);

                paybackDateElement.textContent = `${months} мес.`;

                rentalScaleElement.innerHTML = '';
                graphInvestments.textContent = `- ${investmentsAmount} ₽`
                for (let i = 0; i < months; i++) {
                    const span = document.createElement('span');
                    span.textContent = i + 1;

                    rentalScaleElement.appendChild(span);
                }
            }

            if (chart) {
                const profitPerUnit = Math.ceil(totalProfitMonth / salesPerMonth);
                const buyPerUnit = Math.ceil(buyMonth / salesPerMonth);
                const operationalCostPerUnit = Math.ceil((totalExpensesPerMonth - buyMonth) / salesPerMonth);
                const data = google.visualization.arrayToDataTable([
                    ['Task', 'Диаграмма доходов/расходов'],
                    ['Profit', profitPerUnit >= 0 ? profitPerUnit : 0],
                    ['Buy', buyPerUnit],
                    ['Expense', operationalCostPerUnit]
                ]);

                chart.draw(data, options);

                chartProfitElement.textContent = `${profitPerUnit} ₽`;
                chartBuyElement.textContent = `${buyPerUnit} ₽`;
                chartExpensesElement.textContent = `${operationalCostPerUnit} ₽`;
            }
        }

        financialInputs.forEach(input => {
            input.addEventListener('input', () => {
                recalculate();
            });
        });

        recalculate();
    });
}
