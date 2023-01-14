// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',//导航标识
    videoList:[],
    videoUrlList:[],
    isTriggered:false,
    offset:0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData();
  },

  // 获取视频导航数据
  async getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList:videoGroupListData.data.slice(0,14),
      navId:videoGroupListData.data[0].id
    })

    this.getVideoList(this.data.navId,this.data.offset)
  },

  async getVideoList(navId,offset){
    let videoListData = await request('/video/group',{id:navId,offset});
    this.setData({
      videoList: videoListData.datas
    })
    
  

    let num=0
    let videoUrlDataList =[];
    while(this.data.videoList&& num<this.data.videoList.length ){
    let videoUrlData = await request('/video/url',{id:this.data.videoList[num].data.vid})
     videoUrlDataList.push(videoUrlData.urls[0].url)
      num++
    }
    wx.hideLoading();
    this.setData({
      videoUrlList:videoUrlDataList,
      isTriggered:false
    })
  },

  //  下拉刷新
  handleRefresher(){
    this.getVideoList(this.data.navId,0);
  },

  // 上拉触底
  async handleToLower(){
    let offset = this.data.offset+1;
    this.setData({
      offset
    })
    this.getVideoList(this.data.navId,this.data.offset)
  },

  // 点击播放!!!!!!
  handlerPlay(event){
    let vid = event.currentTarget.id;
    this.vid != vid && this.videoContext?.pause();
    this.vid = vid;
    this.videoContext = wx.createVideoContext(vid)
    
  },

  changeNav(event){
    let navId = event.currentTarget.id;
    this.setData({
      navId,
      videoUrlList:[],
      offset:0
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.getVideoList(this.data.navId,this.data.offset);
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