/* eslint-disable */
export default function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  const id = s.join('');
  return id;
}

/**
 * 问号传参的对象转换拼接
 * @param {需要转换的对象} Object
 */
export function objConcatUrl(data) {
  return (
    '?' +
    Object.entries(data)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
  );
}

/**
 * 解析url问号传参参数对象
 * @param
 */
export function locationSearchTransObj() {
  let url = window.location.href;
  let idx = url.indexOf('?') + 1;
  let str = url.substr(idx);
  let theRequest = new Object();
  let strs = str.split('&');

  for (var i = 0; i < strs.length; i++) {
    theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
  }
  return theRequest;
}
