<template>
  <div class="cloudFile">
    <h3>
      云空间
      <small><small><font color="black"> 文件一览</font></small></small>
    </h3>
    <hr>
    <b-card-group deck>
      <b-card border-variant="light">
        <b-input-group>
          <b-form-input></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-success">搜索</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-card>
      <b-card border-variant="light">
        <b-input-group>
          <b-form-file
            v-model="reportFile"
            :state="Boolean(reportFile)"
            placeholder="选择文件"
            drop-placeholder="请选择文件！"
          ></b-form-file>
          <b-button variant="outline-primary">上传</b-button>
        </b-input-group>
      </b-card>
    </b-card-group>
    <!-- 消息表格-->
    <div style="margin-right: auto">
      <b-table striped hover :items="files" :fields="fields">
        <template v-slot:cell(fileSuffix)="data">
          <span v-html="getImage(data.value)"></span>
        </template>
        <template v-slot:cell(download)="row">
          <b-button variant="outline-dark" size="sm" @click="downloadFile(row)" class="mr-1">
            下载
          </b-button>
        </template>
        <template v-slot:cell(delete)="row">
          <b-button variant="outline-danger" size="sm" @click="deleteFile(row.item.fileId)" class="mr-1">
            删除
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CloudFile",
  data() {
    return {
      files: [{}],
      fields: [
        { key: 'fileSuffix', label: ''},
        { key: 'fileName', label: '文件名'},
        { key: 'fileUploadTime', label: '上传时间'},
        { key: 'download', label: ''},
        { key: 'delete', label: ''}
        ]
    }
  },
  methods: {
    getImage(value) {
      return '<img src="../assets/image/'+value+'.png" style="height: 25px">'
    },
    downloadFile(row) {
      window.location.href = row.item.fileUrl
    },
    deleteFile(fileId) {
      var message = confirm("是否删除此文件？")
      if(message === true) {

      }
    }
  }
}
</script>

<style scoped>

</style>
