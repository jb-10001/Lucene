/* eslint-disable */
/**文浩
 * 5/26/2020, 9:21:01 AM
 * doc comment for the file goes here
 */

/** 法规详情 */
import React, { ReactNode, ReactEventHandler, Component, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import './index.scss';
import res from './detail';
// console.log(res);
import fetch from '../../../api/request';


export default function LawsDetail({ props }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch({
      url: `api/law/find`,
      params: {
        id: props.match.params.id
      }
    }).then(res => {
      if (res) {
        console.log('详情res', res)
        setData(res);
      }
    })
  }, []);


  return (
    <Row className="laws-detail-view-main" type="flex" justify="center">
      {
        data &&
        <Col span={16}>
          <div className="laws-detail-view-main-code_name" dangerouslySetInnerHTML={{
            __html: data.codeName
          }}></div>

          <div className="laws-detail-view-main-base_info">
            <Row type="flex" style={{ width: '100%' }} className="laws-detail-view-main-base_info_row">
              <Col span={8}>
                <span className='laws-detail-view-main-base_info_name'>发布部门：</span>
                <span className='laws-detail-view-main-base_info_value'>{data.issuingAgency || ''}</span>
              </Col>
              <Col span={8}>
                <span className='laws-detail-view-main-base_info_name'>发文字号：</span>
                <span className='laws-detail-view-main-base_info_value'>{data.issuingNumber || ''}</span>
              </Col>
              <Col span={8}>
                <span className='laws-detail-view-main-base_info_name'>发布日期：</span>
                <span className='laws-detail-view-main-base_info_value'>{data.releaseDate || ''}</span>
              </Col>
            </Row>

            <Row type="flex" style={{ width: '100%' }} className="laws-detail-view-main-base_info_row">
              <Col span={8} >
                <span className='laws-detail-view-main-base_info_name'>实施日期：</span>
                <span className='laws-detail-view-main-base_info_value'>{data.implementDate || ''}</span>
              </Col>
              <Col span={8}>
                <span className='laws-detail-view-main-base_info_name'>时效性：</span>
                <span className='laws-detail-view-main-base_info_value'>{data.timeliness || ''}</span>
              </Col>
              <Col span={8}>
                <span className='laws-detail-view-main-base_info_name'>效力级别：</span>
                <span className='laws-detail-view-main-base_info_value'>{data.lawType || ''}</span>
              </Col>
            </Row>
          </div>

          {/* 正文部分 */}
          {data.laws && JSON.parse(data.laws).map((clause, idx) => (
            <div key={idx}>
              <div className="laws-detail-view-main-content-clause_text" dangerouslySetInnerHTML={{
                __html: clause.text
              }}></div>
            </div>
          ))}

        </Col>
      }


    </Row>
  )
}
