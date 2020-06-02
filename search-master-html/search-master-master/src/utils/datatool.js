/* eslint-disable */
import rule from './rules';
import fetch from '../api/request';
import region from './region';

/**
 * @author 柯礼钦
 * @date 2020/2/27
 * @function: 定时器任务
 */
export function debounce(fn, wait) {
  let timer;

  return function () {
    let that = this;

    let args = arguments;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(that, args);
    }, wait);
  };
}

export function setInterval(fn, wait) {
  let timer;
  return function () {
    let that = this;

    let args = arguments;
  };
}

/**
 * 校验表单格式
 * @param fieldsList 表单字段集合数组
 * @param formData 表单对象
 * @returns {String}
 */
export function verification(fieldsList, formData) {
  for (const a of fieldsList) {
    // console.log(a, formData[a.name]);
    let { name, type, value, label } = a;
    switch (type) {
      case 'text':
      case 'number':
      case 'password':
      case 'phone':
      case 'idcard':
      case 'digit':
        if (!formData[a.name]) {
          return '请填写' + label;
        } else {
          if (type == 'idcard') {
            if (rule.idCard(formData[a.name]) == false) {
              return label + '格式有误';
            }
          }
          if (type == 'phone') {
            if (rule.phone(formData[a.name]) == false) {
              return label + '格式有误';
            }
          }
        }
      default:
        if (!formData[a.name]) {
          return '请选择' + label;
        }
    }
  }
}

export function gainFormDataObj(data) {
  return data.reduce((p, n) => {
    if (n.type !== 'divider') {
      return { ...p, [n.name]: n.value };
    } else {
      return p;
    }
  }, {});
}

/**
 * 修改数组
 * @param originData 原数组
 * @param data 需要新增的属性数组
 * @returns {Array}
 */
export function modifyArray(originData, data) {
  let IndexList = originData.reduce((p, n, idx) => {
    //   console.log(p,n,idx, n.data.findIndex(({name})=> name == 'liveReason'))
    if (n && n.data) {
      data.reduce((p, n) => {
        if (data.findIndex(({ name }) => name == n.name) !== -1) {
          return p.concat(idx);
        } else {
          return p;
        }
      }, []);
      return p.concat(idx);
    } else {
      return p;
    }
  }, []);

  IndexList.map((i) => {
    originData[i].data = originData[i].data.map(({ name, ...a }) =>
      data.find((b) => b.name == name)
        ? {
            ...a,
            name,
            extra: data.find((b) => b.name == name).extra,
            disabled: data.find((b) => b.name == name).disabled,
            clear: data.find((b) => b.name == name).clear,
          }
        : { ...a, name }
    );
  });

  return originData;
}

/**
 * img转base64
 * @param url blob型url
 * @param callback 回调函数
 * @returns {Null}
 */
export function imgToBase64(url, callback) {
  function getBlob(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      callback(xhr.response);
    };
    xhr.send();
  }

  function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = (e) => {
      callback(e.target.result);
    };
    a.readAsDataURL(blob);
  }
  getBlob(url, (blob) => {
    blobToDataURL(blob, (url) => {
      callback(url);
    });
  });
}

// /**
//  * 获取户籍地详址
//  * @param v 户籍地编码址
//  * @returns String
//  */
// export function gainRegionDesc(v) {
//   let v1 = v.slice(0, 2) + '0000';
//   let v2 = v.slice(0, 4) + '00';
//   let v3 = v.slice(0);
//   let arr;
//   let str = '';
//   let index1 = region.findIndex(({ code }) => code == v1);
//   arr = [index1];
//   if (region[index1].city) {
//     let index2 = region[index1].city.findIndex(({ code }) => code == v2);
//     let index3 = region[index1].city[index2].area.findIndex(
//       ({ code }) => code == v3
//     );
//     if (index2 !== -1) {
//       arr.push(index2);
//       str += region[index1].name + region[index1].city[index2].name;
//       if (index3 !== -1) {
//         arr.push(index3);
//         str += region[index1].city[index2].area[index3].name;
//       }
//     }
//   } else {
//     arr = [index1];
//     str = region[index1].name;
//   }
//   return str;
// }

/**
 * 获取户籍地详址
 * @param v 户籍地编码址
 * @returns String
 */
export function gainRegionDesc(v) {
  let v1 = v.slice(0, 2) + '0000';
  let v2 = v.slice(0, 4) + '00';
  let v3 = v.slice(0);
  let arr;
  let str = '';
  let index1 = region.findIndex(({ code }) => code == v1);
  arr = [index1];
  if (region[index1].city) {
    let index2 = region[index1].city.findIndex(({ code }) => code == v2);
    if (index2 !== -1) {
      arr.push(index2);
      let index3 = region[index1].city[index2].area.findIndex(
        ({ code }) => code == v3
      );
      str += region[index1].name + region[index1].city[index2].name;
      if (index3 !== -1) {
        arr.push(index3);
        str += region[index1].city[index2].area[index3].name;
      }
    } else {
      str += region[index1].name;
    }
  } else {
    arr = [index1];
    str = region[index1].name;
  }
  return str;
}

/**
 * 将base64转换为file文件
 * @param dataurl base64字符串
 * @param filename 文件名（必须带后缀名，如.jpg,.png）
 *
 * @returns File对象
 */
export function dataURLtoFile(dataurl, filename) {
  //，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
