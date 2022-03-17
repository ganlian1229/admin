<template>
  <div class="article-admin">
    <h1>近期优惠</h1>
    <test></test>
  </div>
</template>
<script>
import test from "./components/test.vue";
export default {
  components: {
    test,
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  methods: {},
  computed: {},
};
</script>
<style lang="scss">
.article-admin {
  background-color: transparent !important;
}
</style>
