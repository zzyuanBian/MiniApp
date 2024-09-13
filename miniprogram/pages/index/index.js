const app = getApp() // 全局APP
let that = null // 页面this指针
Page({
  data: {
    spage: 0, // 切换页面开始，勿改
    epage: 0, // 切换页面结束，勿改
    status: 0, // 报名状态
    form: {}, // 报名信息填写
    info: {
      start: {
        title: '我们的婚礼', // 活动名称
        local: '四川·成都', // 地点
        time: '2024/10/ 1', // 时间
        hold: '边正元 & 倪佳艺' // 下方的举办方
      },
      invite: {
        title: '尊敬的朋友：', // 邀请对象
        text: '一年一度的小程序云开发技术峰会即将于2020年11月29日在北京隆重举行。回顾这一年，云开发继续深化丰富基础能力，提供高可用、自动弹性扩缩的后端云服务，包含计算、存储、托管等 serverless 化能力，为广大小程序开发者切实降低开发门槛与实现成本，并且新增支持环境共享、公众号云开发、静态网站、云托管、微信支付等多项重磅新能力。特邀请你参与此次峰会，共同探讨云开发的发展策略，共同进步！'
      },
      meeting: [{ // 活动流程
        time: '12:00-13:00',
        text: '柴火鸡'
      }, {
        time: '13:30-14:00',
        text: '合影+敬茶'
      }, {
        time: '14:00-14:15',
        text: '到婚宴地点'
      }, {
        time: '15:30 - 17:50',
        text: '游园会'
      }, {
        time: '17:50 - 20:00',
        text: '婚宴'
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
    }
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
    that.init() // 初始化
  },
  /**
   * 初始化加载信息
   */
  async init () {
    const result = await app.call({ name: 'get' }) // 调用云函数，获取当前用户报名状态
    that.setData({
      status: result // 将状态存入data，0-未报名，1-审核中，2-报名成功
    })
  },
  /**
   * 覆盖全局的上下页切换，用于地图和表单组件中，禁用全局上下翻页
   * @param {*} e 页面信息
   */
  changeno (e) {
    if (e.type === 'begin' || e.type === 'touchstart') { // 如果触发状态为触摸开始，或者地图移动开始
      that.no = true // 设置不干预变量为true
    } else if (e.type === 'end' || e.type === 'touchend') { // 如果触发状态未触摸结束，或地图移动结束
      setTimeout(function () { // 延迟100ms设置，防止低端机型的线程强占
        that.no = false // 设置不干预变量为false
      }, 100)
    }
  },
  /**
   * 上下翻页
   * @param {*} e 页面信息
   */
  movepage (e) {
    if (that.no === true) return // 如果不干预变量为true，说明禁用翻页
    const { clientY } = e.changedTouches[0] // 获取触摸点Y轴位置
    if (e.type === 'touchstart') { // 如果是触摸开始
      that.startmove = clientY // 记录一下开始点
    }
    if (e.type === 'touchend') { // 如果是触摸结束
      let { epage } = that.data // 获取data中的结束页
      const spage = that.data.epage // 将结束页传给开始页，要从这里动作
      if (that.startmove > clientY) { // 如果触摸点比初次高
        if (epage < 4) epage++ // 在结束页小于4时加1，因为一共就5页 [0, 1, 2, 3, 4]
      } else if (that.startmove < clientY) { // 如果触摸点比初次低

        if (epage === 2) epage = 0; 

        if (epage > 0) epage-- // 在结束页大于0时减1
      }
      if (spage !== epage) { // 如果初始页和结束页相同，则证明翻到底了，不同才要改变
        that.setData({ // 更新存储
          spage: spage,
          epage: epage
        })
      }
    }
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
    }
})
