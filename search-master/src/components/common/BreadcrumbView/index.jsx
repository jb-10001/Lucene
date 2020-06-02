/* eslint-disable */
/**柯礼钦
 * 4/3/2020, 9:38:37 AM
 * doc comment for the file goes here
 */

/** 页面头部面包屑 */
import React, { ReactNode, ReactEventHandler } from 'react';
import { Breadcrumb } from 'antd';
import './index.scss';
import creatHistory from 'history/createHashHistory';
const history = creatHistory();//返回上一页这段代码

export default function BreadcrumbView({ data = [{
    name: '辖区人口管理', url: '', back: false
}] }) {
    return (
        <div className="breadcrumb-view-main">
            <Breadcrumb>
                {
                    data.map(({ name, url, back }, idx) => (
                        <Breadcrumb.Item key={idx}>
                            {
                                back ? <a onClick={() => {
                                    history.goBack();
                                }}>{name}</a> : (
                                        url ? <a onClick={() => {
                                            window.location.href = window.location.origin + '/' + url
                                        }}>{name}</a> : name)
                            }
                        </Breadcrumb.Item>
                    ))
                }
            </Breadcrumb>
        </div>
    )
}
