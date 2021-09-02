export default function newCalculator() {
    const getNumericValue = element => {
        const rawValue = element.matches('input') ? element.value : element.textContent;
        const numericValue = parseFloat(rawValue.replace(/[^\d]+/g, ''));
        return isNaN(numericValue) ? 0 : numericValue;
    };

    const setNumericValue = (element, value) => {
        const formattedValue = value.toLocaleString();
        if (element.matches('input')) {
            input.value = formattedValue;
        } else {
            element.textContent = formattedValue;
        }
    };

    const getDayExpensesArray = elements => elements.map(item => getNumericValue(item));

    const getTotalDayExpenses = elements => elements.reduce((acc, currentValue) => acc + currentValue);

    const setMonthExpenses = (elements, values, days) =>
        elements.forEach((element, elementIndex) => setNumericValue(element, values[elementIndex] * days));

    const calculatorElements = Array.from(document.querySelectorAll('.js-calculator'));

    calculatorElements.forEach(calculatorElement => {
        const DAYS_IN_MONTH = 30;

        const investments = getNumericValue(calculatorElement.querySelector('.js-investments'));
        const calcInputs = Array.from(document.querySelectorAll('.financial-model__numbers-input'));

        const getDaySales = getNumericValue.bind(this, calculatorElement.querySelector('.js-sales-amount-day'));
        const setMonthSales = setNumericValue.bind(this, calculatorElement.querySelector('.js-sales-amount-month'));

        const getDayCheck = getNumericValue.bind(this, calculatorElement.querySelector('.js-average-bill-day'));
        const setMonthCheck = setNumericValue.bind(this, calculatorElement.querySelector('.js-average-bill-month'));

        const getDayBuy = getNumericValue.bind(this, calculatorElement.querySelector('.js-buy-amount-day'));
        const setMonthBuy = setNumericValue.bind(this, calculatorElement.querySelector('.js-buy-amount-month'));

        const setDayRevenue = setNumericValue.bind(this, calculatorElement.querySelector('.js-revenue-day'));
        const setMonthRevenue = setNumericValue.bind(this, calculatorElement.querySelector('.js-revenue-month'));

        const setTotalDayExpenses = setNumericValue.bind(this, calculatorElement.querySelector('.js-expenses-day'));
        const setTotalMonthExpenses = setNumericValue.bind(this, calculatorElement.querySelector('.js-expenses-month'));

        const setTotalDayProfit = setNumericValue.bind(this, calculatorElement.querySelector('.js-profit-day'));
        const setTotalMonthProfit = setNumericValue.bind(this, calculatorElement.querySelector('.js-profit-month'));

        const setPaybackMonths = setNumericValue.bind(this, calculatorElement.querySelector('.js-payback-date'));
        const setGraphInvestments = setNumericValue.bind(this, calculatorElement.querySelector('.js-graph-investments'));

        const setChartProfit = setNumericValue.bind(this, calculatorElement.querySelector('.js-chart-profit'));
        const setChartBuy = setNumericValue.bind(this, calculatorElement.querySelector('.js-chart-buy'));
        const setChartExpenses = setNumericValue.bind(this, calculatorElement.querySelector('.js-chart-expenses'));

        let chart = null;

        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        const chartOptions = {
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
            chart = new google.visualization.PieChart(calculatorElement.querySelector('.js-chart'));

            calculate();
        }

        const setPaybackScale = months => {
            const scaleElement = calculatorElement.querySelector('.js-rental-scale');

            setGraphInvestments(`- ${investments} ₽`);

            scaleElement.innerHTML = '';

            if (isFinite(months)) {
                for (let i = 0; i <= months; i++) {
                    const span = document.createElement('span');
                    span.textContent = i;

                    scaleElement.appendChild(span);
                }
            } else {
                scaleElement.innerHTML = months;
            }
        };

        calculate();

        function calculate() {
            const daySales = getDaySales();
            const monthSales = daySales * DAYS_IN_MONTH;
            setMonthSales(monthSales);
            const dayCheck = getDayCheck();
            setMonthCheck(dayCheck * DAYS_IN_MONTH);
            const dayBuy = getDayBuy();
            const monthBuy = dayBuy * DAYS_IN_MONTH;
            setMonthBuy(monthBuy);
            const dayExpensesArray = getDayExpensesArray(Array.from(calculatorElement.querySelectorAll('.js-dynamic-expense-day')));
            setMonthExpenses(Array.from(calculatorElement.querySelectorAll('.js-dynamic-expense-month')), dayExpensesArray, DAYS_IN_MONTH);
            const totalDayExpenses = getTotalDayExpenses(dayExpensesArray) + dayBuy;
            const totalMonthExpenses = totalDayExpenses * DAYS_IN_MONTH;
            setTotalDayExpenses(totalDayExpenses);
            setTotalMonthExpenses(totalMonthExpenses);
            const dayRevenue = daySales * dayCheck;
            setDayRevenue(dayRevenue);
            setMonthRevenue(dayRevenue * DAYS_IN_MONTH);
            const dayProfit = dayRevenue - totalDayExpenses;
            setTotalDayProfit(dayProfit);
            const monthProfit = dayProfit * DAYS_IN_MONTH;
            setTotalMonthProfit(monthProfit);

            if (monthProfit > 0) {
                const paybackMonths = Math.ceil(investments / monthProfit);

                setPaybackMonths(`${paybackMonths} мес.`);
                setPaybackScale(paybackMonths);
            } else {
                setPaybackMonths('∞');
                setPaybackScale('∞');
            }

            if (chart) {
                const profitPerUnit = Math.ceil(monthProfit / monthSales);
                const buyPerUnit = Math.ceil(monthBuy / monthSales);
                const operationalCostPerUnit = Math.ceil((totalMonthExpenses - monthBuy) / monthSales);
                const data = google.visualization.arrayToDataTable([
                    ['Task', 'Диаграмма доходов/расходов'],
                    ['Profit', profitPerUnit >= 0 ? profitPerUnit : 0],
                    ['Buy', buyPerUnit],
                    ['Expense', operationalCostPerUnit]
                ]);

                chart.draw(data, chartOptions);

                setChartProfit(`${profitPerUnit} ₽`);
                setChartBuy(`${buyPerUnit} ₽`);

                setChartExpenses(`${operationalCostPerUnit} ₽`);
            }
        }

        calcInputs.forEach(input => {
            input.addEventListener('input', () => {
                calculate();
            });
        });
    });
}
