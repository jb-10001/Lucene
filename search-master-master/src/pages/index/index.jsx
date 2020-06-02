/* eslint-disable */
/**文浩
 * 5/25/2020, 2:18:18 PM
 * doc comment for the file goes here
 */

/** Happy Coding */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
import { Input } from 'antd';
import bg_2 from '../../asset/image/background2.png';
import './index.scss';

const { Search } = Input;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.config = {
    };
    this.state = {
    };
  }

  UNSAFE_componentWillMount() {
    document.title = '搜 索'
  }

  componentDidMount() { }

  onSearch = (value) => {
    console.log('value', value);
    this.props.history.push(`/searchList/${value}`);
  }

  render() {
    return (
      <div className="index-main">
        <div className='index-main-header'>
          <div className='index-main-header-inputSearch'>
            <Search
              placeholder="输入关键字进行检索"
              size="large"
              onSearch={this.onSearch}
              style={{ width: '100%' }}
            />
          </div>

        </div>
        <div className='index-main-bottom'>
          <img src={bg_2} alt="" />
        </div>
      </div>
    )
  }
}

