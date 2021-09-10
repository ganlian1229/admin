//公用方法
export default class CommonFun {
    // checkedAll变量传过来  arr：需要全选的数组 addArr：全选之后的数组（做删除或者撤回操作的数组） variable：需要做删除或者撤回的变量
    static checkedAllFun (checkedAll, arr, addArr, variable) {
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
    static checkedFun (item, addArr, variable) {
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
    static deepCopy (source) {
        if (!source) return
        let target;
        if (typeof source === 'object') {
            // 根据source类型判断是新建一个数组还是对象
            target = Array.isArray(source) ? [] : {}
            // 遍历source，并且判断是source的属性才拷贝
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    if (typeof source[key] !== 'object') {
                        target[key] = source[key]
                    } else {
                        // 如果内部属性存在复杂数据类型，使用递归实现深拷贝
                        target[key] = this.deepCopy(source[key])
                    }
                }
            }
        } else {
            target = source
        }
        return target
    }
    //增强arr indexOf方法
    static increaseArrIndexOf (arr, variable, value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][variable] == value) {
                return i;
            }
        }
        return -1;
    }
    //数组去重方法
    static delArr (arr) {
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