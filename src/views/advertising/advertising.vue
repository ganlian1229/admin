<template>
    <div class="advertising">
        <div class="filter-box">
            <div class="filter-item">
                <el-date-picker
                    v-model="filterTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="filterFun"
                    align="center"
                    :picker-options="pickerOptions"
                >
                </el-date-picker>
            </div>
        </div>
        <div class="filter-box filter-box2">
            <div class="filter-item">
                <el-date-picker
                    v-model="filterTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="filterFun"
                    align="center"
                    :picker-options="pickerOptions"
                >
                </el-date-picker>
            </div>
        </div>

        <div class="content-scroll-box">
            <el-row v-if="dataList.length != 0">
                <el-col title="序号" :span="1">序号</el-col>
                <el-col title="合同编号" :span="3">合同编号</el-col>
                <el-col title="单位名称" :span="4">单位名称</el-col>
                <el-col title="项目名称" :span="3">项目名称</el-col>
                <el-col title="订单属性" :span="4">订单属性</el-col>
                <el-col title="金额" :span="2">金额</el-col>
                <el-col title="负责人" :span="2">负责人</el-col>
                <el-col title="订单状态" :span="2">订单状态</el-col>
                <el-col title="操作" :span="4">操作</el-col>
            </el-row>
            <div class="content-list-box" v-if="dataList.length != 0">
                <el-row v-for="(item, index) in dataList" :key="index">
                    <el-col title="序号" :span="1">序号</el-col>
                    <el-col title="合同编号" :span="3">合同编号</el-col>
                    <el-col title="单位名称" :span="4">单位名称</el-col>
                    <el-col title="项目名称" :span="3">项目名称</el-col>
                    <el-col title="订单属性" :span="4">订单属性</el-col>
                    <el-col title="金额" :span="2">金额</el-col>
                    <el-col title="负责人" :span="2">负责人</el-col>
                    <el-col title="订单状态" :span="2">订单状态</el-col>
                    <el-col title="操作" :span="4">操作</el-col>
                </el-row>
            </div>
            <div class="none-data-box" v-else>暂无数据</div>
        </div>
        <div class="pagination-box" v-if="dataList.length != 0">
            <pagination
                :getDataList="getDataList"
                :pageNum.sync="pageNum"
                :pageSize.sync="pageSize"
                :totalCount.sync="totalCount"
            ></pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'advertising'
};
</script>
<script setup>
import pagination from '@/components/pagination/pagination';
import { onActivated, onBeforeMount } from 'vue';
//时间快捷选择
let pickerOptions = {
    shortcuts: [
        {
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }
    ]
};
//时间筛选
let filterTime = ref(null);
//数据列表
let dataList = ref([]);
//当前页
let pageNum = ref(0);
//每页数据条数
let pageSize = ref(20);
//数据总数
let totalCount = ref(25);
onActivated(() => {
    console.log('activated');
});
onBeforeMount(() => {
    for (let i = 0; i < 30; i++) {
        dataList.value.push({
            checked: false,
            orderId: i
        });
    }
    getDataList();
});
function filterFun() {
    pageNum.value = 1;
    getDataList();
}
function getDataList() {
    console.log('pageNum', pageNum);
    console.log('pageSize', pageSize);
    console.log('filterTime', filterTime);
}
</script>
<style lang="scss">
.advertising {
}
</style>
