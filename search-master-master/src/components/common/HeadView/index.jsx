/* eslint-disable */
/**柯礼钦
 * 4/2/2020, 11:22:51 AM
 * doc comment for the file goes here
 */

/** 头部组件 */

import React, { ReactNode, ReactEventHandler, Component } from 'react';
import { Layout, Row, Col, message } from 'antd';
const { Header } = Layout;
import './index.scss';

export default class MenuView extends Component {
    constructor(props) {
        super(props);
        this.config = {
        };
        this.state = {
            loginUser: null
        };
    }
    componentDidMount() {
        // let loginUser =  JSON.parse(window.localStorage.getItem('loginUser'));
        // this.setState({
        //     loginUser
        // })
    }

    render() {
        let { loginUser } = this.state;
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Row type="flex" justify="end" gutter={30}>
                    {
                        loginUser &&
                        <Col>
                            某某某
                        </Col>
                    }
                    <Col style={{ marginRight: 70 }}>
                        <a onClick={() => {
                            window.localStorage.setItem('token', '');
                            message.success('退出成功！');
                            this.props.history.push('/login')
                        }}>退出</a>
                    </Col>
                </Row>
            </Header>
        )
    }
}
