let myChart = new Chart(document.getElementById("chart"), {type: "bar"});

const chartTypeEl = document.getElementById('chart-type');
const chartAlignmentEl = document.getElementById('chart-alignment');
const chartShowMeanEl = document.getElementById('chart-show-mean');
const chartColorEl = document.getElementById('chart-color');
const chartOutlineColorEl = document.getElementById('chart-outline-color');

document.getElementById('add-data').addEventListener('click', () => {
    const div = document.createElement("div")
    const topic = document.createElement("input")
    const score = document.createElement("input")
    const btn = document.createElement("button")
    const br = document.createElement("br")
    topic.classList.add("topic");
    score.classList.add("score");
    btn.classList.add("remove-btn");
    div.classList.add("data-area")
    btn.innerText = "Remove";
    btn.onclick = (btn) => {removeTopic(btn)};

    div.appendChild(topic);
    div.appendChild(score);
    div.appendChild(btn);
    div.appendChild(br);
    document.body.appendChild(div);
});

const removeTopic = (element) => {
    element.srcElement.parentNode.remove();
}

document.getElementById('clear-data').addEventListener('click', () => {
    document.querySelectorAll(".data-area").forEach(e => {
        e.remove();
    });
});

document.getElementById('build-chart').addEventListener('click', () => {
    const elements = document.getElementsByClassName("topic");
    const topics = [];
    for (e of elements) {
        topics.push(e.value)
    }

    const score = document.getElementsByClassName("score");
    const scores = [];
    for (s of score) {
        scores.push(parseFloat(s.value))
    }

    createChart(topics, scores);
});

// Annotation and average codes from https://www.chartjs.org/chartjs-plugin-annotation/1.2.0/samples/line/average.html

const annotation = {
    type: 'line',
    borderColor: 'red',
    borderDash: [6, 6],
    borderDashOffset: 0,
    borderWidth: 1,
    label: {
        display: true,
        content: (ctx) => 'Mean: ' + average(ctx).toFixed(2),
        position: 'end',
    },
    scaleID: chartAlignmentEl.value === 'y' ? 'x' : 'y',
    value: (ctx) => average(ctx)
};

// muista tää ctx introkurssin seuraavas implementaatios (jos teet sitä xdxDXDXD)
function average(ctx) {
    const values = ctx.chart.data.datasets[0].data;
    return values.reduce((a, b) => a + b, 0) / values.length;
}

const createChart = (t, s) => {
    const ctx = document.getElementById('chart');
    if (myChart) {
        myChart.destroy();
        myChart = null;
    }
    ann = chartShowMeanEl.checked ? {annotations: {annotation}} : {}

    const chartData = {
        type: chartTypeEl.value,
        data: {
            labels: t,
            datasets: [{
                label: 'Average score of each topic',
                data: s,
                axis: chartAlignmentEl.value,
                fill: true,
                backgroundColor: [chartColorEl.value],
                borderColor: [chartOutlineColorEl.value],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: chartAlignmentEl.value,
            plugins: {
                annotation: ann,
                legend: {
                    display: false
                }
            },
        }
    }
    
    if (chartTypeEl.value === 'line') {
        chartData.data.datasets[0].fill = false;
        chartData.data.datasets[0].borderWidth = 3;
    }
    myChart = new Chart(ctx, chartData);
}

document.getElementById('export-image').addEventListener('click', () => {
    var a = document.createElement('a');
    a.href = myChart.toBase64Image();
    a.download = 'chart.png';

    // Trigger the download
    a.click();
});