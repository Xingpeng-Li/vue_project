<template>
  <div class="report">
    <h1 style="text-align: center">工作报告</h1>
    <hr>
    <b-card class="myCard" no-body align="center">
      <b-tabs pills card>
        <b-tab title="日报" active>
          <b-button
            variant="outline-primary"
            class="float-right"
            @click="show=false"
          >
            下载模板
          </b-button>
          <b-card-body>
            <h3>发送日报</h3>
            <hr>
            <b-form-file
              style="width: 50%"
              v-model="reportFile"
              :state="Boolean(reportFile)"
              placeholder="选择文件"
              drop-placeholder="请选择文件！"
            ></b-form-file>
            <b-card border-variant="light">
              <b-form-checkbox
                v-model="waterMark"
                value="0"
                unchecked-value="1"
              >
                添加水印
              </b-form-checkbox>
            </b-card>
          </b-card-body>
          <b-button variant="primary">审批人</b-button>
          <b-button variant="primary">抄送人</b-button>
          <b-button variant="primary">发送</b-button>
        </b-tab>
        <b-tab title="周报" active>
          <b-button
            variant="outline-primary"
            class="float-right"
            @click="show=false"
          >
            下载模板
          </b-button>
          <b-card-body>
            <h3>发送周报</h3>
            <hr>
            <b-form-file
              style="width: 50%"
              v-model="reportFile"
              :state="Boolean(reportFile)"
              placeholder="选择文件"
              drop-placeholder="请选择文件！"
            ></b-form-file>
            <b-card border-variant="light">
              <b-form-checkbox
                v-model="waterMark"
                value="0"
                unchecked-value="1"
              >
                添加水印
              </b-form-checkbox>
            </b-card>
          </b-card-body>
          <b-button variant="primary">审批人</b-button>
          <b-button variant="primary">抄送人</b-button>
          <b-button variant="primary">发送</b-button>
        </b-tab>
        <b-tab title="月报" active>
          <b-button
            variant="outline-primary"
            class="float-right"
            @click="show=false"
          >
            下载模板
          </b-button>
          <b-card-body>
            <h3>发送日报</h3>
            <hr>
            <b-form-file
              style="width: 50%"
              v-model="reportFile"
              :state="Boolean(reportFile)"
              placeholder="选择文件"
              drop-placeholder="请选择文件！"
            ></b-form-file>
            <b-card border-variant="light">
              <b-form-checkbox
                v-model="waterMark"
                value="0"
                unchecked-value="1"
              >
                添加水印
              </b-form-checkbox>
            </b-card>
          </b-card-body>
          <b-button variant="primary">审批人</b-button>
          <b-button variant="primary">抄送人</b-button>
          <b-button variant="primary">发送</b-button>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Report",
  data() {
    return {
      'waterMark': ''
    }
  }
}
</script>

<style scoped>
.myCard {
  width: 50%;
  margin: auto;
}
</style>
