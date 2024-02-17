<template>
    <div ref="plotlyChart"></div>
</template>
  
<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Plotly from 'plotly.js-dist-min';

const props = defineProps({
    xAxis: Array,
    yAxis: Array,
});

const plotlyChart = ref(null);

const layout = {
    title: 'Line and Scatter Plot',
    xaxis: {
        title: 'Operation Number',
    },
    yaxis: {
        title: 'Addition Result',
    },
};

onMounted(() => {
    watchEffect(() => {
        const chartData = [{
            x: props.xAxis,
            y: props.yAxis,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
        }];

        Plotly.newPlot(plotlyChart.value, chartData, layout);
    });
});
</script>