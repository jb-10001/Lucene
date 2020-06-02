/* eslint-disable */
/**文浩
 * 5/25/2020, 3:23:53 PM
 * doc comment for the file goes here
 */

/** Happy Coding */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
// import { Link } from 'react-router-dom';
import { Input, Row, Col, Tabs, Tag } from 'antd';
import logo from '../../asset/image/logo.png';
import LawsList from '../../components/page/searchList/lawsList';
import FixedHeaderView from '../../components/common/FixedHeaderView';
import './index.scss';

const { Search } = Input;
const { TabPane } = Tabs;

export default class SearchList extends Component {
  constructor(props) {
    super(props);
    this.config = {
    };
    this.state = {
    };
  }

  UNSAFE_componentWillMount() {
    document.title = '查询列表';
  }

  componentDidMount() { }

  render() {
    return (
      <div className="search-list-main">
        <div className="search-list-main-header">
          <FixedHeaderView value={this.props.match.params.value}/>
        </div>

        <div className="search-list-main-content">

          <Row type="flex" justify='center'>
            <Col span={16}>
              {/* <Tabs defaultActiveKey="1">
                <TabPane tab="法律法规" key="1">
                </TabPane>
                <TabPane tab="相关案例" key="2">
                </TabPane>
              </Tabs> */}
              <div className="search-list-main-content-area">
                {/* 搜索标签域 */}
                {/* <div className="search-list-main-content-area-tagList">
                  <Row type="flex" gutter={10}>
                    <Col>
                      <Tag closable>
                        知识产权1
                      </Tag>
                    </Col>
                    <Col>
                      <Tag closable>
                        知识产权2
                      </Tag>
                    </Col>
                  </Row>
                </div> */}

                <div className="search-list-main-content-area-searchList" >
                  <LawsList props={this.props} />
                </div>

              </div>
            </Col>
          </Row>

        </div>

      </div>
    )
  }
}
