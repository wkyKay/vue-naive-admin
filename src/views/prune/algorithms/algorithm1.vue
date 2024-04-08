<template>
  <AppPage>
    <div class="w-100% flex">
      <el-form :model="model_info" label-width="auto" class="w-80%">

        <n-card>
          <el-form-item label='训练数据集' class='w-50%'>
            <el-select
              v-model="model_info.dataset"
              placeholder="please select dataset"
              @change='handleChangeDataset'
            >
              <el-option v-for="m in known_datasets" :label="m" :value="m" />
            </el-select>
          </el-form-item>
        </n-card>

        <n-card class="mt-5 w-100%">
          <el-form-item label="模型类别" class="w-50% mt-5">
            <div class="w-100%">
              <el-radio-group v-model="model_info.isDefault">
                <el-radio :value="true">选择</el-radio>
                <el-radio :value="false">自定义</el-radio>
              </el-radio-group>
            </div>
            <div class="w-100%">
              <div v-if="model_info.isDefault">
                <el-select
                  v-model="model_info.model_type"
                  placeholder="please select your model"
                  @change="handleModelChange"
                >
                  <el-option v-for="m in known_models" :label="m.name" :value="m.id" />
                </el-select>
              </div>
              <div v-else>
                <codemirror
                  style="border: 1px solid var(--el-border-color); border-radius: 1px"
                  v-model="model_info.model_params"
                  placeholder="Code goes here..."
                  :style="{ width: '100%', height: '200px' }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="extensions"
                />
                <n-button
                  type="primary"
                  class="mt-10px ml-10%"
                  tag="a"
                  target="__blank"
                  @click="goCompression()"
                >
                  确定
                </n-button>
              </div>
            </div>
          </el-form-item>
        </n-card>

        <n-card v-if="!model_info.isDefault" class="mt-5 w-100%">
          <el-form-item label="上传model.pth">
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
          </el-form-item>
        </n-card>

<!--        <n-card class="mt-5 w-100%">-->
<!--          <el-form-item label="示例输入">-->
<!--            <el-col :span="3">-->
<!--              <el-input v-model="model_info.example_input[0]" placeholder="batch_size" maxlength="3" />-->
<!--            </el-col>-->
<!--            <el-col :span="1" class="text-center">-->
<!--              <span class="text-gray-500">-</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--              <el-input v-model="model_info.example_input[1]" placeholder="channel" maxlength="3" />-->
<!--            </el-col>-->
<!--            <el-col :span="1" class="text-center">-->
<!--              <span class="text-gray-500">-</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--              <el-input v-model="model_info.example_input[2]" placeholder="width" maxlength="3" />-->
<!--            </el-col>-->
<!--            <el-col :span="1" class="text-center">-->
<!--              <span class="text-gray-500">-</span>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--              <el-input v-model="model_info.example_input[3]" placeholder="height" maxlength="3" />-->
<!--            </el-col>-->
<!--          </el-form-item>-->
<!--        </n-card>-->


        <n-card class="mt-5 w-100%" >
          <el-form-item label='修剪方法' class='w-50% '>
            <el-select
              v-model="model_info.method"
              placeholder="please select dataset"
            >
              <el-option v-for="m in known_methods" :label="m" :value="m" />
            </el-select>
          </el-form-item>
        </n-card>

        <n-card class="mt-5 w-100%">
          <el-form-item label="浮点运算次数" class="mt-20">
            <el-input-number v-model="model_info.ratio" :min="1" :max="100" />
            <el-text>%</el-text>
          </el-form-item>
        </n-card>

        <n-card class="mt-5 w-100%">
          <el-form-item label="修正模型" class="mt-20 mr-200">
            <div class="w-100%">
              <el-radio-group v-model="model_info.ifFineTuning">
                <el-radio :value="true">是</el-radio>
                <el-radio :value="false">否</el-radio>
              </el-radio-group>
              <div v-if='model_info.ifFineTuning'>
                <el-form class='flex'>
                  <el-form-item label="训练周期" class="mt-20">
                    <el-input-number v-model="train_info.epochs" :min="0" :max="100" />
                  </el-form-item>
                  <el-form-item label="学习率 " class="ml-20 mt-20">
                    <el-input-number v-model="train_info.lr" :step="0.01" :min="0.01" :max="0.3" />
                  </el-form-item>
                  <el-form-item label="处理批量" class="ml-20 mt-20">
                    <el-input-number v-model="train_info.batch_size" :min="4" :max="128" />
                  </el-form-item>
                  <el-form-item label="打印频率" class="ml-20 mt-20">
                    <el-input-number v-model="train_info.print_freq" :min="10" :max="200" />
                  </el-form-item>
                </el-form>

              </div>
            </div>
          </el-form-item>

          <n-button
            type="primary"
            class="ml-90%"
            tag="a"
            target="__blank"
            @click="goNext()"
          >
            下一步
          </n-button>
        </n-card>

      </el-form>
<!--      <n-card class='ml-10 w-20%' style='border-color: darkseagreen;border-width: 1px'>-->
<!--        参数说明-->
<!--      </n-card>-->
    </div>

  </AppPage>
</template>

<script>
import AppPage from '@/components/common/AppPage.vue'
import SettingBar from '@/views/prune/components/SettingBar.vue'
import { TreeSelect } from 'ant-design-vue'
import { shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import pako from 'pako'
import dataset_model from '@/temp/dataset_model.json'
import { useModelStore } from '@/store'

export default {
  name: 'algorithm1',
  components: { SettingBar, AppPage, Codemirror },
  data() {
    return {
      known_models: [], //id, name, example_input
      known_datasets:["cifar10", "cifar100", "ImageNet", "modelnet40"],
      known_methods:["random","l1","lamp","slim","group_norm","group_greg","group_sl"],
      extensions: [python()],
      view: shallowRef(null),
      model_info: {
        dataset:null,
        method:null,
        isDefault: true,
        model_type: '',
        example_input: [],
        ratio: 50,
        save_location: null,
        model_params: null,
        ifFineTuning:true,
      },
      train_info: {
        epochs: 50,
        lr: 0.1,
        print_freq: 100,
        batch_size: 64,
      },
      SHOW_PARENT: TreeSelect.SHOW_PARENT,
    }
  },
  methods: {
    goNext(){
      const modelStore = useModelStore()
      modelStore.setModelInfo(this.model_info)
      modelStore.setTrainInfo(this.train_info)
      this.$router.push('/prune/setting/compression');
    },

    handleModelChange(selectedValue) {
      this.model_info.example_input = this.known_models[selectedValue].example_input
      this.model_info.model_type = this.known_models[selectedValue].name
    },

    handleChangeDataset(selectedValue){
      this.known_models = dataset_model[selectedValue]
      this.model_info.model_type = ''
      this.model_info.example_input=[]
    }

  },
}
</script>

<style scoped></style>
