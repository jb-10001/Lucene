package com.sjar.search.util;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class ReturnUtil {

	private static Logger logger = LoggerFactory.getLogger(ReturnUtil.class);


	private static JsonMapper jsonMapper = new JsonMapper();

	public static final int RTN_OK =0;  //正常返回
	public static final int RTN_NULL =-2;  //无数据返回
	public static final int RTN_FAIL =-1; //异常返回

	/**
	 * 设置公共出参信息
	 * @param code
	 * @param msg
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static Map getReturnInfo(int code, String msg, Object data) throws Exception {
		if(StringUtils.isBlank(msg)){
			msg = null;
		}
		Map rtnMap = new HashMap();
		rtnMap.put("code", code);
		rtnMap.put("msg", msg);
		rtnMap.put("data", data);
		String json = jsonMapper.toJson(rtnMap);
		logger.info("----------------output json is{}", json);

		return rtnMap;
	}
}

