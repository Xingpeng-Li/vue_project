<template>

  <div class="announcement">

    <div>
      <h1 style="text-align: center">公告栏</h1>
      <hr>
    </div>

    <div>

      <b-card>
        <b-tabs pills card vertical>

          <b-tab title="企业公告" active >
            <b-table
              striped
              :items="companyAnnouncements"
              :fields="fields"
            >
              <template v-slot:cell(title)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(time)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2" v-b-modal.modal-1 @click="loadAnnouncementInfo(row)">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>

            </b-table>
          </b-tab>

          <!--公告详情模态框-->
          <b-modal id="modal-1" :title="announcementTitle" hide-footer size="xl">
            {{announcementBody}}<br><br>
            <b-link :href="announcementFile">{{announcementFile}}</b-link>
          </b-modal>

          <b-tab title="部门公告" >
            <b-table
              striped
              :items="departmentAnnouncements"
              :fields="fields"
            >
              <template v-slot:cell(title)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(time)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2" v-b-modal.modal-1 @click="loadAnnouncementInfo(row)">
                  <b-icon icon="eye"></b-icon>

                </b-button>
              </template>
            </b-table>
          </b-tab>

          <b-tab title="系统公告" >
            <b-table
              striped
              :items="systemAnnouncements"
              :fields="fields"
            >
              <template v-slot:cell(title)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(time)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2" v-b-modal.modal-1 @click="loadAnnouncementInfo(row)">
                  <b-icon icon="eye"></b-icon>

                </b-button>
              </template>
            </b-table>
          </b-tab>

        </b-tabs>
      </b-card>
    </div>



  </div>
</template>

<script>

import {getAnnouncement} from "../api/announcement";

export default {
  data() {
    return {
      fields: [
        { key: 'announcementTitle', label: '标题'},
        { key: 'announcementTime', label: '时间'},
        { key: 'actions', label: '预览' },
      ],

      companyAnnouncements:[
      ],
      departmentAnnouncements:[
      ],
      systemAnnouncements:[
      ],


      //单个公告
      announcementTitle:"",
      announcementBody:"",
      announcementFile:"",
    }
  },
  methods:{
    getAllAnnouncements(){
      let _this=this
      getAnnouncement("company").then(res =>{
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.companyAnnouncements=jsonObj
      })
      getAnnouncement("dept").then(res =>{
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.departmentAnnouncements=jsonObj
      })
      getAnnouncement("system").then(res =>{
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.systemAnnouncements=jsonObj
      })
    },
    loadAnnouncementInfo(row){//点击单个公告时加载公告内容
      console.log(row.item);
      this.announcementTitle=row.item.announcementTitle;
      this.announcementBody=row.item.announcementBody;
      this.announcementFile=row.item.announcementFile;
    }
  },
  mounted(){
    this.getAllAnnouncements()
  }
}
</script>

<style scoped>

</style>
