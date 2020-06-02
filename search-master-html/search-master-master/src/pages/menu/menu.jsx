/* eslint-disable */
/**柯礼钦
 * 4/2/2020, 11:22:51 AM
 * doc comment for the file goes here
 */

/** 菜单组件 */

import React from 'react';
import { Spin, Layout, Menu, Icon } from 'antd';
import MenView from '../../components/common/MenuView';
import { menus, getMenuListByPermission } from '../../menu';

// import Fetch from '../fetch';
const { Sider } = Layout;

function find(data, pathname) {
  for (const { path, children } of data) {
    if (path === pathname) return path;
    if (children) {
      const result = find(children, pathname);
      if (result) return result;
    }
  }
  return null;
}

function selected(data, pathname) {
  if (!pathname || pathname === '/') return pathname;
  return find(data, pathname) || selected(data, pathname.split('/').slice(0, -1).join('/'));
}

export default class MenuView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      data: []
    };
  }

  componentDidMount() {
    this.setState({ data: menus });
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  }

  render() {
    const { data, collapsed } = this.state;
    const pathname = selected(data, this.props.location.pathname);
    return (
      <Sider
        onCollapse={this.onCollapse}
        collapsed={collapsed}
        breakpoint="lg"
        collapsible={true}
        style={{ overflow: 'auto' }}
      >
        <MenView
          history={this.props.history}
          pathname={pathname}
          key={data.length}
          menudata={data}
        />
      </Sider>
    );
  }

}
