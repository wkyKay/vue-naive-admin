<template>
  <AppPage>
    <n-card>
      <div>
        {{model}}
      </div>
    </n-card>
  </AppPage>
</template>

<script>
import AppPage from '@/components/common/AppPage.vue'
import axios from 'axios'

export default {
  name: 'chatting',
  components: { AppPage },
  mounted() {
    axios.get('http://127.0.0.1:5000')
      .then(response => {
        // 请求成功，更新数据
        console.log(response.data)
        this.model = response.data;
      })
      .catch(error => {
        // 请求失败，处理错误
        console.error('请求数据时出错：', error);
      })
      .finally(() => {
        // 无论请求成功还是失败，加载状态都结束
        this.loading = false;
      });
  },
  data() {
    return {
      model:String
    }
  }
}
</script>

<style scoped>

</style>
