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
          <b-form-input v-model="keyword"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-success" @click="searchByKeyword">搜索</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-card>
      <b-card border-variant="light">
        <b-input-group>
          <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="选择文件"
            drop-placeholder="请选择文件！"
          ></b-form-file>
          <b-button variant="outline-primary" @click="uploadFile()">上传</b-button>
        </b-input-group>
      </b-card>
    </b-card-group>
    <!-- 云空间文件表格-->
    <div style="margin-right: auto">
      <b-table striped hover :items="filesPart" :fields="fields">
        <template v-slot:cell(fileSuffix)="data">
          <b-img v-if="data.value !== ''" :src="require('../assets/icon/'+data.value+'.png')" style="height: 25px"></b-img>
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
import {deleteFile, getAll, uploadFile} from "../api/cloudFile";

export default {
  name: "CloudFile",
  data() {
    return {
      files: [{}],
      filesPart: [{}],
      keyword: '',  //搜索关键字
      file: null,  //上传的文件
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
    getAllFiles() {
      let _this = this
      getAll().then(res =>  {
        if(res.data.status === 'success') {
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          _this.files = jsonObj
          _this.filesPart = jsonObj
        }
        else {
          alert("获取失败，"+res.data.errMsg)
        }
      }).catch(err => {
        alert("文件获取失败!")
        console.log(err)
      })
    },
    searchByKeyword() {
      this.filesPart = this.files
      if(this.keyword !== '') {
        var newFileList = []
        for(var i = 0;i < this.files.length;i++) {
          let fileName = this.files[i].fileName.toString()
          if(fileName.indexOf(this.keyword) !== -1) {
            newFileList.push(this.files[i])
          }
        }
        this.filesPart = newFileList
      }
    },
    downloadFile(row) {
      window.location.href = row.item.fileUrl
    },
    deleteFile(fileId) {
      let _this = this
      if(confirm("确认删除这个文件吗？")) {
        deleteFile(fileId).then(res => {
          if(res.data.status === 'success') {
            //刷新表格
            for(var i = 0;i < _this.files.length;i++) {
              if(_this.files[i].fileId === fileId) {
                _this.files.splice(i,1)
                break
              }
            }
          }
          else {
            alert("删除失败，"+res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    uploadFile() {
      //上传文件
      uploadFile(this.file).then(res => {
        if(res.data.status === 'success') {
          //刷新表格
          alert("上传成功！")
          this.getAllFiles()
        }
        else {
          alert("上传失败，"+res.data.errMsg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getAllFiles()
  }
}
</script>

<style scoped>

</style>
