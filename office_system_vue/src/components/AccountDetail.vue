<template>

  <div class="accountDetail">
    <b-card>
      <div>
        <h1>{{ accountName }}</h1>
        <hr>
      </div>

      <div>
        <h6>{{ accountInfo }}</h6>
        <hr>
      </div>

      <div>
        <b-button-group class="float-right">
          <b-button variant="primary" v-b-modal.modal-2 v-show="canWrite" @click="write">
            <b-icon icon="pen"></b-icon>
          </b-button>
          <b-button variant="primary" @click="collect">
            <b-icon icon="star" v-show="!isCollected"></b-icon>
            <b-icon icon="star-fill" v-show="isCollected"></b-icon>
          </b-button>
        </b-button-group>
      </div>

      <b-table
        striped
        :items="passages"
        :fields="fields"
      >
        <template v-slot:cell(postTitle)="row">
          {{ row.value }}
        </template>
        <template v-slot:cell(postBrief)="row">
          {{ row.value }}
        </template>
        <template v-slot:cell(postDate)="row">
          {{ row.value }}
        </template>
        <template v-slot:cell(actions)="row">
          <b-button size="sm" variant="outline-info" class="mb-2" v-b-modal.modal-1 @click="loadPost(row)">
            <b-icon icon="eye"></b-icon>
          </b-button>
          <b-button size="sm" variant="outline-info" class="mb-2" v-show="canWrite" @click="deletePassage(row)">
            <b-icon icon="trash"></b-icon>
          </b-button>
        </template>
      </b-table>
    </b-card>

    <!--post详情模态框-->
    <b-modal id="modal-1" :title="title" hide-footer size="xl">
      <h9>{{body}}</h9><br><br>
      <b-img :src="picture" fluid ></b-img>
    </b-modal>

    <!--写文章弹出的模态框-->
    <b-modal ref="modal-2" title="写文章" hide-footer size="xl">
      <pre class="mt-3 mb-0"></pre>
      <h9>标题</h9>
      <b-form-textarea
        id="textarea"
        v-model="w_title"
        placeholder="请在此输入标题"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <pre class="mt-3 mb-0"></pre>
      <h9>简介</h9>
      <b-form-textarea
        id="textarea"
        v-model="w_info"
        placeholder="请在此输入简介"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <pre class="mt-3 mb-0"></pre>
      <h9>正文</h9>
      <b-form-textarea
        id="textarea"
        v-model="w_text"
        placeholder="请在此输入正文"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <pre class="mt-3 mb-0"></pre>
      <br>
      <h9>选择想要上传的图片</h9>
      <b-form-file v-model="w_picture" class="mt-3" plain></b-form-file>
      <b-button variant="outline-primary" style="margin-left: 500px" @click="writePassage">发表</b-button>
    </b-modal>

  </div>
</template>

<script>

import {getAllPosts,subscribe,unsubscribe,allSubscribePublicAccounts,createPost as canPost} from "../api/publicAccount";
import {deletePost,createPost as writePost} from "../api/post";

export default {
  data(){
    return{

      accountID:"",
      accountName:"",
      accountInfo:"",

      //是否已经收藏
      isCollected:false,

      //文章的具体信息
      title:"",
      info:"",
      body:"",
      picture:"",

      //写文章给你的权限
      canWrite:false,

      //写文章
      w_title:"",
      w_info:"",
      w_text:"",
      w_picture:'',

      fields:[
        { key: 'postTitle', label: '标题'},
        { key: 'postBrief', label: '简介'},
        { key: 'postDate', label: '发布时间'},
        { key: 'actions', label: '操作' }
      ],
      passages:[
        {'postId':'5','postDate':'5','postImage':'5','postBrief':"","postTitle":"","postBody":""},
      ],

    }
  },
  methods:{

    collect(){//收藏公众号
      let _this = this
      if(this.isCollected===true)
      {
        unsubscribe(this.accountID).then(res=>{
          let jsonObj = JSON.parse(JSON.stringify(res));
          if(jsonObj.data.status==="success"){
            alert("取消订阅成功")
          }else{
            alert(jsonObj.data.data.errMsg)
          }
          _this.isCollected=false;
        })
      }else{
        subscribe(this.accountID).then(res=>{
          let jsonObj = JSON.parse(JSON.stringify(res));
          console.log(jsonObj)
          if(jsonObj.data.status==="success"){
            alert("订阅成功")
          }else{
            alert(jsonObj.data.data.errMsg)
          }
        })
        _this.isCollected=true;
      }
    },
    loadDetail(){//初始化
      this.accountID=this.$route.params.accountID;
      this.accountName=this.$route.params.accountName;
      this.accountInfo=this.$route.params.accountInfo;
      //this.accountID=this.$route.query.accountID;
      //console.log(this.accountID)


      let _this=this

      //判断是否已经订阅
      let allSubscribes = [];
      allSubscribePublicAccounts().then(res=>{
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        allSubscribes=jsonObj;
        //console.log(allSubscribes)
        //console.log(_this.accountID)
        for (let a in allSubscribes) {
          if(allSubscribes[a].publicaccountId===parseInt(_this.accountID)){
            _this.isCollected=true;
          }
          //console.log(_this.accountID)
          //console.log(allSubscribes[a].publicaccountId)
        }
        //console.log(this.isCollected)
      })


      getAllPosts(this.accountID).then(res =>{
        let jsonObj = JSON.parse(JSON.stringify(res.data.data));
        _this.passages=jsonObj
      })
      canPost(this.accountID).then(res=>{//是否具有写权限
        _this.canWrite = JSON.parse(JSON.stringify(res.data.data));
      })
    },
    loadPost(row){//点开单个Post
      this.title=row.item.postTitle;
      this.info=row.item.postBrief;
      this.body=row.item.postBody;
      this.picture=row.item.postImage;
    },
    write(){//弹模态框
      this.$refs['modal-2'].show()
    },
    writePassage(){//写文章
      let _this=this
      writePost(this.w_picture,this.w_title,this.w_text,this.w_info,this.accountID).then(res=>{
        let jsonObj = JSON.parse(JSON.stringify(res));
        console.log(jsonObj)
        if(jsonObj.data.status==="success"){
          alert("发表成功")
          _this.$refs['modal-2'].hide()
          _this.loadDetail()
        }else{
          alert(jsonObj.data.data.errMsg)
        }

      })
    },
    deletePassage(row){//删除文章
      let _this=this
      deletePost(row.item.postId).then(res=>{
        let jsonObj = JSON.parse(JSON.stringify(res));
        console.log(jsonObj)
        if(jsonObj.data.status==="success"){
          alert("删除成功")
        }else{
          alert(jsonObj.data.data.errMsg)
        }
        _this.loadDetail()
      })
    },
  },
  computed:{

  },
  mounted() {
    this.loadDetail()
  }
}
</script>

<style scoped>

</style>
