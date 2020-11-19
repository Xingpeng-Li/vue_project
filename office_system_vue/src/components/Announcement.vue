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
                <b-button size="sm" variant="outline-info" class="mb-2" @click="download(companyAnnouncements[row.index].fileUrl)">
                  <b-icon icon="download"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-tab>

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
                <b-button size="sm" variant="outline-info" class="mb-2" @click="download(departmentAnnouncements[row.index].fileUrl)">
                  <b-icon icon="download"></b-icon>
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
                <b-button size="sm" variant="outline-info" class="mb-2" @click="download(systemAnnouncements[row.index].fileUrl)">
                  <b-icon icon="download"></b-icon>
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

export default {
  data() {
    return {
      fields: [
        { key: 'title', label: '标题'},
        { key: 'time', label: '时间'},
        { key: 'actions', label: '下载/预览' }
      ],

      companyAnnouncements:[
        {'title':'百度百度百度百度百度百度百度百度百度','time':'2020/11/18','fileUrl':'https://www.baidu.com'},
        {'title':'2','time':'2','fileUrl':''},
      ],
      departmentAnnouncements:[
        {'title':'1','time':'1','fileUrl':'https://www.baidu.com'},
        {'title':'2','time':'2','fileUrl':'https://www.nowcoder.com/'},
        {'title':'3','time':'3','fileUrl':'3'},
      ],
      systemAnnouncements:[
        {'title':'1','time':'1','fileUrl':'https://www.baidu.com'},
        {'title':'2','time':'2','fileUrl':'2'},
        {'title':'3','time':'3','fileUrl':'http://code.z01.com/bootstrap-vue/docs/components/form-input.html'},
      ]
    }
  },
  methods: {
    download(url){
      window.location=url;
    }
  },
  computed: {

  },
  mounted:{

  }
}
</script>

<style scoped>

</style>
