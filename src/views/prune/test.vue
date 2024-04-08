<template>
  <div class="echarts-chart" ref="echartsChart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  },
  name: 'EchartsChart',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // 获取图表容器
      const chartDom = this.$refs.echartsChart;
      // 初始化echarts实例
      const myChart = echarts.init(chartDom);
      // 设置图表配置项和数据
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.data
          }
        ]
      };
      // 使用设置好的配置项初始化图表
      option && myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.echarts-chart {
    width: 100%;
    height: 400px;
}
</style>
