module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    storeToRefs: true,
    useRoute: true,
    useRouter: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    'vue-global-api'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "vue/no-v-model-argument": "off",//在vue3中使用v-model报错
    "array-bracket-spacing": "off",//是否允许非空数组里面有多余的空格
    "object-curly-spacing": "off",//大括号内是否允许不必要的空格
    'prettier/prettier': 'off',
    'space-before-function-paren': "off",//函数定义时括号前面要不要有空格
    'no-console': 'off',//禁止使用console
    'no-debugger': 'off',//禁止使用debugger
    'no-empty-source': 'off',
    'no-unused-vars': 'off',//不能有声明后未被使用的变量或参数
    'vue/multi-word-component-names': 'off',//关闭组件名称检测
    'vue/no-useless-template-attributes': 'off'//关闭template不能作为标签的检测
  }
}
