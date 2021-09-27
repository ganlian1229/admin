//关于分页的混入
export default {
    data () {
        return {
            pageNum: 0, //当前页
            pageSize: 20, //每页数据条数
            totalCount: 25, //数据总数
        }
    },
}