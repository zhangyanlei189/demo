import wx from 'weixin-js-sdk'
import axios from 'axios'
import baseUrl from './api'

const wxApi = {
    wxRegister(callback){
        axios.get(baseUrl.baseUrl+'laxin/wxshare?url='+window.location.href).then((res) => {
            console.log("ddddddddddddddddttttttttt")
            let data = res.data.data // PS: 这里根据你接口的返回值来使用
            console.log(data);
            console.log("kkkkkkkkkkkkkkkkkkkkkkffff")
            wx.config({
                debug: false, // 开启调试模式
                appId: data.appid, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getLocalImgData'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
        }).catch((error) => {
            console.log(error)
        })

        wx.ready((res) => {
            // 如果需要定制ready回调方法
            console.log(callback);
            console.log(wx);
            console.log("wxxxxxxxxxxxxxxxxxx7777777777")
            if (callback) {
                callback(wx)
            }
        })
    }
}

export default wxApi;