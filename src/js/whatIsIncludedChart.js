export default function whatIsIncludedChart() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

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
        colors: ['#4658FF', '#6EC756'],
        theme: 'maximized',
        enableInteractivity: false
    };

    function drawChart() {
        const elements = Array.from(document.querySelectorAll('.js-what-is-included-chart'));

        elements.forEach(element => {
            const sideOne = element.getAttribute('data-side-one');
            const sideTwo = element.getAttribute('data-side-two');
            const chartElement = element.querySelector('.what-is-included__card-chart-pie');

            let chart = new google.visualization.PieChart(chartElement);

            const data = google.visualization.arrayToDataTable([
                ['Task', 'Распределение обязанностей'],
                ['One', Number(sideOne)],
                ['Two', Number(sideTwo)]
            ]);

            chart.draw(data, options);
        });
    }
}
