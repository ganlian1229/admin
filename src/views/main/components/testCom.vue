<template>
  <div class="test-com">
    <el-input v-test v-model="testValue"></el-input>
    <!-- testValue -->
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  setup() {
    console.log('setUp')
    let testObj = reactive({
      testValue: '',
    })
    return {
      ...toRefs(testObj),
    }
  },
})
</script>

<style lang="less" scoped></style>
