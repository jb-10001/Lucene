/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Menu from './pages/menu/menu';
import Header from './components/common/HeadView';

import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { createHashHistory } from 'history';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import fetch from './api/request';

import { Layout } from 'antd';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// 引进页面（pages）
import Index from './pages/index';//搜索首页
import SearchList from './pages/searchList';//搜索列表
import SearchDetail from './pages/lawsDetail';//法规详情
import Login from './pages/login/login';

const { Content } = Layout;
const history = createHashHistory();

class RouteDom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getJwtLogin: true, //是否登录凭证
    };
  }
  componentDidMount() {}

  render() {
    const { getJwtLogin } = this.state;
    return (
      <ConfigProvider locale={zh_CN}>
        {getJwtLogin && (
          <Router history={history}>
            <Layout className="h-100">
              <Layout>
                <Content>
                  <Switch>
                    {/* <Route path="/login" component={Login} /> */}
                    <Route path="/searchList/:value" component={SearchList} />
                    <Route path="/searchDetail/:id" component={SearchDetail} />
                    <Route path="/" component={Index} />
                    <Redirect to="/" component={Index} />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Router>
        )}
      </ConfigProvider>
    );
  }
}

ReactDOM.render(<RouteDom></RouteDom>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
