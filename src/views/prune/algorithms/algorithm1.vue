<template>
  <AppPage>
    <div>
      <SettingBar title='参数一'></SettingBar>
      <SettingBar title='参数二'></SettingBar>
      <SettingBar title='参数三'></SettingBar>
      <SettingBar title='参数四'></SettingBar>
    </div>
    <footer class="mt-12 flex items-center justify-end">
      <n-button
        type="primary"
        class="ml-12"
        tag="a"
        target="__blank"
        @click='goCompression()'
      >
        下一步
      </n-button>
    </footer>
  </AppPage>
</template>

<script>
import AppPage from '@/components/common/AppPage.vue'
import SettingBar from '@/views/prune/components/SettingBar.vue'

export default {
  name: 'algorithm1',
  components: { SettingBar, AppPage },
  methods: {
    goCompression() {
      this.$router.push("/prune/setting/compression")
    },
  }
}
</script>

<style scoped></style>
