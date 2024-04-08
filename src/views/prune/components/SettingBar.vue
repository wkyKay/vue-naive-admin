<template>
  <div>
    <n-card>
      <div class="flex setting-bar">
        <div>
          {{ title }}
        </div>
        <div v-if="isForm" class='ml-60% mt-2 w-30%'>
          <el-select placeholder="please select your model type">
            <el-option v-for="option in options" :label="option" :value="option" :key="option" />
          </el-select>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    type: String,
    in_option: Array,
  },
  name: 'SettingBar',

  data() {
    return {
      isForm: false,
      isCheckBox: false,
      options: [],
    }
  },

  mounted() {
    if (this.type === 'form') {
      this.isForm = true
    } else if (this.type === 'checkbox') {
      this.isCheckBox = true
    }

    this.options = this.in_option;
  },
}
</script>

<style scoped>
.setting-bar {
  margin-top: 2px;
}
</style>
