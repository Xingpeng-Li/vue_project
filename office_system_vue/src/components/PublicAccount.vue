<template>

  <div class="publicAccount">

    <div>
      <h1 style="text-align: center">公众号</h1>
      <hr>
    </div>

    <div>

      <b-card>

        <b-input-group>
          <b-form-input style="max-width: 600px;margin-left: 200px;margin-right: 50px"></b-form-input>
          <b-button variant="outline-success" style="margin-right: 50px">搜索</b-button>
        </b-input-group>

        <br>

        <b-tabs pills card vertical>

          <b-tab title="个人公众号" active >
            <b-table
              striped
              :items="personalAccounts"
              :fields="fields"
            >
              <template v-slot:cell(name)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(info)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2">
                  <router-link to="/AccountDetail"><b-icon icon="eye"></b-icon></router-link>
                </b-button>
              </template>
            </b-table>
          </b-tab>

          <b-tab title="企业公众号" >
            <b-table
              striped
              :items="companyAccounts"
              :fields="fields"
            >
              <template v-slot:cell(name)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(info)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2">
                  <router-link to="/AccountDetail"><b-icon icon="eye"></b-icon></router-link>
                </b-button>
              </template>
            </b-table>
          </b-tab>

          <b-tab title="收藏公众号" >
            <b-table
              striped
              :items="collectionAccounts"
              :fields="fields"
            >
              <template v-slot:cell(name)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(info)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2">
                  <router-link to="/AccountDetail"><b-icon icon="eye"></b-icon></router-link>
                </b-button>
              </template>
            </b-table>
          </b-tab>

          <b-tab title="创建公众号">

            <b-card class="myCard" no-body align="center">
              <b-card-body>
                <div role="group">
                  <b-input-group class="mt-3">
                    <template v-slot:prepend>
                      <b-input-group-text style="width: 100px">
                        <span style="margin: auto">名字</span>
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="请输入公众号名字"
                      :state="nameState"
                      v-model="name"
                      trim
                    ></b-form-input>
                  </b-input-group>
                  <b-input-group class="mt-3">
                    <template v-slot:prepend>
                      <b-input-group-text style="width: 100px">
                        <span style="margin: auto">简介</span>
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      placeholder="请输入公众号简介"
                      v-model="info"
                      trim
                    ></b-form-input>
                  </b-input-group>
                  <b-input-group class="mt-3">
                    <template v-slot:prepend>
                      <b-input-group-text style="width: 100px">
                        <span style="margin: auto">公众号类型</span>
                      </b-input-group-text>
                    </template>
                    <template>
                      <div>
                        <b-form-select v-model="selectedKind" :options="accountKinds"></b-form-select>
                      </div>
                    </template>
                  </b-input-group>

                  <b-button variant="primary" @click="">创建</b-button>
                </div>
              </b-card-body>
            </b-card>

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

      //创建公众号使用的字段
      name:'',
      info:'',
      selectedKind: null,
      accountKinds:[
        { value: 1, text: '个人公众号' },
        { value: 2, text: '企业公众号' },
      ],


      //显示公众号table使用的字段
      fields: [
        { key: 'name', label: '名字'},
        { key: 'info', label: '简介'},
        { key: 'actions', label: '操作' }
      ],
      personalAccounts:[
        {'name':"武汉大学学生会",'info':"武汉大学学生会创办的公众号",'':''},
        {'name':"武汉大学计算机学院学生会",'info':"武汉大学学生会创办的公众号",'':''},
        {'name':"武汉大学化学与分子学院学生会",'info':"武汉大学学生会创办的公众号",'':''},
      ],
      companyAccounts:[
        {'name':"武汉大学学生会",'info':"武汉大学学生会创办的公众号",'':''},
        {'name':"武汉大学计算机学院学生会",'info':"武汉大学学生会创办的公众号",'':''},
        {'name':"武汉大学化学与分子学院学生会",'info':"武汉大学学生会创办的公众号",'':''},
      ],
      collectionAccounts:[
        {'name':"武汉大学学生会",'info':"武汉大学学生会创办的公众号",'':''},
        {'name':"武汉大学计算机学院学生会",'info':"武汉大学学生会创办的公众号",'':''},
        {'name':"武汉大学化学与分子学院学生会",'info':"武汉大学学生会创办的公众号",'':''},
      ],

    }
  },
  methods: {

  },
  computed: {
    nameState(){
      return this.name!==''
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
