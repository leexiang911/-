<template>
  <div class="home container">
    <Surver :survey="survey" />

    <div>

    </div>

  </div>
</template>
  
<script>
import { async } from "q";
import * as SurveyVue from "survey-vue";
let Surver = SurveyVue.Survey;// 定义一个survey 将会在组件中使用他

export default {
  name: 'Survey',
  components: {
    Surver
  },
  data() {
    let data = {
      title: "问卷调查系统",// 标题
      pages: [// pages中有几个对象就表示有几个页面，这里只要一个页面
        {
          questions: []// 内部有几个对象就表示有几个问题
        }
      ]
    }

    SurveyVue.StylesManager.applyTheme("bootstrap");//Survey的样式设置
    let model = new SurveyVue.Model(data);
    model.onComplete.add(result => {
      this.result = result.data;
    })
    this.survey = model;
    return {
      survey: model,
      result: null,// 这里是提交问卷以后把数据赋值给result
    }
  },
  created() {
    const auth = this.$cloudbase.auth();// 获取用户鉴权
    const db = this.$cloudbase.database();// 获取到数据库
    if (auth.hasLoginState()) {// 这里的判断我发现是判断本地的会话存储里面有没有登录的用户
      db.collection("mysite")
        .field({// 过滤掉一些不需要的字段
          _id: false,
          _createTime: false,
          _updateTime: false,
        })
        .get()
        .then(result => {
          let data = {
            title: "前端程序员的相关问卷",// 标题
            pages: [// pages中有几个对象就表示有几个页面，这里只要一个页面
              {
                questions: [
                  ...result.data
                ]
              },
              // {
              //   questions: [
              //     {
              //       "type": "radiogroup",
              //       "name": "customer_role",
              //       "title": "您觉得合理的工资",
              //       "showOtherItem": true,
              //       "choices": [
              //         "5k-6k",
              //         "6k-7k",
              //         "7k-8k",
              //         "8k-9k",
              //         "1w",
              //       ],
              //       "otherText": "其他",
              //       "colCount": 3
              //     },
              //   ]
              // }
            ]
          }

          SurveyVue.StylesManager.applyTheme("bootstrap");//Survey的样式设置
          let model = new SurveyVue.Model(data);
          // 上传文件之前进行处理
          model.onUploadFiles.add()
          model.onComplete.add(result => {
            console.log(this.$cloudbase.uploadFile)
            console.log(result.data)
            // return;
            //这里result 是用户提交的表单内容
            this.$cloudbase.callFunction({//运行腾讯云函数
              name: "uploadAnswer",// 函数名字
              data: result.data,// 传入函数的参数
            }).then((res) => {
              const { msg } = res.result;
              this.$bvToast.toast("感谢您的提交", {
                title: msg,
                variant: "success",
                solid: true
              })
            })
              .catch((err) => { console.log(err, "执行错误") })
          })
          this.survey = model;

        })
    } else {
      this.$router.push({ name: "Home" })
    }

  },
  methods: {


  }
}
</script>
  

<style></style>