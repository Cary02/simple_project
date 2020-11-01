import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from './router';

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close();
}

// 请求拦截

axios.interceptors.request.use(config => {
    // 成功之前做什么
    startLoading();
    if (localStorage.eleToken) {
        // 设置统一请求头
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
}, err => {
    return Promise.reject(err);
})

// 响应拦截

axios.interceptors.response.use(res => {
    endLoading();
    return res;
}, err => {
    endLoading();
    Message.error(err.response.data);
    const { status } = err.response;
    if (status == 401) {
        Message.error("token失效，请重新登录！",);
        // 清除token
        localStorage.removeItem('eleToken');
        // 跳转到登录界面
        router.push("/login");
    }
    return Promise.reject(err);
})
export default axios;