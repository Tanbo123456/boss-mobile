// 封装ajax请求
import axios from "axios";

export default function ajax(url='',data={},type='GET'){
    if (type==='GET') {
        // get请求
        let dataStr = ''
        // 拼接query参数
        Object.keys(data).forEach(key=>{
            dataStr = dataStr + key+'='+data[key]+'&'
        })
        if (dataStr!=='') {
            dataStr=dataStr.substring(0,dataStr.length-1)
            url+='?'+dataStr
        }
        return axios.get(url)
    } else {
        // post请求
        return axios.post(url,data)
    }
}