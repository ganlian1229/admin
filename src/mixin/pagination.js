//关于分页的混入
export default {
    data () {
        return {
            pageNum: 0, //当前页
            pageSize: 20, //每页数据条数
            totalCount: 25, //数据总数
        }
    },
    methods: {
        //每页大小发生变化
        handleSizeChange (val) {
            this.pageSize = val;
            this.pageNum = 0;
            // console.log(this.pageSize);
            this.getDataList();
        },
        //页数切换
        handleCurrentChange (val) {
            this.pageNum = val - 1;
            // console.log(this.pageNum);
            this.getDataList();
        },
    }
}