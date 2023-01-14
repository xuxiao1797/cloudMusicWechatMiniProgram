// pages/index/index.'js'
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList :[],//轮播图
    recommendList:[], //推荐歌单
    topList:[] //排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //获取轮播图
    let bannerListData = await request('/banner',{type:2})
    
    //获取推荐歌单
    let recommendListData = await request('/personalized',{limit:10})

    let index = 0;
    let resultArr =[];
    while(index <5){
      let topListData = await request('/toplist/detail')
      let topListItem = {name:topListData.list[index].name,tracks:topListData.list[index].tracks}
      resultArr.push(topListItem);
      this.setData({
        topList:resultArr
      })
      index++
    }
    

    this.setData({
      bannerList :bannerListData.banners,
      recommendList:recommendListData.result,
    })
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