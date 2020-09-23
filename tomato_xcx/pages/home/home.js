// pages/home/home.js
import { http } from '../../lib/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data:{
    list:[],
    visible: false,
    visibleUpdate:false,
    id:0,
    index:null
  },
  confirmCreate(event){
    let content = event.detail
    //提交数据库
    if(content){
      http.post("/todos",{
        completed: false, description: content
    }).then(res => {
        let todo = [res.response.data.resource]
        this.data.list = todo.concat(this.data.list)
        this.setData({list:this.data.list})
        this.cancel()
      },rec => {
        console.log("push失败")
      })
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
    http.put(`/todos/${id}`,{
      completed:true
    }).then(res => {
      console.log(res.response.data.resource)
      let todo = res.response.data.resource
      this.data.list[index] = todo
      this.setData({list:this.data.list})
    })
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
    http.put(`/todos/${id}`,{
      description:content
    }).then(res => {
      console.log(res.response.data.resource)
      let todo = res.response.data.resource
      this.data.list[this.data.index] = todo
      this.setData({list:this.data.list})
    })
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
    http.get('/todos?completed=false').then(res => {
      this.setData({list:res.response.data.resources})
    })
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