<template>
  <!--聊天窗口-->
  <div id="windowBox" style="overflow-y:auto; height: 670px">
    <!--左边列表-->
    <div class="user-list">
      <!--个人信息-->
      <div class="user-list-header">
        <div class="user-list-header-txt" style="text-align: center">
          <p>
            <span class="user-list-header-nickname"></span>
          </p>
          <p class="user-list-header-username"></p>
        </div>
      </div>
      <!--群聊-->
      <div class="user-list-title">
        <img src="src/assets/image/group.png"
             alt="">
        群聊(<span id="user-list-title-count-g">0</span>)
      </div>
      <div class="user-list-group">
        <div class="user-list-header user-list-item active-u-l" onclick="switchChatRoomGroup(this)">
          <div class="user-list-header-avatar user-list-item-header-avatar">
            <img src="src/assets/image/qunliao.jpeg"
                 alt="">
          </div>
          <div class="user-list-header-txt">
            <p class="user-list-header-nickname user-list-item-header-nickname">群聊</p>
          </div>
        </div>
      </div>
      <!--在线用户-->
      <div class="user-list-title">
        <img src="https://yuan-1252477692.cos.ap-guangzhou.myqcloud.com/blog/src/chatroom/inline.png"
             alt="">
        在线用户(<span id="inline-user-u">0</span>)
      </div>
      <div class="user-list-tab">
        <div class="user-list-tab-on" onclick="switchUserListTab(0)">部门联系人</div>
        <div onclick="switchUserListTab(1)">公司联系人</div>
      </div>
      <!--部门联系人-->
      <div class="user-list-items-relevant">
        <p class="loading"><span class="iconfont icon-loading"></span>加载中...</p>
      </div>
      <!--公司联系人-->
      <div class="user-list-items-all" style="display: none">
        <p class="loading"><span class="iconfont icon-loading"></span>加载中...</p>
      </div>
    </div>
    <!--弹出层-->
    <div class="user-list-popup" onclick="hiddenUserListPopup()">
    </div>
    <!--按钮-->
    <span class="show-user-list-popup-menu iconfont icon-menu-off" onclick="showUserListPopup()"></span>
    <!--消息-->
    <div class="message-box">
      <div class="message-box-title" id="message-box-title-inline">部门群聊</div>
      <!--消息列表-->
      <div class="message-box-content">
        <div class="load-message" onclick="loadMessage(this)"><span class="iconfont icon-time"></span>加载更多
        </div>
      </div>
      <!--发送面板-->
      <div class="message-box-system">
        <div class="message-box-system-menu">
          <div class="message-box-system-menu-enjoy" onMouseOver="showEnjoy(1)"
               onMouseOut="showEnjoy(0)">
            <img src="https://yuan-1252477692.cos.ap-guangzhou.myqcloud.com/blog/src/chatroom/icon/menu-enjoy.png"
                 alt="发送表情" class="message-box-system-menu-icon">
            <!--表情选择-->
            <div class="enjoy-view-position">
              <div class="enjoy-view">
                <table width="100%" height="100%" id="enjoyViewTable"></table>
              </div>
            </div>
          </div>
          <div class="message-box-system-menu-img">
            <img src="src/assets/image/menu-img.png"
                 alt="发送图片" class="message-box-system-menu-icon">
            <input type="file" onchange="sendFile(this,0)" accept="image/*" title="选择发送图片"/>
          </div>
          <div class="message-box-system-menu-img" style="top:2px;">
            <img src="src/assets/image/menu-file.png"
                 alt="发送文件" class="message-box-system-menu-icon">
            <input type="file" onchange="sendFile(this,1)" accept="*" title="选择发送文件"/>
          </div>
        </div>
        <div class="message-box-system-message">
          <textarea type="text" class="message-box-system-message-c"></textarea>
        </div>
        <div class="message-box-system-message-send">
          <span>按下Enter换行、Ctrl+Enter发送</span>
          <button class="btn-send" onclick="sendMessage()">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="src/assets/js/jquery-3.5.1.min.js"></script>
