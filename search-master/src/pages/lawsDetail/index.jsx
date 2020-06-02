/* eslint-disable */
/**文浩
 * 5/26/2020, 9:21:58 AM
 * doc comment for the file goes here
 */

/** 法规详情 */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
import LawsDetailPage from '../../components/page/lawsDetail';
import FixedHeaderView from '../../components/common/FixedHeaderView';
// import { Link } from 'react-router-dom';
// import { Icon } from 'antd';
import './index.scss';


export default class LawsDetail extends Component {
  constructor(props) {
    super(props);
    this.config = {
    };
    this.state = {
    };
  }

  UNSAFE_componentWillMount() { }

  componentDidMount() { }

  render() {
    return (
      <div className="laws-detail-main">
        <div className="laws-detail-main-header">
          <FixedHeaderView />
        </div>
        <div className="laws-detail-main-content" style={{ alignItems: 'center' }}>
          <LawsDetailPage props={this.props}/>
        </div>
      </div>
    )
  }
}
