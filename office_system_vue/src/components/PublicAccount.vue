<template>

  <div class="publicAccount">

    <div>
      <h1 style="text-align: center">公众号</h1>
      <hr>
    </div>

    <div>

      <b-card>

        <b-input-group>
          <b-form-input style="max-width: 600px;margin-left: 200px;margin-right: 50px" v-model="keyword"></b-form-input>
          <b-button variant="outline-success" style="margin-right: 50px" @click="searchByKeyword">搜索</b-button>
        </b-input-group>

        <br>

        <b-tabs pills card vertical v-model="tabIndex">

          <b-tab title="个人公众号" active @click="loadAllAccounts">
            <b-table
              striped
              :items="personalAccounts"
              :fields="fields"
            >
              <template v-slot:cell(publicaccountName)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(publicaccountBrief)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(publicaccountType)="row">
                {{ row.value==="company"?"企业公众号":"个人公众号" }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2" @click="toDetailAccount(row)">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-tab>

          <b-tab title="企业公众号" @click="loadAllAccounts">
            <b-table
              striped
              :items="companyAccounts"
              :fields="fields"
            >
              <template v-slot:cell(publicaccountName)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(publicaccountBrief)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(publicaccountType)="row">
                {{ row.value==="company"?"企业公众号":"个人公众号" }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2" @click="toDetailAccount(row)">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-tab>

          <b-tab title="收藏公众号" @click="loadAllAccounts">
            <b-table
              striped
              :items="collectionAccounts"
              :fields="fields"
            >
              <template v-slot:cell(publicaccountName)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(publicaccountBrief)="row">
                {{ row.value }}
              </template>
              <template v-slot:cell(publicaccountType)="row">
                {{ row.value==="company"?"企业公众号":"个人公众号" }}
              </template>
              <template v-slot:cell(actions)="row">
                <b-button size="sm" variant="outline-info" class="mb-2" @click="toDetailAccount(row)">
                  <b-icon icon="eye"></b-icon>
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

                  <b-button variant="primary" @click="createAccount">创建</b-button>
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

import {myPublicAccounts,companyPublicAccounts,allSubscribePublicAccounts,createPersonalAccount,
  createCompanyAccount,search} from "../api/publicAccount";
import {haveAuthority} from "../api/company";

export default {
  data() {
    return {

      //选项卡下标
      tabIndex:0,

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
        { key: 'publicaccountName', label: '名字'},
        { key: 'publicaccountBrief', label: '简介'},
        { key: 'publicaccountType', label: '类型'},
        { key: 'actions', label: '操作' }
      ],
      personalAccounts:[
      ],
      companyAccounts:[
      ],
      collectionAccounts:[
        {'publicaccountName':"武汉大学学生会",'publicaccountBrief':"武汉大学学生会创办的公众号",
          'publicaccountId':'10','publicaccountOwner':'','publicaccountType':''},
      ],

      keyword:"",//搜索公众号使用的关键字
      searchAccounts:[//搜索到的公众号
      ],

      //是否为管理员
      haveAuthority:false,
    }
  },
  methods: {
    loadAllAccounts(){//界面初始化时加载所有公众号
      let _this=this
      myPublicAccounts().then(res=>{
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.personalAccounts=jsonObj;
      })
      companyPublicAccounts().then(res=>{
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.companyAccounts=jsonObj;
      })
      allSubscribePublicAccounts().then(res=>{
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.collectionAccounts=jsonObj;
      })
    },
    searchByKeyword() {//搜索公众号
      let _this=this;
      search(this.keyword).then(res=> {
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.searchAccounts = jsonObj;
        _this.tabIndex=0;
        _this.personalAccounts=_this.searchAccounts;
        }
      )
    },
    createAccount(){
      console.log(this.selectedKind)
      if(this.selectedKind===1){
        createPersonalAccount(this.name,this.info).then(res=>{
          let jsonObj = JSON.parse(JSON.stringify(res.data.status));
          if(jsonObj==="success"){
            alert("创建成功")
          }else{
            alert("创建失败")
          }
        })
      }else if(this.selectedKind===2 && this.haveAuthority===true){
        createCompanyAccount(this.name,this.info).then(res=>{
          let jsonObj = JSON.parse(JSON.stringify(res.data.status));
          if(jsonObj==="success"){
            alert("创建成功")
          }else{
            alert("创建失败")
          }
        })
      }else if(this.selectedKind===2 && this.haveAuthority===false){
        alert("对不起，您不是公司管理员，没有权限创建企业公众号")
      }
    },
    toDetailAccount(row){//跳转到详情界面
      this.$router.push({
        name: 'AccountDetail',
        params: {
          accountID: row.item.publicaccountId,
          accountName:row.item.publicaccountName,
          accountInfo:row.item.publicaccountBrief,
        }}
        );
      //this.$router.push({path:'/AccountDetail',query:{accountID:row.item.publicaccountId}});
      console.log(row.item.publicaccountId)
    }
  },
  computed:{
    nameState(){
      return this.name!==''
    }
  },
  mounted(){
    this.loadAllAccounts()

    let _this = this
    //是否为管理员
    haveAuthority().then(res=>{
      let jsonObj = JSON.parse(JSON.stringify(res.data.data));
      //console.log(jsonObj)
      _this.haveAuthority = jsonObj==="admin";
      //console.log(_this.haveAuthority)
    })
  }
}
</script>

<style scoped>

</style>
