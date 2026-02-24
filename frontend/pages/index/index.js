// index.js
Page({
  data: {
    message: "等待后端响应",
    weatherInfo: null,
    inputCity: "上海"
  },

  onLoad(){
    //页面加载时自动请求一次
    this.fetchData();
  },

  //定义请求后端的函数
  fetchData() {
    const that = this;
    // [关键] 请求地址： 本地IP + 端口 + 接口路径
    // 注意：真机调试时 127.0.0.1 要换成电脑局域网 IP，模拟器可用 127.0.0.1
    wx.request({
      url: 'http://127.0.0.1:8000/api/get_weather',
      method: 'GET',
      data: {
        city: that.data.inputCity
      },
      success(res) {
        console.log("后端返回数据:", res.data);
        if(res.statusCode === 200){
          that.setData({
            message: "获取成功！",
            weatherInfo: res.data
          });
        }
      },
      fail(err) {
        console.log("请求失败", err);
        that.setData({
          message: "请求失败， 请检查后端是否运行及CORS配置"
        });
      }
    });
  },

  // 处理输入框变化
  onCityInput(e) {
    this.setData({
      inputCity: e.detail.value
    });
    console.log('用户输入了:', e.detail.value);
  },

  //按钮点击事件
  onRefresh() {
    console.log('按钮被点击了');
    console.log('当前准备请求的城市:',this.data.inputCity);
    this.setData({ message: "加载中..."});
    this.fetchData();
  }
})
