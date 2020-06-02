package com.sjar.search.model.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.common.collect.Maps;
import com.sjar.search.lucene.LuceneService;
import com.sjar.search.model.entity.Law;
import com.sjar.search.model.service.LawService;
import com.sjar.search.util.ReturnUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.stereotype.Controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author chenxiong
 * @since 2020-05-13
 */
@RestController
@RequestMapping("/api/law")
public class LawController {

    private static Logger logger = LoggerFactory.getLogger(LawController.class);

    @Autowired
    private LawService lawService;
    @Autowired
    private LuceneService luceneService;

    /**
     * 根据ID，获取单个
     *
     * url: {ctx}/api/law/getList
     * type: get
     */
    @RequestMapping(value = "/getList", method = RequestMethod.GET)
    public Object getList(@RequestParam("keyWord") String keyWords,
                          @RequestParam("size") int size) throws Exception {
        try {
            List<Map<String,Object>> list = luceneService.indexSearch(keyWords,size);
            return ReturnUtil.getReturnInfo(ReturnUtil.RTN_OK, "处理成功", list);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ReturnUtil.getReturnInfo(ReturnUtil.RTN_FAIL, e.getMessage(), null);
        }
    }

    /**
     * 根据ID，获取单个
     *
     * url: {ctx}/api/law/find
     * type: get
     */
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    public Object getList(@RequestParam("id") String id) throws Exception {
        try {
            QueryWrapper<Law> wrapper = new QueryWrapper();
            wrapper.eq("code_id",id);
            return ReturnUtil.getReturnInfo(ReturnUtil.RTN_OK, "处理成功", lawService.getOne(wrapper));
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ReturnUtil.getReturnInfo(ReturnUtil.RTN_FAIL, e.getMessage(), null);
        }
    }
}

