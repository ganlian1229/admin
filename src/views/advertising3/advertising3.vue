<template>
    <div class="advertising">
        <div class="select-box">
            <mouseSelect @sueecss="selectSuccess" v-model="fileList" :isHot="true" class="file-box">
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
<script setup>
import mouseSelect from '@/components/mouseSelect';
let fileList = ref([
    {
        isAct: false,
        text: 'file1'
    },
    {
        isAct: false,
        text: 'file2'
    },
    {
        isAct: false,
        text: 'file3'
    },
    {
        isAct: false,
        text: 'file4'
    },
    {
        isAct: false,
        text: 'file5'
    },
    {
        isAct: false,
        text: 'file6'
    },
    {
        isAct: false,
        text: 'file7'
    },
    {
        isAct: false,
        text: 'file8'
    },
    {
        isAct: false,
        text: 'file9'
    }
]);
//选择成功
function selectSuccess(arr) {
    console.log(arr);
}
</script>
<style lang="scss">
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
