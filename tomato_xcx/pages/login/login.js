// pages/login/login.js
import { http } from '../../lib/http.js'
const { app_id, app_secret } = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },  
  login(e){
    let encrypted_data = e.detail.encryptedData
    let iv = e.detail.iv
    let code
    wx.login({
      //发送登录请求
      // success(res){
      //   code = res.code
      //   http.post("/sign_in/mini_program_user",{
      //     code,
      //     iv,
      //     encrypted_data,
      //     app_id,
      //     app_secret  
      //   }).then(res => {
      //     wx.setStorageSync('me', res.response.data.resource)
      //     wx.setStorageSync('X-token', res.response.header['X-token'])
      //     wx.reLaunch({
      //       url: '/pages/home/home',
      //     })
      //   },rec => {
      //     console.log("登陆失败")
      //   })
      // }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})