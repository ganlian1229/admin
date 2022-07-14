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
                <el-col title="标题" :span="4">标题</el-col>
                <el-col :span="1"></el-col>
                <el-col title="公司地址" :span="3">公司地址</el-col>
                <el-col title="用户账号" :span="3">用户账号</el-col>
                <el-col title="申请时间" :span="3">申请时间</el-col>
                <el-col title="状态" :span="2">状态</el-col>
                <el-col title="操作" :span="5">操作</el-col>
            </el-row>
            <div class="content-list-box" v-if="dataList.length != 0">
                <div class="list-item-box" v-for="(item, index) in dataList" :key="index">
                    <el-row :class="item.checked ? 'act' : ''">
                        <el-col title="序号" :span="1">序号</el-col>
                        <el-col title="标题" :span="4">标题</el-col>
                        <el-col :span="1"></el-col>
                        <el-col title="公司地址" :span="3">公司地址</el-col>
                        <el-col title="用户账号" :span="3">用户账号</el-col>
                        <el-col title="申请时间" :span="3">申请时间</el-col>
                        <el-col title="状态" :span="2">状态</el-col>
                        <el-col title="操作" :span="5">操作</el-col>
                    </el-row>
                    <div class="item-hide-box" :class="item.checked ? 'act' : ''">
                        <h6 class="hide-tit">更多信息</h6>
                        <div class="hide-item">
                            <span class="hide-text">联系人：</span>
                            <span class="content-text"> 大大大 </span>
                        </div>
                        <div class="hide-item">
                            <span class="hide-text">联系电话：</span>
                            <span class="content-text"> 123123123 </span>
                        </div>
                        <div class="hide-item">
                            <span class="hide-text">标题：</span>
                            <span class="content-text">啊实打实多</span>
                        </div>
                        <div class="hide-item">
                            <span class="hide-text">详细地址：</span>
                            <span class="content-text">阿是大师大师的</span>
                        </div>
                        <div class="hide-item">
                            <span class="hide-text">服务区域：</span>
                            <span class="content-text">啊实打实多</span>
                        </div>
                        <div class="hide-item">
                            <span class="hide-text">详细说明：</span>
                            <span class="content-text">
                                啊实打啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多实多
                            </span>
                        </div>
                        <div class="hide-item">
                            <span class="hide-text">营业执照：</span>
                            <span class="content-text"> </span>
                            <span class="btn"> 查看 </span>
                        </div>
                        <div class="hide-item">
                            <span class="hide-text">服务图片：</span>
                            <span class="content-text"> </span>
                            <span class="btn"> 查看 </span>
                        </div>
                    </div>
                </div>
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
    name: 'advertising2'
};
</script>
<script setup>
import pagination from '@/components/pagination/pagination';
import { onActivated, onBeforeMount } from 'vue';
//时间快捷选择
let pickerOptions = reactive({
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
});
//时间筛选
let filterTime = ref(null);
let dataList = ref([]);
let pageNum = ref(0);
let pageSize = ref(20);
let totalCount = ref(25);
onActivated(() => {});
onBeforeMount(() => {
    for (let i = 0; i < 30; i++) {
        dataList.value.push({
            checked: false,
            orderId: i
        });
    }
    getDataList();
});

function getDataList() {
    console.log('pageNum', pageNum);
    console.log('pageSize', pageSize);
    console.log('filterTime', filterTime);
}
function dataListClick(item) {
    item.checked = !item.checked;
}
function filterFun() {
    pageNum.value = 1;
    getDataList();
}
</script>
<style lang="scss">
.advertising {
}
</style>
