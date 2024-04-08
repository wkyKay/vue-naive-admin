<template>
  <AppPage>
    <div class="flex">
      <n-card class="min-w-700 w-100%">
        <div class="flex">
          <el-descriptions
            title="Pruning Parameters"
            direction="vertical"
            :column="2"
            :size="'default'"
            border
            class="w-45%"
          >
            <el-descriptions-item label="model">{{ model_info.model_type }}</el-descriptions-item>
            <el-descriptions-item label="dataset">{{ model_info.dataset }}</el-descriptions-item>
            <el-descriptions-item label="pruning method">
              {{ model_info.method }}
            </el-descriptions-item>
            <el-descriptions-item label="target flops">
              <el-tag size="small">{{ model_info.ratio }}%</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="example input (batch-channel-height-width)" :span="2">
              <el-tag size="small">1</el-tag>
              -
              <el-tag size="small">3</el-tag>
              -
              <el-tag size="small">224</el-tag>
              -
              <el-tag size="small">224</el-tag>
            </el-descriptions-item>
<!--            <el-descriptions-item label="saving location" :span="2">-->
<!--              {{ model_info.save_location }}-->
<!--            </el-descriptions-item>-->
          </el-descriptions>

          <el-descriptions
            v-if="model_info.ifFineTuning"
            title="FineTuning Parameters"
            direction="vertical"
            :column="2"
            :size="'default'"
            border
            class="w-45% ml-50"
          >
            <el-descriptions-item label="epochs">{{ train_info.epochs }}</el-descriptions-item>
            <el-descriptions-item label="learning rate">{{ train_info.lr }}</el-descriptions-item>
            <el-descriptions-item label="print frequency">
              {{ train_info.print_freq }}
            </el-descriptions-item>
            <el-descriptions-item label="batch-size">
              {{ train_info.batch_size }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </n-card>
    </div>

    <div class="mt-12 flex">
      <n-card>
        <div v-if="ifSubmitted">
          <el-progress v-model='this.progress' :percentage="progress" :stroke-width="15"
                       striped striped-flow :color='this.colors'/>
          <el-text>{{this.description}}</el-text>
          <br/>
          <el-text>epoch:
            <el-tag size="default">{{this.temp_epochs}}/{{this.train_info.epochs}}</el-tag>
          </el-text>

          <el-text>-accuracy:
            <el-tag size="default">{{this.temp_accuracy}}%</el-tag>
          </el-text>

        </div>

        <footer class="mt-12 flex items-center justify-end">
          <n-button type="primary" class="ml-12" tag="a" target="__blank" @click="onsubmit()">
            确认压缩
          </n-button>
        </footer>
      </n-card>
    </div>
    <analysis v-if="ifAnalyzed"></analysis>
  </AppPage>
</template>

<script>
import AppPage from '@/components/common/AppPage.vue'
import pako from 'pako'
import { useModelStore, useAnalysisStore} from '@/store'
import Analysis from '@/views/prune/analysis.vue'

export default {
  name: 'compression',
  components: { Analysis, AppPage },
  data() {
    return {
      temp_accuracy:0,
      temp_epochs:0,
      description:"",
      progressInterval:null,
      link: 'http://127.0.0.1:5000',
      progress: 1,
      ifSubmitted: false,
      ifAnalyzed: false,
      model_info: {
        dataset: '',
        method: '',
        isDefault: true,
        model_type: '',
        example_input: [],
        ratio: 50,
        save_location: null,
        model_params: null,
        ifFineTuning: true,
      },
      train_info: {
        epochs: 20,
        lr: 0.01,
        print_freq: 100,
        batch_size: 128,
      },
      colors: [
        { color: '#f56c6c', percentage: 6 },
        { color: '#5cb87a', percentage: 100 },
      ]
      // accuracy:[],
      // params:[],
      // ops:[]
    }
  },
  mounted() {
    this.model_info = useModelStore().getModelInfo
    this.train_info = useModelStore().getTrainInfo
  },
  methods: {
    decompressModel(modelData) {
      // 解码 base64 编码的字符串
      const compressedData = atob(modelData)
      // 将解码后的数据转换为 Uint8Array
      const uint8Array = Uint8Array.from(compressedData, (char) => char.charCodeAt(0))

      // 解压缩模型数据
      const decompressedData = pako.inflate(uint8Array)

      // 将解压缩后的数据保存为 .pth 文件
      this.saveFile(decompressedData)

      // this.$router.push('/prune/setting/analysis')
    },

    saveFile(data) {
      const blob = new Blob([data], { type: 'application/octet-stream' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'model.pth'
      document.body.appendChild(link)
      link.click()

      // 释放 URL 对象
      URL.revokeObjectURL(link.href)
    },
    onsubmit() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 指定请求头部为 JSON 格式
        },
        body: JSON.stringify({
          model_info: this.model_info,
          train_info: this.train_info
        }), // 将请求数据转换为 JSON 字符串
      }

      this.ifSubmitted = true
      this.progressInterval = setInterval(this.updateProgressBar, 2000);
      // 发起获取模型数据的请求
      fetch(this.link + '/compress', requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          } else {
            return response.json().then((data) => {
              const compressedModelData = data.model // 获取模型数据
              return this.decompressModel(compressedModelData) // 调用解压缩并保存模型的方法
            })
          }
        })
        .catch((error) => {
          // 处理错误
          console.error('There was a problem with the fetch operation:', error)
        })
        .finally(() => {
          this.progress = 100
          clearInterval(this.progressInterval);
          this.updateAnalysisInfo()
        })
    },

    updateProgressBar() {
      fetch(this.link + '/progress')
        .then((response) => response.json())
        .then((data) => {

          let temp_progress = Math.round(data.progress)
          this.temp_epochs = data.cur_accuracy.length
          this.temp_accuracy = data.cur_accuracy[this.temp_epochs-1]||0
          if(temp_progress === -1){
            this.progress = 1
            this.description = "pruning model..."
          }else if(temp_progress === 0){
            this.progress = 5
            this.description = "fine tuning..."
          }else {
            this.progress = 5 + Math.round(temp_progress/100*95);
          }
          // console.log(this.progress)
        })
        .catch((error) => {
          console.error('Failed to update progress:', error);
        });
    },

    updateAnalysisInfo(){
      fetch(this.link + '/analysis')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          useAnalysisStore().setAccuracy(data.accuracy)
          useAnalysisStore().setParams(data.params)
          useAnalysisStore().setOps(data.ops)
          //显示
          this.ifAnalyzed = true
        })
        .catch((error) => {
          console.error('Failed to update analysis:', error);
        });
    }

    // 定时轮询更新进度条

    // onBeforeUpload({ file }) {
    //   if (!file.file?.type.startsWith('image/')) {
    //     $message.error('只能上传图片')
    //     return false
    //   }
    //   return true
    // },
    //
    // async handleUpload({ file, onFinish }) {
    //   if (!file || !file.type) {
    //     $message.error('请选择文件')
    //   }
    //
    //   // 模拟上传
    //   $message.loading('上传中...')
    //   setTimeout(() => {
    //     $message.success('上传成功')
    //     imgList.push({ fileName: file.name, url: URL.createObjectURL(file.file) })
    //     onFinish()
    //   }, 1500)
    // },
  },
}
</script>

<style scoped></style>
