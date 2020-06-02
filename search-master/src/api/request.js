/* eslint-disable */
import axios from 'axios';
import { message } from 'antd';
import { NetworkState, BASE_URL, MockUrl } from './httpurl';

const CODE_SUCCESS = '200';

export default function fetch(options) {
  const {
    mock = false,
    url,
    data,
    params,
    method = 'get',
    showToast = true,
    autoLogin = true,
    headers = {},
  } = options;

  headers['Content-type'] = 'application/json';
  headers['Accept'] = 'application/json';

  let token =
    window.localStorage.getItem('token') == 'undefined'
      ? undefined
      : window.localStorage.getItem('token');
  let loginUser =
    window.localStorage.getItem('loginUser') == 'undefined'
      ? undefined
      : window.localStorage.getItem('loginUser');
  let posId =
    loginUser && Object.keys(loginUser).length
      ? JSON.parse(loginUser).posId
      : undefined;
  let appId = 1;

  let recognitionParams = ['appId', 'posId'].reduce((p, n) => {
    if (eval(n)) {
      p[n] = eval(n);
      return p;
    } else {
      return p;
    }
  }, {}); //过滤掉为undefined的值，避免组装到接口url里面

  // 将携带参数转换成参数字符串
  let recognitionParamsTransferStr =
    Object.keys(recognitionParams).length > 0
      ? '?' +
        Object.entries(recognitionParams)
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      : '';

  if (token) {
    // headers['Authorization'] = token; //将token放入请求头
  }

  return axios({
    url: mock
      ? MockUrl + url + recognitionParamsTransferStr
      : BASE_URL + url + recognitionParamsTransferStr,
    method,
    data,
    params,
    // headers,
  })
    .then((res) => {
      // Taro.hideLoading();
      const { code, data, msg } = res.data;
      if (code == '0') {
        return data || true;
      } else if (
        code == '10005' ||
        code == '401' ||
        code == '10002' ||
        code == '10003'
      ) {
        // token失效重新返回登录页面
        // window.location.href = window.location.origin + 'ssim/#/login';
      } else {
        message.warning(msg);
        return false;
      }
    })
    .catch((err) => {
      let defaultMsg = '';
      if (err.code !== CODE_SUCCESS) {
        defaultMsg = '请求异常，请检查网络连接状况';
      }
      return Promise.reject({ msg: 'error' });
    });
}
