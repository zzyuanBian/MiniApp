// pages/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedule: false,
    location_reset: false,
    location_banquet: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("onLoad");
    wx.enableAlertBeforeUnload({
      message: 'message',
    })
  },

  onUnload(options) {
    console.log("onUnload");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  onClickSchedule(e) {
    this.setData({
      schedule: true,
    })
  },

  onClickRest(e) {
    this.setData({
      location_reset: true,
    })
  },

  onClikBanquet(e) {
    this.setData({
      location_banquet: true,
    })
  },

  onClickGames(e) {
    this.setData({

    })
  },

  onClcikChengdu(e) {
    this.setData({

    })
  },
})