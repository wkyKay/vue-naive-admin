<template>
<AppPage>
  <n-card>
    模型压缩模块是该应用的核心功能模块，目前设计的模块用到的压缩技术是结构性模型修剪。这一模块可以被细分为三个部分，参数设置，模型压缩，结果分析。
    <div class='flex'>
      <n-card class='ml-2'>
        在参数设置界面中，用户可以设置模型训练基于的数据集，模型类别，修剪方式，以及修剪后运算次数与原运算次数的比率；
        在这一部分中，用户同样可以选择自主上传模型代码及对应的预训练数据，不使用torchvision提供的框架和参数。
        同时，如果有修正模型的需要，用户也可以为修正时用到的训练参数进行设置，可设置的参数包括训练周期，学习率，处理批量大小和输出频率。
      </n-card>
      <n-card class='ml-2'>
        完成参数设置后通过点击“下一步”可以跳转到模型压缩界面，设置好的模型修剪和模型修正的数据将以列表的方式展示在上方， 供用户进行确认。
        确认完毕后，用户点击模型压缩按键将正式启动压缩，页面中部将随之出现一个进度条，显示目前的压缩训练进度。
        每个训练周期结束时评估得到的模型准确率将显示在进度条下方以供参考。
      </n-card>
      <n-card class='ml-2'>
        全部压缩训练任务结束时，训练的模型将下载到本地，进度条达到百分百。
        此时页面的下方会显示结果分析界面，结果将通过三个图表展示，其一是训练过程中模型准确率随训练周期变化的折线图，
        其二是模型参数大小对比的柱状图，其三是原运算次数与修剪后运算次数对比的柱状图。
        通过观察以上三个图像，用户可以迅速判断模型是否达到精确度，空间，及计算资源三方面的需求。
      </n-card>
    </div>
  </n-card>

  <n-card class='mt-5'>

  </n-card>
</AppPage>
</template>

<script>
import AppPage from '@/components/common/AppPage.vue'

export default {
  name: 'index.vue',
  components: { AppPage }
}
</script>

<style scoped>

</style>
