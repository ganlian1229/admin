<template>
    <div class="test-com">
        <el-input v-test v-model="testValue"></el-input>
        <!-- testValue -->
    </div>
</template>
<script setup>
import { ref } from '@vue/composition-api';

let testValue = ref('');
</script>

<style lang="scss" scoped></style>