<script>
import {getSocketMessageByDate, getSocketUserRelevant, joinChat} from "../api/chat";
import {uploadImage} from "../api/File";

export default {
  name: "ChatRoom",
  data(){
    return{
      initSuccess: false,
      socketUserList:[],
      userData: [],
      loadTime: new Date().getTime(),
      preTime: new Date().getTime(),
      roomUser: null,
      inLineUserList: [],
      relevantUserList: [],
      sessionId: "",
      companyId: "",
      deptId: "",
      wsControllerM: null,
      handelMessageFn: null,
      messageBoxContent: null,
      wsAddress:"ws://localhost:9000",
      requestAddress: "http://localhost:9000",
      fileTypeObj: {
        zip: {
          icon: "icon-file-zip",
          color: "#EAA72C"
        },
        rar: {
          icon: "icon-file-zip",
          color: "#EAA72C"
        },
        css: {
          icon: "icon-file-css",
          color: "#0096E6"
        },
        doc: {
          icon: "icon-file-word",
          color: "#1976D2"
        },
        docx: {
          icon: "icon-file-word",
          color: "#1976D2"
        },
        rtf: {
          icon: "icon-file-word",
          color: "#1976D2"
        },
        html: {
          icon: "icon-file-html",
          color: "#359105"
        },
        exe: {
          icon: "icon-file-exe",
          color: "#4D7FE4"
        },
        js: {
          icon: "icon-file-js",
          color: "#544ba8"
        },
        xlsx: {
          icon: "icon-file-xlsx",
          color: "#0CC0C9"
        },
        xls: {
          icon: "icon-file-xlsx",
          color: "#0CC0C9"
        },
        apk: {
          icon: "icon-file-app",
          color: "#14d78f"
        },
        jpg: {
          icon: "icon-file-img",
          color: "#FF5562"
        },
        jpeg: {
          icon: "icon-file-img",
          color: "#FF5562"
        },
        png: {
          icon: "icon-file-img",
          color: "#FF5562"
        },
        gif: {
          icon: "icon-file-img",
          color: "#FF5562"
        },
        webp: {
          icon: "icon-file-img",
          color: "#FF5562"
        },
        psd: {
          icon: "icon-file-img",
          color: "#FF5562"
        },
        other: {
          icon: "icon-file-other",
          color: "#786565"
        }
      },
      // Ajax: {
      //   get: function (url, fn) {
      //     // XMLHttpRequest对象用于在后台与服务器交换数据
      //     var xhr = new XMLHttpRequest();
      //     xhr.open('GET', url, true);
      //     xhr.onreadystatechange = function () {
      //       // readyState == 4说明请求已完成
      //       if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
      //         // 从服务器获得数据
      //         fn.call(this, xhr.responseText);
      //       }
      //     };
      //     xhr.send();
      //   },
      //   post: function (url, data, fn, formData) {
      //     var xhr = new XMLHttpRequest();
      //     xhr.open("POST", url, true);
      //     // 添加http头，发送信息至服务器时内容编码类型
      //     if (!formData)
      //       xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      //     xhr.onreadystatechange = function () {
      //       if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      //         fn.call(this, xhr.responseText);
      //       }
      //     };
      //     xhr.send(data);
      //   }
      // },
    }
  },
  methods:{
    joinChat(){
      let _this = this
      joinChat().then(res=>{
        if(res.data.status === 'success'){
          let jsonObj = JSON.parse(JSON.stringify(res.data.data));
          _this.userData = jsonObj.token;
          _this.companyId = _this.userData['companyId'];
          _this.deptId = _this.userData['deptId'];
          document.getElementById("windowBox").style.display = "flex";
          document.getElementsByClassName("user-list-header-nickname")[0].innerText = _this.userData['userName'];
          _this.chatRoomControl();//初始化websocket
          _this.initEnjoy();//加载表情
          _this.loadMessage(document.getElementsByClassName("load-message")[0], true);//加载部门群聊天记录
        }
        else {
          console.log(res.data)
          alert('加入群聊失败，'+res.data.data.errMsg)
        }
      })
    },
    initChatRoomMore(_this){
      _this.ws = new WebSocket( _this.wsAddress + "/chat/room/group/" + _this.userData.userId);

      _this.ws.onopen = function (evt) {  //绑定连接事件
        console.log("群聊通道已接入");
      };

      _this.ws.onmessage = function (evt) {//绑定收到消息事件
        var data = JSON.parse(evt.data);
        _this.handelMessage(data);
      };

      _this.ws.onclose = function (evt) { //绑定关闭或断开连接事件
        //alert("当前聊天通道已断开！");
        location.reload();
      };

      _this.ws.onerror = function (ev) {
        alert("聊天异常！！！");
        location.reload();
      }
    },
    initEnjoy(){
      var enjoy = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "☺", "😇", "😐", "😑", "😶", "😏", "😣", "😥", "😮", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "😒", "😓", "😔", "😕", "😲", "😷", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😬", "😰", "😱", "😳", "😵", "😡", "😠", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "👦", "👧", "👨", "👩", "👴", "👵", "👶", "👱", "👮", "👲", "👳", "👷", "👸", "💂", "🎅", "👰", "👼", "💆", "💇", "🙍", "🙎", "🙅", "🙆", "💁", "🙋", "🙇", "🙌", "🙏", "👤", "👥", "🚶", "🏃", "👯", "💃", "👫", "👬", "👭", "💏", "💑", "👪", "💪", "👈", "👉", "☝", "👆", "👇", "✌", "✋", "👌", "👍", "👎", "✊", "👊", "👋", "👏", "👐", "✍", "👣", "👀", "👂", "👃", "👅", "👄", "💋", "👓", "👔", "👕", "👖", "👗", "👘", "👙", "👚", "👛", "👜", "👝", "🎒", "💼", "👞", "👟", "👠", "👡", "👢", "👑", "👒", "🎩", "🎓", "💄", "💅", "💍", "🌂", "🌹", "🍀", "🍎", "💰", "📱", "🌙", "🍁", "🍂", "🍃", "🌷", "💎", "🔪", "🔫", "🏀", "⚽", "⚡", "👄", "👍", "🔥"]
      var enjoyDom = document.createDocumentFragment()
      var tr = document.createElement("tr");
      for (var i = 1; i <= enjoy.length; i++) {
        (function (i) {
          var td = document.createElement("td");
          td.onmousedown = function () {
            console.log(this)
            var messageBoxSystemMessageC = document.getElementsByClassName("message-box-system-message-c")[0];
            var cursorPositionIndex = this.getPursorPositionIndex();
            var selectionText = this.getSelectionText();
            var oldValue = messageBoxSystemMessageC.value;
            if (messageBoxSystemMessageC === document.activeElement) {
              //选中有内容 内容替换表情
              if (selectionText) {
                //截取光标后的内容
                messageBoxSystemMessageC.value = oldValue.substring(0, cursorPositionIndex) + oldValue.substring(cursorPositionIndex, oldValue.length).replace(selectionText, enjoy[i - 1]);
              } else if (cursorPositionIndex !== undefined) {//没选内容 插入表情
                messageBoxSystemMessageC.value = oldValue.substring(0, cursorPositionIndex) + enjoy[i - 1] + oldValue.substring(cursorPositionIndex, oldValue.length);
              }
            } else {
              messageBoxSystemMessageC.value = oldValue + enjoy[i - 1];
            }
            document.getElementsByClassName("enjoy-view")[0].style.display = "none";
          };
          td.innerText = enjoy[i - 1];
          tr.appendChild(td);
          if (i % 12 === 0) {
            enjoyDom.appendChild(tr);
            tr = document.createElement("tr");
          }
        })(i)
      }
      enjoyDom.appendChild(tr);
      document.getElementById("enjoyViewTable").appendChild(enjoyDom);
    },
    //获取光标位置
    getPursorPositionIndex(){
      var oTxt1 = document.getElementsByClassName("message-box-system-message-c")[0];
      try {
        var cursurPosition = -1;
        if (oTxt1.selectionStart) {
          cursurPosition = oTxt1.selectionStart;
        } else {//IE
          var range = document.selection.createRange();
          range.moveStart("character", -oTxt1.value.length);
          cursurPosition = range.text.length;
        }
      } catch (e) {

      }
      return cursurPosition;
    },
    //获取光标选中的内容
    getSelectionText(){
      if (window.getSelection) {
        return window.getSelection().toString();
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange().text;
      }
      return '';
    },
    showEnjoy(n){
      document.getElementsByClassName("enjoy-view")[0].style.display = ["none", "inline-block"][n];
    },
    chatRoomControl(){
      let _this = this
      _this.wsControllerM = new _this.initChatRoomMore(_this);
    },
    handelMessage(message){
      let _this = this;
      var fn = {
        s0: _this.handelMessageFn.s0,
        s1: _this.handelMessageFn.s1,
        s2: _this.handelMessageFn.s2,
        s3: _this.handelMessageFn.s3,
        s4: _this.handelMessageFn.s4,
        s5: _this.handelMessageFn.s5,
        s6: _this.handelMessageFn.s6
      }["s" + message.type];

      if (message.type === 1 || message.type === 2 || message.type === 5) {//在线用户列表,公司所有用户,强制下线
        fn(message);
      } else if (message.receiveId === "0" && _this.roomUser === null) {//部门群聊消息
        fn(message);
      } else {
        // 1、判断当前active窗口为消息窗口 发送人==房间人 在当前私聊窗口
        if (_this.roomUser !== null && ~~message.launchId === ~~_this.roomUser.userId) {
          fn(message)
        } else if (~~message.launchId !== 0) {//不是系统发送
          var isIn = false;
          for (let i = 0; i < _this.relevantUserList.length; i++) {
            if (_this.relevantUserList[i].userId === ~~message.launchId) {
              isIn = true
            }
          }
          if (!isIn) _this.loadRelevantUser(false)
        }
      }
    },
    HandelMessageFn(_this){
      this.s0 = function (message) {
        let isLogin = false;
        let messageContent;
        if (~~message.launchId === ~~_this.userData.userId) {
          _this.initSuccess = true;
          let split = message.content.split("-");
          _this.sessionId = split[1];
          isLogin = true;
          messageContent = split[0];
          console.log(messageContent);
        }
      };
      this.s1 = function (message) {
        _this.loadRelevantUser(true);
        _this.inLineUserList = JSON.parse(message.content);
        _this.loadSocketUser(1, false);
      };
      this.s2 = function (message) {
        // 获取公司所有用户
        _this.socketUserList = JSON.parse(message.content);
        document.getElementById("user-list-title-count-g").innerText = _this.socketUserList.length;
      };
      this.s3 = function (message) {
        var cDom = document.createElement("span");
        cDom.innerText = message.content;
        //创建时间
        _this.createTimeDom(message);
        _this.preTime = message.createTime;
        _this.messageBoxContent.appendChild(_this.createMessageDom(message, cDom));
        _this.messageBoxContent.scrollTop = _this.messageBoxContent.scrollHeight;
      };
      this.s4 = function (message) {
        const messageImg = document.createElement("img");
        messageImg.className = "message-img";
        messageImg.src = message.content;
        messageImg.onload = function () {
          _this.messageBoxContent.scrollTop = _this.messageBoxContent.scrollHeight;
        };
        _this.createTimeDom(message);
        _this.messageBoxContent.appendChild(_this.createMessageDom(message, messageImg));
      };
      this.s5 = function (message) {
        _this.wsControllerM.ws.close();
        alert("您的账号在其他地方登录，您被强制下线");
      };
      this.s6 = function (message) {
        _this.createTimeDom(message);
        //文件
        const fDom = _this.createFileDom(message);
        _this.messageBoxContent.appendChild(_this.createMessageDom(message, fDom));
        _this.messageBoxContent.scrollTop = _this.messageBoxContent.scrollHeight;
      }
    },
    /**
     * 处理用户列表、
     * n=0部门员工,n=1公司员工
     */
    loadSocketUser(n, b){
      let _this=this;
      let i;
      let inlineNum = 0;
      const userListDom = document.createDocumentFragment();
      const spareInlineUser = {};
      for (i in _this.inLineUserList) {
        inlineNum += 1;
        _this.inLineUserList[i].inline = true;
        spareInlineUser['s' + _this.inLineUserList[i].userId] = _this.inLineUserList[i];
      }
      //在线提前
      let socketUserListSpare = JSON.parse(JSON.stringify(n === 0 ? _this.relevantUserList : _this.socketUserList));
      const inlineArr = [];
      const offlineArr = [];
      for (i = 0; i < socketUserListSpare.length; i++) {
        if (spareInlineUser['s' + socketUserListSpare[i].userId]) {
          inlineArr.push(spareInlineUser['s' + socketUserListSpare[i].userId]);
        } else {
          offlineArr.push(socketUserListSpare[i]);
        }
      }
      socketUserListSpare = inlineArr.concat(offlineArr);

      let bb = false;
      for (i = 0; i < socketUserListSpare.length; i++) {
        (function (i) {
          const item = document.createElement("div");
          item.className = "user-list-header user-list-item";
          item.setAttribute("uData", JSON.stringify(socketUserListSpare[i]));
          item.onclick = _this.switchChatRoom(item);
          const text = document.createElement("div");
          text.className = "user-list-header-txt";
          const nickname = document.createElement("p");
          nickname.className = "user-list-header-nickname user-list-item-header-nickname";
          nickname.innerText = socketUserListSpare[i].userName;
          text.appendChild(nickname);
          item.appendChild(text);
          const statusTag = document.createElement("span");
          if (socketUserListSpare[i].inline) {//添加在线标签
            statusTag.className = "status-tag inline-tag";
            statusTag.innerText = "在线"
          } else {
            statusTag.className = "status-tag";
            statusTag.innerText = "离线"
          }
          item.appendChild(statusTag);
          // 聊天选中
          if (_this.roomUser !== null && ~~socketUserListSpare[i].userId === ~~_this.roomUser.userId && !bb) {
            // document.getElementsByClassName("user-list-header user-list-item active-u-l")[0].classList.remove("active-u-l");
            // item.classList.add("active-u-l");
            if (!b) _this.setInitRoom();
            bb = true;
            _this.roomUser = socketUserListSpare[i];
          }
          userListDom.appendChild(item);
        })(i)
      }

      if (n === 0) {
        document.getElementsByClassName("user-list-items-relevant")[0].innerHTML = "";
        document.getElementsByClassName("user-list-items-relevant")[0].appendChild(userListDom);
      } else {
        document.getElementsByClassName("user-list-items-all")[0].innerHTML = "";
        document.getElementsByClassName("user-list-items-all")[0].appendChild(userListDom);
        document.getElementById("inline-user-u").innerText = inlineNum.toString();
      }
    },
    // 处理部门联系人用户列表
    loadRelevantUser(b){
      console.log(this)
      let id = this.userData.userId;
      let _this=this;
      getSocketUserRelevant(id).then(res=>{
        if(res.data.status === 'success'){
          let e = JSON.parse(JSON.stringify(res.data.data));
          //console.log(e)
          _this.relevantUserList = e;
          document.getElementById("user-list-title-count-g").innerText = (_this.relevantUserList.length + 1).toString();
          if (_this.relevantUserList.length > 0) {
            _this.loadSocketUser(0, b)
          } else {
            //无部门联系人
            document.getElementsByClassName("user-list-items-relevant")[0].innerHTML = "<p class='data-empty'>无部门联系人</p>"
          }
        }
        else {
          console.log(res.data)
          alert('获取部门联系人用户列表失败，'+res.data.data.errMsg)
        }
      })
    },
    //点击发送信息
    sendMessage() {
      if (!this.initSuccess) return;
      const contentDom = document.getElementsByClassName("message-box-system-message-c")[0];
      const val = contentDom.value;
      if (val.trim() === "") return;
      const message = {
        launchId: this.sessionId,
        receiveId: this.roomUser ? this.roomUser.socketId : -1,
        content: val,
        type: 3
      };
      //私聊
      if (this.roomUser !== null) {
        message.static = true;
        message.createTime = new Date().getTime();
        this.handelMessageFn.s3(message);
        if (!this.roomUser.inline) {
          message.type = 30;
          // 不在线 提交用户id
          message.receiveId = this.roomUser.userId
        }
        this.wsControllerM.ws.send(JSON.stringify(message));
      } else {
        //群聊
        message.deptId = this.deptId;
        message.companyId = this.companyId;
        this.wsControllerM.ws.send(JSON.stringify(message));
      }
      contentDom.value = ""
    },
    /**
     * 发送文件
     * n=0发送图片
     * n=1发送文件
     */
    sendFile(e, n) {
      if (!this.initSuccess) return alert("请在初始化成功后再发送");
      if (this.uploadIng) return alert("当前队列正在上传文件，请稍后再发送");
      const file = e.files[0];
      if (file.size > 8388608) return alert("发送文件大小不能超过8M");
      this.uploadIng = true;
      const formData = new FormData();
      formData.append("file", file);
      const typeObj = [["image", 4], ["file", 6]][n];
      uploadImage(file).then(res=>{
        if(res.data.status === 'success'){
          const message = {
            launchId: this.sessionId,
            receiveId: this.roomUser ? this.roomUser.socketId : -1,
            content: e.data,
            type: typeObj[1]
          };
          if (this.roomUser == null) {
            // 群聊
            message.deptId = this.deptId;
            message.companyId = this.companyId;
            this.wsControllerM.ws.send(JSON.stringify(message))
          } else {
            //私聊
            message.createTime = new Date().getTime();
            message.static = true;
            this.handelMessageFn['s' + typeObj[1]](message);
            if (!this.roomUser.inline) {
              message.type = 40;
              // 不在线 提交用户id
              message.receiveId = this.roomUser.userId;
            }
            this.wsControllerM.ws.send(JSON.stringify(message));
          }
        }else{
          alert("发送失败" + e.data.errMsg);
        }
      })
    },
    /**
     * 判断最后一个消息距离接收以及发送的消息事件判断是否显示发送时间
     */
    createTimeDom(message){
      const messageItems = document.getElementsByClassName("message-item");
      if (messageItems.length === 0 || message.createTime - this.preTime > 300000 || cTime()) {
        const timeDom = document.createElement("p");
        timeDom.className = "message-system";
        timeDom.innerText = this.timeChange(message.createTime);
        this.messageBoxContent.appendChild(timeDom);
      }

      function cTime() {
        let t = 0;
        if (messageItems.length > 0) {
          t = messageItems[messageItems.length - 1].getAttribute("t");
          return message.createTime - t > 300000;
        }
        return false;
      }
    },
    /**
     加载历史消息
     对方roomUser，自己roomUser
     */
    loadMessage(that, isScroll){
      const loadNode = that;
      that.parentNode.removeChild(that);
      const params = {
        date: new Date(this.loadTime),
        launchId: null,
        receiveId: null,
        companyId: null,
        deptId: null
      };
      params.date=params.date.getFullYear() + '-' + (params.date.getMonth() + 1) + '-' + params.date.getDate() + ' '
        + params.date.getHours() + ':' + params.date.getMinutes() + ':' + params.date.getSeconds();
      if (this.roomUser !== null) {
        params.launchId = this.userData.userId;
        params.receiveId = this.roomUser.userId;
      } else {
        params.companyId = this.companyId;
        params.deptId = this.deptId;
      }
      let _this=this;
      getSocketMessageByDate(params.date,params.launchId,params.receiveId,params.companyId,params.deptId).then(res=>{
        if(res.data.status === 'success'){
          var e = JSON.parse(JSON.stringify(res.data.data));
          const messigeList = e;
          if (messigeList.length > 0) {
            const domBox = document.createDocumentFragment();
            domBox.appendChild(loadNode);
            for (let i = messigeList.length - 1; i >= 0; i--) {
              // 时间
              if ((i > 0 && messigeList[i - 1].createTime - messigeList[i].createTime > 300000) || i === messigeList.length - 1) {
                const timeDom = document.createElement("p");
                timeDom.className = "message-system";
                timeDom.innerText = _this.timeChange(messigeList[i].createTime);
                domBox.appendChild(timeDom)
              }
              if (messigeList[i].type === 0) {
                const messageSystem = document.createElement("div");
                messageSystem.className = "message-system";
                messageSystem.innerText = messigeList[i].content;
                domBox.appendChild(messageSystem)
              } else {
                let cDom;
                if (messigeList[i].type === 3) {
                  cDom = document.createElement("span");
                  cDom.innerText = messigeList[i].content;
                } else if (messigeList[i].type === 4) {
                  cDom = document.createElement("img");
                  cDom.className = "message-img";
                  cDom.src = messigeList[i].content;
                  cDom.onload = function () {
                    if (isScroll)
                      _this.messageBoxContent.scrollTop = _this.messageBoxContent.scrollHeight;
                  }
                } else if (messigeList[i].type === 6) {
                  //文件
                  cDom = _this.createFileDom(messigeList[i]);
                }
                domBox.appendChild(_this.createMessageDom(messigeList[i], cDom));
              }
            }
            const messageBoxContentH = _this.messageBoxContent.scrollHeight;
            _this.messageBoxContent.insertBefore(domBox, _this.messageBoxContent.childNodes[0]);
            _this.messageBoxContent.scrollTop = _this.messageBoxContent.scrollHeight - messageBoxContentH;


            that.style.display = "block";
            _this.loadTime = messigeList[messigeList.length - 1].createTime;
          }
        }else {
          console.log(res.data);
          alert('加入群聊失败，'+res.data.data.errMsg);
        }
      })
    },
    // 创建聊天信息dom
    createMessageDom(message, cDom){
      const messageItem = document.createElement("div");
      messageItem.setAttribute("t", message.createTime);
      const messageItemU = document.createElement("div");
      messageItemU.className = "message-item-u";

      const content = document.createElement("div");
      content.className = "message-item-content";

      const bubble = document.createElement("div");
      bubble.className = "message-item-content-bubble";
      if (cDom)
        bubble.appendChild(cDom);

      content.appendChild(bubble);
      if (message.launchId === this.userData.userId || message.static) {
        messageItem.className = "message-item right";
        messageItemU.appendChild(content)
      } else {
        messageItem.className = "message-item left";
        const nickname = document.createElement("p");
        nickname.className = "message-item-content-nickname";
        nickname.innerText = message.launchUserName;
        content.insertBefore(nickname, content.childNodes[0]);
        messageItemU.appendChild(content)
      }
      messageItem.appendChild(messageItemU);
      return messageItem
    },
    createFileDom(message){
      const fileSuf = this.getFileType(message.content);
      const fileType = this.fileTypeObj[fileSuf] || this.fileTypeObj.other;
      const messageFile = document.createElement("a");
      messageFile.target = "_blank";
      messageFile.className = "file-msg-box";
      messageFile.href = message.content;

      const iconBox = document.createElement("div");
      iconBox.className = "file-msg-box-icon";

      const icon = document.createElement("span");
      icon.className = fileType.icon + " iconfont";
      icon.style.color = fileType.color;
      iconBox.appendChild(icon);
      const link = document.createElement("div");
      link.className = "file-msg-box-link";
      link.innerText = message.content;
      messageFile.appendChild(iconBox);
      if (message.launchId === this.userData.userId || message.static) {
        messageFile.appendChild(link)
      } else {
        messageFile.insertBefore(link, messageFile.childNodes[0])
      }
      return messageFile
    },
    getFileType(fileStr) {
      return fileStr.substring(fileStr.lastIndexOf(".") + 1, fileStr.length);
    },
    /**

    */
    switchChatRoom(item) {
      const uData = JSON.parse(item.getAttribute("uData"));

      if (uData.userId === this.userData.userId) return;
      this.roomUser = uData;
      // const x = document.getElementsByClassName("active-u-l")[0];
      // console.log(x);
      // document.getElementsByClassName("active-u-l")[0].classList.remove("active-u-l");
      // item.classList.add("active-u-l");
      document.getElementsByClassName("message-box-title")[0].innerText = this.roomUser.userName;
      this.setInitRoom();
      this.hiddenUserListPopup();
    },
    // 群聊切换
    switchChatRoomGroup(that) {
      document.getElementsByClassName("active-u-l")[0].classList.remove("active-u-l");
      that.classList.add("active-u-l");
      this.roomUser = null;
      this.setInitRoom();
      this.hiddenUserListPopup();
    },
    setInitRoom() {
      let _this=this;
      const loadDom = document.createElement("div");
      loadDom.innerText = "加载更多";
      loadDom.className = "load-message";
      loadDom.onclick = function (ev) {
        this.loadMessage(this, false)
      };
      const iconDom = document.createElement("span");
      iconDom.className = "iconfont icon-time";
      loadDom.insertBefore(iconDom, loadDom.childNodes[0]);

      this.messageBoxContent.innerHTML = "";
      setTimeout(function () {
        _this.messageBoxContent.appendChild(loadDom);
        _this.loadTime = new Date().getTime();
        _this.preTime = new Date().getTime();
        _this.loadMessage(document.getElementsByClassName("load-message")[0], true)
      }, 200)
    },
    timeChange(time) {
      const thisTime = new Date().getTime();
      const timeObj = new Date(time);
      const hours = timeObj.getHours();
      const minutes = timeObj.getMinutes();
      const timeStr = (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes);
      // 今天凌晨的时间
      const thisTime0 = new Date(new Date(thisTime).setHours(0, 0, 0, 0)).getTime();
      // 需要转换的时间的凌晨时间
      const time0 = new Date(new Date(time).setHours(0, 0, 0, 0)).getTime();
      // 相差天数
      const dayDiff = Math.floor((thisTime0 - time0) / 86400000);

      if (dayDiff === 0) {
        return timeStr
      } else if (dayDiff === 1) {
        return "昨天 " + timeStr
      } else if (dayDiff === 2) {
        return "前天" + timeStr
      } else {
        const month = timeObj.getMonth();
        const day = timeObj.getDate();
        return timeObj.getFullYear() + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day) + " " + timeStr
      }
    },
    showUserListPopup() {
      //document.getElementsByClassName("web03")[0].classList.add("mobile")
    },
    hiddenUserListPopup() {
      //document.getElementsByClassName("web03")[0].classList.remove("mobile")
    },
    switchUserListTab(n) {
      const userListTab = document.getElementsByClassName("user-list-tab")[0].getElementsByTagName("div");
      if (!userListTab[0].classList.contains("user-list-tab-on")) {
        if (n === 0) this.loadRelevantUser(true)
      } else {
        //设置选中
        const userListItemsAll = document.getElementsByClassName("user-list-items-all")[0].getElementsByClassName("user-list-item");
        for (let i = 0; i < userListItemsAll.length; i++) {
          const userItem = JSON.parse(userListItemsAll[i].getAttribute("uData"));
          if (this.roomUser !== null && userItem.userId === this.roomUser.userId) {
            document.getElementsByClassName("active-u-l")[0].classList.remove("active-u-l");
            userListItemsAll[i].classList.add("active-u-l");
            break
          }
        }
      }
      document.getElementsByClassName("user-list-tab-on")[0].classList.remove("user-list-tab-on");
      userListTab[n].classList.add("user-list-tab-on");
      document.getElementsByClassName("user-list-items-relevant")[0].style.display = ["block", "none"][n];
      document.getElementsByClassName("user-list-items-all")[0].style.display = ["none", "block"][n]
    },
  },


  mounted(){
    this.joinChat();
    this.handelMessageFn=new this.HandelMessageFn(this)
    this.messageBoxContent = document.getElementsByClassName("message-box-content")[0];

  }
}
</script>

<style scoped>
@import "../assets/css/chat.css";
@import "../assets/css/iconfont.css";
</style>
