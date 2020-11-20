//公用方法
export default class CommentFun {
    // checkedAll变量传过来  arr：需要全选的数组 addArr：全选之后的数组（做删除或者撤回操作的数组） variable：需要做删除或者撤回的变量
    static checkedAllFun(checkedAll, arr, addArr, variable) {
        console.log(checkedAll)
        if (checkedAll) {
            addArr = [];
            arr.forEach(item => {
                item.checked = true;
                addArr.push(item[variable])
            })
        } else {
            arr.forEach(item => {
                item.checked = false;
            })
            addArr = []
        }
        checkedAll = !checkedAll;
        return addArr;
    }
    static checkedFun(item, addArr, variable) {
        // console.log(item);
        if (item.checked) {
            addArr.push(item[variable]);
            // console.log(addArr)
        } else {
            if (addArr.indexOf(item[variable]) > -1) {
                addArr.splice(addArr.indexOf(item[variable]), 1)
            }
        }
        return addArr;
    }

    //对象、数组深拷贝
    static deepCopy(obj) {
        var o = obj instanceof Array ? [] : {};
        for (var k in obj) {
            var val = obj[k];
            if (typeof val === "object") {
                o[k] = this.deepCopy(val);
            } else {
                o[k] = val;
            }
        }
        return o;
    }
}