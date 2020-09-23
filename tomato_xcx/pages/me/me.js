// pages/me/me.js
import { http } from '../../lib/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:"tomato",
    lists:{},
    tomatoes:{},
    me:{}
  },
  changeTab(event){
    let name = event.currentTarget.dataset.name
    this.setData({tab:name})
  },
  fetchTomatoes(){
    http.get(`/tomatoes`).then(res => {
      this.setData({tomatoes:res.response.data.resources})
      console.log(res.response.data.resources)
    })
  },
  fetchList(){
    http.get(`/todos`,{
      is_group:"yes"
    }).then(res => {
      this.setData({lists:res.response.data.resources})
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
   this.fetchTomatoes()
   this.fetchList()
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