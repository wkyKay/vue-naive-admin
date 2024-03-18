<template>
  <div class="flex setting-bar">
    <n-card>{{title}}</n-card>
  </div>
</template>

<script>
export default {
  props: {
    title:String,
  },
  name: 'SettingBar',
}
</script>

<style scoped>
.setting-bar {
    margin-top: 2px;
}
</style>
