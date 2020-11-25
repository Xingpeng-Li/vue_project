<template>
  <div class="web03">
<!--    <nav class="navbar ">-->
<!--      <div class="container-fluid">-->
<!--        <div class="navbar-header">-->
<!--          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">-->
<!--            <span class="sr-only">Toggle navigation</span>-->
<!--            <span class="icon-bar"></span>-->
<!--            <span class="icon-bar"></span>-->
<!--            <span class="icon-bar"></span>-->
<!--          </button>-->
<!--          <a class="navbar-brand" href="#">喵武办公</a>-->
<!--        </div>-->

<!--        &lt;!&ndash; Collect the nav links, forms, and other content for toggling &ndash;&gt;-->
<!--        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">-->
<!--          <ul class="nav navbar-nav">-->
<!--            <li><a href="index.html">首页</a></li>-->
<!--            <li ><a href="addressBook.html">通讯录</a></li>-->
<!--            <li><a href="joinVideo.html" target="_blank">会议</a></li>-->
<!--            <li ><a href="">云空间</a></li>-->
<!--            <li ><a href="message.html">消息</a></li>-->
<!--            <li ><a href="announcement.html">公告栏</a></li>-->
<!--            <li ><a class="active" href="chatRoom.html">聊天</a></li>-->
<!--            <li><a href="PublicAccount.html">公众号</a></li>-->
<!--            <li><a href="otherFunctions.html">应用</a></li>-->
<!--          </ul>-->
<!--          <ul class="nav navbar-nav navbar-right">-->
<!--            <li><a href="#" id="logout">登出</a></li>-->
<!--          </ul>-->

<!--        </div>&lt;!&ndash; /.navbar-collapse &ndash;&gt;-->
<!--      </div>&lt;!&ndash; /.container-fluid &ndash;&gt;-->
<!--    </nav>-->
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
          <img src="images/group.png"
               alt="">
          群聊(<span id="user-list-title-count-g">0</span>)
        </div>
        <div class="user-list-group">
          <div class="user-list-header user-list-item active-u-l" onclick="switchChatRoomGroup(this)">
            <div class="user-list-header-avatar user-list-item-header-avatar">
              <img src="images/qunliao.jpeg"
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
              <img src="images/menu-img.png"
                   alt="发送图片" class="message-box-system-menu-icon">
              <input type="file" onchange="sendFile(this,0)" accept="image/*" title="选择发送图片"/>
            </div>
            <div class="message-box-system-menu-img" style="top:2px;">
              <img src="images/menu-file.png"
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
  </div>
</template>

<script>
export default {
  name: "ChatRoom"
}
</script>

<style scoped>
@import "../assets/css/chat.css";
</style>
