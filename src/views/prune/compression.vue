<template>
  <AppPage>
    <div class="flex">
      <n-card class="min-w-700 w-60%">你设置的参数</n-card>
      <n-card class="ml-12 w-40%">
        上传压缩模型
        <n-upload
          class="mx-auto w-[75%] p-20 text-center"
          :custom-request="handleUpload"
          :show-file-list="false"
          accept=".png,.jpg,.jpeg"
          @before-upload="onBeforeUpload"
        >
          <n-upload-dragger>
            <div class="h-150 f-c-c flex-col">
              <i class="i-mdi:upload mb-12 text-68 color-primary" />
              <n-text class="text-14 color-gray">点击或者拖动文件到该区域来上传</n-text>
            </div>
          </n-upload-dragger>
        </n-upload>
      </n-card>
    </div>
    <div class="mt-12 flex">
      <n-card>
        压缩进度条
        <el-progress
          :percentage="30"
          :stroke-width="15"
          striped
        />
        <footer class="mt-12 flex items-center justify-end">
          <n-button type="primary" class="ml-12" tag="a" target="__blank">确认压缩</n-button>
        </footer>
      </n-card>
    </div>
  </AppPage>
</template>

<script>
import AppPage from '@/components/common/AppPage.vue'

export default {
  name: 'compression',
  components: { AppPage },
  methods: {
    onBeforeUpload({ file }) {
      if (!file.file?.type.startsWith('image/')) {
        $message.error('只能上传图片')
        return false
      }
      return true
    },

    async handleUpload({ file, onFinish }) {
      if (!file || !file.type) {
        $message.error('请选择文件')
      }

      // 模拟上传
      $message.loading('上传中...')
      setTimeout(() => {
        $message.success('上传成功')
        imgList.push({ fileName: file.name, url: URL.createObjectURL(file.file) })
        onFinish()
      }, 1500)
    },
  },
}
</script>

<style scoped></style>
