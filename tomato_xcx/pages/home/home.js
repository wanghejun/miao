// pages/home/home.js
import { http } from '../../lib/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data:{
    list:[
      {id:1,description:"吃饭",completed:false,created_at:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString(),isShow:true},
      {id:2,description:"睡觉",completed:false,created_at:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString(),isShow:true},
      {id:3,description:"打豆豆",completed:true,created_at:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString(),isShow:false},
    ],
    visible: false,
    visibleUpdate:false,
    id:0,
    index:null
  },
  tomatoStart(){
    wx.vibrateLong({
      success: res => {
          console.log('颤抖')
      },
      fail: err => {
          console.log('我就问你为什么不抖动了')
      }
    })
  },
  confirmCreate(event){
    let content = event.detail.trim()
    //提交数据库
    // if(content){
    //   http.post("/todos",{
    //     completed: false, description: content
    // }).then(res => {
    //     let todo = [res.response.data.resource]
    //     this.data.list = todo.concat(this.data.list)
    //     this.setData({list:this.data.list})
    //     this.cancel()
    //   },rec => {
    //     console.log("push失败")
    //   })
    // }

    //本地存储
    // wx.setStorageSync('list', this.data.list)
    if(content){
      let newTodo = {id:this.data.list.length + 1,description:content,completed:false,created_at:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString(),isShow:true}
      this.data.list.unshift(newTodo)
      this.setData({list:this.data.list})
    }
    //隐藏对话框
    this.setData({visible:false})
  },

  cancel(event){
    this.setData({visible:false})
  },
  deletList(event){
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    // http.put(`/todos/${id}`,{
    //   completed:true
    // }).then(res => {
    //   console.log(res.response.data.resource)
    //   let todo = res.response.data.resource
    //   this.data.list[index] = todo
    //   this.setData({list:this.data.list})
    // })

    this.data.list[index].completed = true
    this.setData({list:this.data.list})

    this.animate(`.item.id${this.data.list[index].id}`, [
      { opacity: 1.0},
      { opacity: 0.5},
      { opacity: 0},
    ], 500)
    setTimeout(()=>{
      this.data.list[index].isShow = false
      this.setData({list:this.data.list})
    },500)
  },
  btnClick(){
    this.setData({visible:true})
  },
  changeText(event){
    let content = event.currentTarget.dataset.content

    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    this.setData({id:id})
    this.setData({index:index})

    this.setData({visibleUpdate:true})
  },
  confirmUpdate(event){
    let content = event.detail
    let id = this.data.id
    // http.put(`/todos/${id}`,{
    //   description:content
    // }).then(res => {
    //   console.log(res.response.data.resource)
    //   let todo = res.response.data.resource
    //   this.data.list[this.data.index] = todo
    //   this.setData({list:this.data.list})
    // })
    this.data.list[this.data.index].description = content
    this.setData({list:this.data.list})

    this.cancelUpdate()
  },
  cancelUpdate(){
    this.setData({visibleUpdate:false})
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
    //数据展示
    // http.get('/todos?completed=false').then(res => {
    //   this.setData({list:res.response.data.resources})
    // })

    try {
      var value = wx.getStorageSync('list')
      if (value) {
        let data = value
        this.setData({list:data})
      }
    } catch (e) {
      // Do something when catch error
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //离开时保存数据
    wx.setStorage({
      key:"list",
      data:this.data.list
    })

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