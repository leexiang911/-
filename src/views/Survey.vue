<template>
    <div class="home">
      <Surver :survey="survey" />
    </div>
  </template>
  
  <script>
  import * as SurveyVue from "survey-vue";
  let Surver = SurveyVue.Survey;// 定义一个survey 将会在组件中使用他
  
  export default {
    name: 'Survey',
    components: {
      Surver
    },
    data() {
      return {
        survey: null,
        result: null,// 这里是提交问卷以后把数据赋值给result
      }
    },
    created() {
      let data = {
        title: "问卷调查系统",// 标题
        pages: [// pages中有几个对象就表示有几个页面，这里只要一个页面
          {
            questions: [
              {
                type: "text",
                name: "name",
                title: "请输入您的名字"
              }
            ]
          }
        ]
      }
  
      SurveyVue.StylesManager.applyTheme("bootstrap");//Survey的样式设置
      let model = new SurveyVue.Model(data);
      model.onComplete.add(result => {
        this.result = result.data;
      })
      this.survey = model;
    }
  }
  </script>
  