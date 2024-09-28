const app = getApp() // 全局APP
let that = null // 页面this指针
Page({
  data: {
    info: {
      start: {
        title: '我们的婚礼', // 活动名称
        local: '四川·成都', // 地点
        time: '2024/10/ 1', // 时间
        hold: '边正元 & 倪佳艺' // 下方的举办方
      },
      invite: {
        title: '尊敬的朋友：', // 邀请对象
        text: ''
      },
      meeting: [{ // 活动流程
        time: '11:30',
        text: '接新娘 + 合影敬茶'
      }, {
        time: '12:00',
        text: '吃午餐（简餐）'
      }, {
        time: '13:00',
        text: '自由活动（打麻将、喝茶、桌游等）'
      }, {
        time: '15:30',
        text: '游园会开始'
      }, {
        time: '17:50',
        text: '婚宴就位 '
      }],
      address1: {
        point: [30.583448, 104.158269], // 地图展示的中心点
        marker: { // 地图当前标记点
          id: 0, // 标记点ID，不用变更
          latitude: 30.583448, // 标记点所在纬度
          longitude: 104.158269, // 标记点所在经度
          iconPath: '../../images/success.svg', // 标记点图标，png或jpg类型
          width: '40', // 标记点图标宽度
          height: '48' // 标记点图标高度
        },
        local: '白泽·white palace 三圣乡店', // 地址
        time: '2024年10月1日', // 举办时间
        tel: '173 8062 1168' // 联系电话
      },

      address2: {
        point: [30.582632, 104.160859], // 地图展示的中心点
        marker: { // 地图当前标记点
          id: 0, // 标记点ID，不用变更
          latitude: 30.582632, // 标记点所在纬度
          longitude: 104.160859, // 标记点所在经度
          iconPath: '../../images/success.svg', // 标记点图标，png或jpg类型
          width: '40', // 标记点图标宽度
          height: '48' // 标记点图标高度
        },
        local: '成都开心木屋住宿', // 地址
        tel: '131 9815 2761' // 联系电话
      },
    },
    animationData: {},
    isOpened : false,
    runAnimator : true,
    openCard: false,
  },
  /**
   * 页面加载
   */
  onLoad () {
    that = this // 页面this指向指针变量
    const { windowHeight, windowWidth } = wx.getSystemInfoSync() // 获取系统屏幕信息
    that.setData({
      noserver: (windowWidth / windowHeight) > 0.6 // 如果宽高比大于0.6，则差不多平板感觉，不适合邀请函的UI
    })
  },


  onReady () {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = "http://163cn.tv/xH1GPr4"; // 设置音频资源的路径
    // innerAudioContext.src = getApp().globalData.musicSrc; // 设置音频资源的路径
    innerAudioContext.onPlay(() => { // 监听播放事件
    console.log('开始播放了');
    });
    innerAudioContext.onError((res) => { // 监听错误事件
    console.log(res.errMsg);
    console.log(res.errCode);
    });
    innerAudioContext.play(); // 开始播放音乐
  },
  /**
   * 导航白泽
   * @param {*} e 页面信息
   */
  getLocation1(e) {
    wx.openLocation({
      latitude: 30.582632, // 标记点所在纬度
      longitude: 104.160859, // 标记点所在经度
      name: '白泽·white palace 三圣乡店', // 地点名称
      address: '锦江区银杏树水岸花苑旁', // 地址的详细说明
      scale: 18, // 缩放比例
      success: function(res) {
         console.log('打开地图成功');
      },
      fail: function(err) {
         console.log('打开地图失败', err);
      }
   });
  },
  /**
   * 导航住宿
   * @param {*} e 页面信息
   */
  getLocation2(e) {
    wx.openLocation({
      latitude: 30.582632, // 标记点所在纬度
      longitude: 104.160859, // 标记点所在经度
      name: '成都开心木屋住宿', // 地点名称
      address: '锦江区三圣乡红砂村一组', // 地址的详细说明
      scale: 18, // 缩放比例
      success: function(res) {
         console.log('打开地图成功');
      },
      fail: function(err) {
         console.log('打开地图失败', err);
      }
   });
  },

    call_1(e) {
      wx.makePhoneCall({
        phoneNumber: '17380621168',
      });
    },

    call_2(e) {
      wx.makePhoneCall({
        phoneNumber: '13198152761',
      });
    },

    click_invitation_card(e) {
      this.setData({
        runAnimator:false,
      })
    },

    onCoverAnimationEnd() {
      console.log("onCoverAnimationEnd");
      this.setData({
        coverAnimationEnd:true,
      })
    },

    onAnimationEnd() {
      console.log("onAnimationEnd");
      wx.redirectTo({
        url: '/pages/main/main',
      })
    },

    doOpenCard(e) {
      console.log("doOpenCard");
      this.setData({
        isOpened:true,
      });
    }
}) 
