/* eslint-disable */
/**柯礼钦
 * 4/3/2020, 10:19:45 AM
 * doc comment for the file goes here
 */

/** 登录页面 */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Row, Col } from 'antd';
import './login.scss';
// import logo from '../../asset/image/logo.png';
import fetch from '../../api/request';
import GVerify from '../../utils/gVerify';

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.config = {
            navigationBarTitleText: '',
        };
        this.state = {
            btnLoading: false
        };
    }
    UNSAFE_componentWillMount() {
        document.title = '用户登录';
    }

    componentDidMount() {
        this.verifyCode = new GVerify("v_container");
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // if (!this.verifyCode.validate(values.verifyCode)) {
                //     message.error('验证码有误');
                //     return;
                // }
                this.setState({
                    btnLoading: true
                });

                fetch({
                    url: `hik-common/api/opus/user/loginTest`,
                    params: {
                        ...values
                    }
                }).then(res => {
                    this.setState({
                        btnLoading: false
                    })
                    if (res) {
                        this.handleRes(res);
                    }
                })
            }
        });
    };

    handleRes = (res) => {
        let loginUser = {};
        loginUser = res.user[0];
        // 缓存相关用户登录信息
        window.localStorage.setItem('user', res);
        window.localStorage.setItem('token', res.token);
        window.localStorage.setItem('loginUser', JSON.stringify(loginUser));
        // 登录成功跳转
        message.success('登录成功');
        this.props.history.push({ pathname: "/" });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { btnLoading } = this.state;
        return (
            <div className="login-main">
                <div className="login-div-top">
                    {/* <img className="login-div-top-img" src={logo} /> */}
                    海口市干部教育培训管理系统
                </div>
                <div className="login-div-content">
                    <div className="login-div-content-left">

                    </div>
                    <div className="login-div-content-right">
                        <div className="login-div-content-right-form">
                            <div className="login-div-content-right-form-content">
                                <div className="login-div-content-right-form-content-title">欢迎登录</div>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item className="login-div-content-form-flex" >
                                        {getFieldDecorator('loginName', {
                                            rules: [{ required: true, message: '请输入账号!' }],
                                            initialValue: 'lilinl'
                                        })(
                                            <Input
                                                style={{ width: '35vh', height: '5vh', margin: '12px' }}
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="请输入账号"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item className="login-div-content-form-flex">
                                        {getFieldDecorator('passWord', {
                                            rules: [{ required: true, message: '请输入密码!' }],
                                            initialValue: 'admin'
                                        })(
                                            <Input
                                                style={{ width: '35vh', height: '5vh', margin: '12px' }}
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password"
                                                placeholder="请输入密码"
                                            />,
                                        )}
                                    </Form.Item>

                                    <Form.Item className="login-div-content-form-flex">
                                        {getFieldDecorator('verifyCode', {
                                            rules: [{ required: false, message: '请输入验证码!' }],
                                            initialValue: 'admin'
                                        })(
                                            <Row type="flex" style={{ width: '35vh', margin: 12 }} justify="space-between">
                                                <Col span={14}>
                                                    <Input
                                                        style={{ height: '5vh' }}
                                                        placeholder="验证码"
                                                    />
                                                </Col>
                                                <Col span={10}>
                                                    <Row type="flex" justify="center" align="middle">
                                                        <Col>
                                                            <div id="v_container"></div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        )}


                                    </Form.Item>
                                    <Form.Item className="login-div-content-form-flex">
                                        <Button type="primary" htmlType="submit" style={{ width: '35vh', height: 48, marginTop: 20, letterSpacing: 10 }} loading={btnLoading}>登录</Button>
                                    </Form.Item>
                                </Form>
                            </div>

                        </div>
                    </div>

                    {/* <div className="login-div-bottom">2011 10215489广州恒巨信息科技有限公司 版权所有 - 粤ICP备10215489号</div> */}
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;
