//input只能输入数字输入其他会被过滤  可以传一个数字过来（决定小数点后保留几位） 记得放在v-model之前
let decimalNumber = 0;
const number = {
    bind: function(el, { value }) {
        console.log(el);
        decimalNumber = value ? value : 99;
        el.children[0].addEventListener('keyup', function() {
            let regExp = new RegExp('([0-9]*)(.?[0-9]{0,' + decimalNumber + '})', 'g');
            el.children[0].value =
                ('' + el.children[0].value) // 第一步：转成字符串
                    .replace(/[^\d^/.]+/g, '') // 第二步：把不是数字，不是小数点的过滤掉
                    .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
                    .replace(/^\./, '0.') // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
                    .match(regExp)[0] || ''; // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
        });
    }
    // update: function (el) {
    //     let regExp = new RegExp("([0-9]*)(.?[0-9]{0," + decimalNumber + "})", "g");
    //     if (el.children[0].value && el.children[0].value !== '') {
    //         el.children[0].value = ("" + el.children[0].value) // 第一步：转成字符串
    //             .replace(/[^\d^/.]+/g, "") // 第二步：把不是数字，不是小数点的过滤掉
    //             .replace(/^0+(\d)/, "$1") // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
    //             .replace(/^\./, "0.") // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
    //             .match(regExp)[0] || ""; // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
    //     }
    // }
};

export default number;
