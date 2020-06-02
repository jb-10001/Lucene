/* eslint-disable no-unused-vars */
/* eslint-disable */

/**
 * 通过身份证获取年龄, 精确到月
 * @param idcard
 * @returns {Number}
 */
export function getAgeByIdcard(idcard = '') {
	var year = 0;
	var month = 0;
	if (idcard.length == 15) {
		year = parseInt(idcard.substring(6, 8)) + 1900;
		month = parseInt(idcard.substring(8, 10));
	} else if (idcard.length == 18) {
		year = parseInt(idcard.substring(6, 10));
		month = parseInt(idcard.substring(10, 12));
	} else {
		return -1;
	}
	var currYear = new Date().getFullYear();
	var currMonth = new Date().getMonth() + 1;
	var age = currYear - year;
	age = month > currMonth ? age - 1 : age;

	return age;
}

export function getSexByIdcard(idcard = '') {
	let flag;
	if (idcard.length == 18) {
		flag = parseInt(idcard.substring(16, 17));
	} else if (idcard.length == 15) {
		flag = parseInt(idcard.substring(13, 14));
	} else {
		return null;
	}

	return parseInt(flag) % 2 == 0 ? "女" : "男";
}

export function getLnzTypeByIdcard(idcard = '') {
	var age = getAgeByIdcard(idcard);

	if (age >= 69) {
		return "红证";
	} else if (age >= 64) {
		return "绿证";
	} else if (age >= 60) {
		return "蓝证";
	} else {
		return "";
	}
}

export function checkIdCard(idcard = '') {
	var ereg;
	var Errors = new Array("验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!");
	var area = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外"
	}

	var Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	// 地区检验
	if (area[parseInt(idcard.substr(0, 2))] == null)
		return false;// return Errors[4];
	// 身份号码位数及格式检验
	switch (idcard.length) {
		case 15:
			if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
				// 测试出生日期的合法性
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
			} else {
				// 测试出生日期的合法性
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
			}
			if (ereg.test(idcard))
				return true;// return Errors[0];
			else
				return false;// return Errors[2];
			break;
		case 18:
			// 18位身份号码检测
			// 出生日期的合法性检查
			// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
				// 闰年出生日期的合法性正则表达式
				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
			} else {
				// 平年出生日期的合法性正则表达式
				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
			}
			if (ereg.test(idcard)) {
				// 测试出生日期的合法性
				// 计算校验位
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
					+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
					+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1);// 判断校验位
				if (M == idcard_array[17])
					return true;// return Errors[0]; //检测ID的校验位
				else
					return false;// return Errors[3];
			} else
				return false;// return Errors[2];
			break;
		default:
			return false;// return Errors[1];
			break;
	}
}

// 根据身份证获取出生年月
export function getBirthdatByIdNo(iIdNo = '') {
	var tmpStr = "";
	var idDate = "";
	var tmpInt = 0;
	var strReturn = "";

	iIdNo = iIdNo.replace(/^\s+|\s+$/g, "");

	if (iIdNo.length == 15) {
		tmpStr = iIdNo.substring(6, 12);
		tmpStr = "19" + tmpStr;
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
		return tmpStr;
	} else {
		tmpStr = iIdNo.substring(6, 14);
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
		return tmpStr;
	}
}

