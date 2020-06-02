/* eslint-disable */
/**文浩
 * 5/25/2020, 4:26:00 PM
 * doc comment for the file goes here
 */

/** 法律法规列表 */
import React, { ReactNode, ReactEventHandler, Component, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Divider, Button, Pagination, Row, Col } from 'antd';
import { useHistory } from "react-router-dom";
import res from './list';
// console.log('res', res);
import './index.scss';
import fetch from '../../../../api/request';

// let history = useHistory();
res.data = res.data.map(({ laws, ...law }) => ({
  ...law,
  laws,
  showButton: laws.length > 3 ? 'more' : 'noMore'
}))


export default function LawsList({ props }) {
  const [list, setList] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  console.log(props);
  useEffect(() => {
    fetch({
      url: `api/law/getList`,
      params: {
        keyWord: props.match.params.value,
        size
      }
    }).then(res => {
      console.log('接口res', res)
      if (res) {
        setList(res);
      }
    })
  }, [])



  function funShowButton(idx) {
    list[idx].showButton = (list[idx].showButton == 'more' ? 'noMore' : 'more')
    setList(list.slice(0));
  }

  function linkDetail(id) {
    props.history.push(`/searchDetail/${id}`);
  }

  return (
    <div className="laws-list-main">
      {
        list.slice((page - 1) * size, page * size).map((law, idx) => (
          <div className="laws-list-item" key={law.id}>
            <div className="laws-list-item-code_name" dangerouslySetInnerHTML={{
              __html: law.code_name
            }} onClick={() => {
              linkDetail(law.id)
            }}></div>

            {/* 案件标签 */}
            {/* <div className="laws-list-item-tags">
              <span>{law.law_type}</span>
              <Divider type="vertical" />
              <span>{law.issuing_agency}</span>
              <Divider type="vertical" />
              <span>{law.issuing_number}</span>
              <Divider type="vertical" />
              <span>{law.release_date}发布</span>
              <Divider type="vertical" />
              <span>{law.implement_date}实施</span>
            </div> */}

            {/* 案件内容 */}
            {
              law.laws.map((clause, idx) => (
                <div key={idx}>
                  <div className="laws-list-item-clause_text" dangerouslySetInnerHTML={{
                    __html: clause.text
                  }}></div>
                  {idx < law.laws.slice(0, law.showButton == 'more' ? 3 : law.laws.length).length - 1 && <Divider dashed type="horizontal" />}
                </div>
              ))
            }
            {/* {
              law.laws.slice(0, law.showButton == 'more' ? 3 : law.laws.length).map((clause, idx) => (
                <div key={idx}>
                  <div className="laws-list-item-clause_text" dangerouslySetInnerHTML={{
                    __html: clause.text
                  }}></div>
                  {idx < law.laws.slice(0, law.showButton == 'more' ? 3 : law.laws.length).length - 1 && <Divider dashed type="horizontal" />}
                </div>
              ))
            }

            {law.laws && law.laws.length > 3 ?
              <div className="laws-list-item-show_detail-btn" onClick={() => funShowButton(idx)}>
                {law.showButton == "more" ? '展示更多' : '收缩'}
              </div> : null
            } */}
          </div>
        ))
      }
      <Row type="flex" justify="end" style={{ margin: 10 }}>
        <Col>
          <Pagination size="small" total={list.length} current={page} onChange={(page) => {
            setPage(page)
          }} />
        </Col>
      </Row>

    </div>
  )
}
