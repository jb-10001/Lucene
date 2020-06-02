/* eslint-disable */
/**文浩
 * 5/26/2020, 9:39:32 AM
 * doc comment for the file goes here
 */

/** 浮动搜索头部组件 */
import React, { ReactNode, ReactEventHandler, Component, useState } from 'react';
import { Row, Col, Input } from 'antd';
import logo from '../../../asset/image/logo.png';
import './index.scss';

const { Search } = Input;

export default function FixedHeaderView({ value = '' }) {

  const [searchValue, setSearchValue] = useState(value);
  return (
    <div className="fixed-header-view-main">
      <Row type="flex" justify="center" align="middle" gutter={30}>
        <Col>
          <img src={logo} alt="拾律" className="search-list-main-header-logo" />
        </Col>
        <Col span={12}>
          <Search
            value={searchValue}
            placeholder="输入关键词对内容进行检索"
            onSearch={value => console.log(value)}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
    </div>
  )
}
