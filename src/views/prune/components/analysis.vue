<template>
  <div class="mt-20">
    <n-card>
      <div ref="lineChart" style="width: 1000px; height: 500px"></div>
    </n-card>
    <n-card>
      <div class="flex">
        <div ref="histogram" style="width: 500px; height: 400px"></div>
        <div ref="histogram1" style="width: 500px; height: 400px"></div>
      </div>
    </n-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import AppPage from '@/components/common/AppPage.vue'
import { useAnalysisStore } from '@/store/index.js'
export default {
  name: 'Analysis',
  components: { AppPage },
  data() {
    return {
      accuracy: [],
      params: [2,2],
      ops: [1,1],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        // 获取数据并等待 Promise 对象的解析
        this.accuracy = await useAnalysisStore().GetAccuracy
        this.params = await useAnalysisStore().GetParams
        this.ops = await useAnalysisStore().GetOps

        // 数据获取完成后初始化图表
        this.initLineChart()
        this.initHistogram()
        this.initHistogram1()
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    },

    initLineChart() {
      const chartDom = this.$refs.lineChart
      const myChart = echarts.init(chartDom)
      const xAxisData = Array.from({ length: this.accuracy.length }, (_, index) => index + 1)
      let option = {
        title: {
          text: 'Analysis',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let result = "epoch " + params[0].name + '<br>';
            params.forEach(function (item) {
              // 添加圆点的样式
              result += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${item.color}"></span>`;
              result += item.value + '%' + '<br>';
            });
            return result;
          }
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.accuracy,
            type: 'line',
          },
        ],
      }
      option && myChart.setOption(option)
    },

    initHistogram() {
      const chartDom = this.$refs.histogram
      const myChart = echarts.init(chartDom)
      let option = {
        title: {
          text: 'Parameters (/M)',
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let result = params[0].name + '<br>';
            params.forEach(function (item) {
              // 添加圆点的样式
              result += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${item.color}"></span>`;
              result += item.value + ' M' + '<br>';
            });
            return result;
          }
        },
        xAxis: {
          type: 'category',
          data: ['Before', 'After'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            barWidth: '60%',
            data: this.params,
            type: 'bar',
          },
        ],
      }

      option && myChart.setOption(option)
    },

    initHistogram1() {
      const chartDom = this.$refs.histogram1
      const myChart = echarts.init(chartDom)
      let option = {
        title: {
          text: 'Operations (/G)',
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let result = params[0].name + '<br>';
            params.forEach(function (item) {
              // 添加圆点的样式
              result += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${item.color}"></span>`;
              result += item.value + ' G' + '<br>';
            });
            return result;
          }
        },
        xAxis: {
          type: 'category',
          data: ['Before', 'After'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            color:'green',
            barWidth: '60%',
            data: this.ops,
            type: 'bar',
          },
        ],
      }

      option && myChart.setOption(option)
    },
  },
}
</script>

<style>
/* 可以添加样式 */
</style>
