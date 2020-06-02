/* eslint-disable */
/**礼钦
 * 7/05/2020,
 */
import React from 'react';
import { Input, Row, Col } from 'antd';
const { Search } = Input;

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="index-page h-100">
        <div className="bg-white h-100">
          <Row type="flex" justify="start" style={{ padding: 40 }}>
            <Col span={10}>
              <Search placeholder="请输入..." onSearch={value => console.log(value)} enterButton="搜索" size="large" />
            </Col>
          </Row>

        </div>
      </div>
    );
  }

}
