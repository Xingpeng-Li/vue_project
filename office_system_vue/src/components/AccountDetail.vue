<template>

  <div class="accountDetail">
    <b-card>
      <div>
        <h1>公众号名</h1>
        <hr>
      </div>

      <div>
        <h6>公众号简介</h6>
        <hr>
      </div>

      <div>
        <b-button-group class="float-right">
          <b-button variant="primary" v-b-modal.modal-2>
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
        <template v-slot:cell(name)="row">
          {{ row.value }}
        </template>
        <template v-slot:cell(info)="row">
          {{ row.value }}
        </template>
        <template v-slot:cell(time)="row">
          {{ row.value }}
        </template>
        <template v-slot:cell(actions)="row">
          <b-button size="sm" variant="outline-info" class="mb-2" v-b-modal.modal-1>
            <b-icon icon="eye"></b-icon>
          </b-button>
        </template>
      </b-table>
    </b-card>

    <b-modal id="modal-1" title="文章标题" hide-footer size="xl">
      <h9>文章内容</h9><br><br>
      <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
    </b-modal>

    <!--写文章弹出的模态框-->
    <b-modal id="modal-2" title="写文章" hide-footer size="xl">
      <pre class="mt-3 mb-0">{{ w_title }}</pre>
      <h9>标题</h9>
      <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="请在此输入标题"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <pre class="mt-3 mb-0">{{ w_title }}</pre>
      <h9>简介</h9>
      <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="请在此输入简介"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <pre class="mt-3 mb-0">{{ w_info }}</pre>
      <h9>正文</h9>
      <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="请在此输入正文"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <pre class="mt-3 mb-0">{{ w_text }}</pre>
      <br>
      <h9>选择想要上传的图片</h9>
      <b-form-file v-model="w_picture" class="mt-3" plain></b-form-file>
    </b-modal>

  </div>
</template>

<script>
export default {
  data(){
    return{

      //是否已经收藏
      isCollected:false,

      //写文章
      w_title:"",
      w_info:"",
      w_text:"",
      w_picture:'',

      fields:[
        { key: 'title', label: '标题'},
        { key: 'info', label: '简介'},
        { key: 'time', label: '发布时间'},
        { key: 'actions', label: '操作' }
      ],
      passages:[
        {'title':'1','info':'1','time':'1'},
        {'title':'2','info':'2','time':'2'},
        {'title':'3','info':'3','time':'3'},
        {'title':'4','info':'4','time':'4'},
        {'title':'5','info':'5','time':'5'},
      ],

    }
  },
  methods:{

    collect(){//收藏公众号
      this.isCollected=!this.isCollected;
      //接接口
    }
  }
}
</script>

<style scoped>

</style>
