<template>
  <div class="article-admin" id="articleAdmin">
    <h1 class="other">球场预定规则</h1>
    <div class="other">
      其他东西
    </div>
    <div class="scrollBox" id="scrollBox">
      <p class="box-item" v-for="(item, index) in dataList" :key="index">
        {{ index + 1 }}
      </p>
    </div>
    <div class="other">
      其他东西
    </div>
    <div class="other">
      其他东西
    </div>
    <div class="other">
      其他东西
    </div>
    <div class="other">
      其他东西
    </div>
    <div class="other">
      其他东西
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [], //数据
      scrollBoxHeight: 0, //scroll高度
      scrollBoxOffsetTop: 0, //scroll距离顶部的高度
      isLoading: false, //是否加载中
    };
  },
  created() {},
  mounted() {
    this.addData();
    window.addEventListener("scroll", this.scrollFun, false);
  },
  methods: {
    scrollFun() {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      // console.log(this.scrollBoxHeight + this.scrollBoxOffsetTop - 50);
      // console.log(scrollTop);
      let elementClientHeight = document.documentElement.clientHeight;
      // console.log(elementClientHeight);
      // console.log(scrollTop + bodyClientHeight);
      if (
        !this.isLoading &&
        this.scrollBoxHeight + this.scrollBoxOffsetTop - 50 <=
          scrollTop + elementClientHeight
      ) {
        this.isLoading = true;
        //需要加载数据了
        console.log("11111");
        setTimeout(() => {
          this.addData();
        }, 1000);
      }
    },
    addData() {
      for (let i = 0; i < 10; i++) {
        this.dataList.push({});
      }
      this.isLoading = false;
      this.$nextTick(() => {
        let scroolObj = document.getElementById("scrollBox");
        // console.log(scroolObj.offsetHeight);
        this.scrollBoxHeight = scroolObj.offsetHeight;
        this.scrollBoxOffsetTop = scroolObj.offsetTop;
        console.log(this.scrollBoxHeight);
        console.log(this.scrollBoxOffsetTop);
      });
    },
  },
};
</script>
<style lang="less">
.article-admin {
  background-color: transparent !important;
  .other {
    font-size: 20px;
    padding-bottom: 150px;
  }
  .scrollBox {
    .box-item {
      font-size: 24px;
      padding-bottom: 50px;
    }
  }
}
</style>
