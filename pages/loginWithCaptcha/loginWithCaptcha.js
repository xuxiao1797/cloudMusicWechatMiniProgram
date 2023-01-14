import request from '../../utils/request'

// pages/loginWithCaptcha.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    captcha:''
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
  handleInput(event){
    let type = event.currentTarget.dataset.type; 
    // console.log(event);
    this.setData({
      [type]: event.detail.value
    })
  },
  async sendCaptcha(){
    let {phone} = this.data;
    // 前端验证
     if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    // 定义正则表达式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }

    let result = await request('/captcha/sent',{phone})
    if(result.code == 200){
      wx.showToast({
        title: '发送成功',
      })
    }
  },

  async login(){
    let {phone,captcha} = this.data;
    if(!captcha){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return;
    }
  
    // 后端验证
    let result = await request('/captcha/verify', {phone, captcha})
    if(result.code === 200){ // 验证成功
      wx.showToast({
        title: '登录成功',
        icon:'none'
      })
      
      let userProfile = await request("/login/cellphone",{phone, captcha})
      if(userProfile.code == 200){
        console.log(userProfile)
        wx.setStorageSync('userInfo', JSON.stringify(userProfile.profile))
         wx.reLaunch({
        url: '/pages/personal/personal'
      })
      }
      
    }else if(result.code === 400){
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    }else if(result.code === 503){
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }
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