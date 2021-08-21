//公用方法
export default class CommonFun {
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
        var newobj = {}
        //判断是否为null
        if (obj === null) return null;
        for (var key in obj) {
            //判断数组
            if ({}.toString.call(obj) === "[object Array]") {
                var newarr = [];
                newarr = obj.slice()
                return newarr
            }
            if (typeof obj[key] !== "object") {
                newobj[key] = obj[key]
            } else {
                newobj[key] = this.deepCopy(obj[key])
            }
        }
        return newobj
    }
    //增强arr indexOf方法
    static increaseArrIndexOf(arr, variable, value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][variable] == value) {
                return i;
            }
        }
        return -1;
    }
    //数组去重方法
    static delArr(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (newArr.indexOf(arr[i]) == -1) {
                newArr.push(arr[i]);
                if (item.children && item.children.length) {
                    item.children = this.delArr(item.children)
                }
            }
        }
        return newArr;
    }

}