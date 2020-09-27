// pages/tomato/tomato.js
import { http } from '../../lib/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:1500,
    showTime:'',
    timer:null,
    timerStatus:true,
    visible:false,
    isshowAgain:false,
    finshconfirmVisible:false,
    tomatoes:[
      {id:1,content:'学习真好',completed:false,created_at:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString()},
      {id:2,content:'吃饭真好',completed:true,created_at:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString()}
    ],
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
  changeTime(){
    let m = Math.floor(this.data.time / 60)
    let s =  Math.floor(this.data.time % 60)
    if(s === 0){
      s = "00"
    }
    if((s+'').length === 1){
      s = "0" + s
    }
    if((m+"").length === 1){
      m = "0" + m
    }
    this.setData({showTime:`${m}:${s}`})
  },
  timerStart(){
    this.setData({timerStatus:false})
    this.data.timer = setInterval(() => {
      this.data.time = this.data.time - 1
      this.changeTime()
      //时间结束
      if(this.data.time === 0){
        this.setData({isshowAgain:true})
        this.setData({finshconfirmVisible:true})
        return this.clearTimer()
      }
    },1000)
  },
  clearTimer(){
    clearInterval(this.data.timer)
    this.setData({timerStatus:true})
  },
  showConfirm(){
    this.clearTimer()
    this.setData({visible:true})
  },
  //放弃时确认框
  confirmAbandon(event){
    let content =  event.detail
    let newTomatoes = {id:this.data.tomatoes.length + 1,content,completed:false,created_at:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString()}
    this.data.tomatoes.push(newTomatoes)
    this.setData({tomatoes:this.data.tomatoes})
    this.setData({visible:false})
    wx.navigateBack({ to: -1 })
    // http.put(`/tomatoes/${this.data.tomato.id}`,{
    //   description: content,
    //   aborted: true
    // }).then(response => {
    //   console.log(response)
    //   wx.navigateBack({ to: -1 })
    // })
  },
  confirmCancel(){
    this.timerStart()
    this.setData({visible:false})
  },
  //再来一次
  againTimer(){
    this.setData({isshowAgain:false})
    this.setData({time:1500})
    this.changeTime()
  },
  //完成时确认框
  confirmFinsh(event){
    let content =  event.detail
    console.log(content)
    let newTomatoes = {id:this.data.tomatoes.length + 1,content,completed:true,created_at:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString()}
    this.data.tomatoes.push(newTomatoes)
    this.setData({tomatoes:this.data.tomatoes})
    this.setData({finshconfirmVisible:false})
  },
  confirmHide(event){
    this.setData({finshconfirmVisible:false})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.changeTime()
    // http.post('/tomatoes').then(res => {
    //   this.setData({tomato: res.response.data.resource })
    //   console.log(this.data.tomato)
    // })
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
    wx.setStorage({
      key:"tomatoes",
      data:this.data.tomatoes
    })

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