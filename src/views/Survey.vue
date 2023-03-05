<template>
  <div class="home container">
    <Surver :survey="survey" />

    <div>
    <b-button @click="$bvToast.show('my-toast')">Show toast</b-button>

    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Notice!</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
        </div>
      </template>
      This is the content of the toast.
      It is short and to the point.
    </b-toast>
  </div>
    <div>
      <b-button @click="toast('b-toaster-top-right')" class="mb-2">b-toaster-top-right</b-button>
      <b-button @click="toast('b-toaster-top-left')" class="mb-2">b-toaster-top-left</b-button>
      <b-button @click="toast('b-toaster-top-center')" class="mb-2">b-toaster-top-center</b-button>
      <b-button @click="toast('b-toaster-top-full')" class="mb-2">b-toaster-top-full</b-button>
      <b-button @click="toast('b-toaster-bottom-right', true)" class="mb-2">b-toaster-bottom-right</b-button>
      <b-button @click="toast('b-toaster-bottom-left', true)" class="mb-2">b-toaster-bottom-left</b-button>
      <b-button @click="toast('b-toaster-bottom-center', true)" class="mb-2">b-toaster-bottom-center</b-button>
      <b-button @click="toast('b-toaster-bottom-full', true)" class="mb-2">b-toaster-bottom-full</b-button>
    </div>
    
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
  },
  methods: {
    toast(toaster, append = false) {
      this.counter++
      this.$bvToast.toast(`Toast ${this.counter} body content`, {
        title: `Toaster ${toaster}`,
        toaster: toaster,
        solid: true,
        appendToast: append
      })
    }

  }
}
</script>
  

<style>

</style>