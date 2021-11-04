<template>
  <div class="advertising">
    <div class="select-box">
      <mouseSelect
        @sueecss="selectSuccess"
        v-model="fileList"
        :isHot="true"
        class="file-box"
      >
        <template slot-scope="scope">
          <div
            class="fileDiv"
            :class="item.isAct ? 'seled' : ''"
            v-for="(item, index) in scope.valueList"
            :key="index"
          >
            {{ item.text }}
          </div>
        </template>
      </mouseSelect>
    </div>
  </div>
</template>
<script>
import mouseSelect from '@/components/mouseSelect'
export default {
  components: {
    mouseSelect,
  },

  data() {
    return {
      fileList: [
        {
          isAct: false,
          text: 'file1',
        },
        {
          isAct: false,
          text: 'file2',
        },
        {
          isAct: false,
          text: 'file3',
        },
        {
          isAct: false,
          text: 'file4',
        },
        {
          isAct: false,
          text: 'file5',
        },
        {
          isAct: false,
          text: 'file6',
        },
        {
          isAct: false,
          text: 'file7',
        },
        {
          isAct: false,
          text: 'file8',
        },
        {
          isAct: false,
          text: 'file9',
        },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {
    //选择成功
    selectSuccess(arr) {
      // this.fileList.forEach((item) => {
      //   item.isAct = false
      // })
      console.log(arr)
      // arr.forEach((item) => {
      //   this.fileList[item].isAct = true
      // })
    },
  },
}
</script>
<style lang="less">
.advertising {
  .select-box {
    width: 50%;

    .file-box {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid red;
      .fileDiv {
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 12px;
        border: 1px solid #ccc;
        margin-right: 10px;
        margin-bottom: 10px;
        &.seled {
          border: 1px solid red;
          background-color: #d6dff7;
        }
      }
    }
  }
}
</style>
