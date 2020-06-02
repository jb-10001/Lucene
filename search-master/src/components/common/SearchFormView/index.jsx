/* eslint-disable */
/**柯礼钦
 * 4/3/2020, 3:00:49 PM
 * doc comment for the file goes here
 */

/** 表单搜索组件 */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker, Divider, Card, Cascader } from 'antd';
import moment from 'moment';
import region from '../../../utils/region';

const { RangePicker } = DatePicker;
import './index.scss';

// data参数：数据模板
// [
//     { type: 'input', name: '姓名', label: '姓名', key: 'name' },  //inpu类型
//     {
//         type: 'select',
//         name: '所属部门',
//         label: '所属部门',
//         key: 'deptId',
//         desc: 'deptName',
//         list: [{ name: '1', value: '选项1' }, { name: '2', value: '选项2' }],
//     }, //select 类型
//     { type: 'district', name: '辖区', label: '辖区', key: 'code' }, //地区三级联动
//     {
//         type: 'rangePicker',
//         label: '时间范围',
//         name: JSON.stringify(['开始时间', '结束时间']),
//         key: JSON.stringify(['startTime', 'endTime']),
//         keylistName: 'rangeTimelist',
//     },  //时间范围选择器
//     {
//         type: 'datePicker',
//         label: '指定时间',
//         name: '指定日期',
//         key: 'date'
//     } //时间选择器
// ]

export default class SearchFormView extends Component {
    constructor(props) {
        super(props);
        this.config = {
        };
        this.state = {
        };
    }

   UNSAFE_componentWillMount() { }

    componentDidMount() { }

    onClick = type => {
        const { pathName } = this.props;
        let data;
        switch (type) {
            case 'search':
                data = { ...this.props.formData, __key: Date.now() };
                this.props.setFormData(data);
                return;
            case 'reset':
                data = { __key: Date.now(), page: 1, size: 10 };
                this.props.setFormData(data);
                return;
            case 'build':
                return;
        }
    };

    //各类型表单元素触发事件
    // input输入类型
    handleInput = ({ target: { name, value } }) => {
        let { formData } = this.props;
        let { filter = JSON.stringify({}) } = formData;
        filter = JSON.parse(filter);
        this.props.setFormData({
            ...this.props.formData, filter: JSON.stringify({
                ...filter,
                [name]: value
            })
        });
    };

    // 时间段区域选择
    rangePickerChange = (name, key, m, d) => {
        let { formData } = this.props;
        let { filter = JSON.stringify({}) } = formData;
        filter = JSON.parse(filter);
        if (m.length > 0) {
            this.props.setFormData({
                ...this.props.formData,
                filter: JSON.stringify({
                    ...filter,
                    [name]: d.join(','),
                    [JSON.parse(key)[0]]: d[0],
                    [JSON.parse(key)[1]]: d[1],
                })
            });
        } else {
            // 暂时不处理
            // this.props.setFormData({
            //     ...this.props.formData,
            //     filter: JSON.stringify({
            //         ...filter,
            //         [name]: undefined,
            //         [JSON.parse(key)[0]]: '',
            //         [JSON.parse(key)[1]]: '',
            //     })
            // });
        }
    };

    // 时间选择器
    datePickerChange = (name, v) => {
        let { formData } = this.props;
        let { filter = JSON.stringify({}) } = formData;
        filter = JSON.parse(filter);
        this.props.setFormData({
            ...this.props.formData,
            filter: JSON.stringify({
                ...filter,
                [name]: v
            })
        });
    };


    render() {
        const { formData = {}, data = [], children } = this.props;
        let filter = formData.filter ? JSON.parse(formData.filter) : {};

        return (
            <div className="search-form-view-main">
                <div className="search-form-view-main-margin-bottom">
                    <Card bordered={false}>
                        {data.length > 0 &&
                            data.map((item, idx) => (
                                <Card.Grid key={idx} style={{ width: '20%' }} hoverable={false} >
                                    {(() => {
                                        switch (item.type) {
                                            case 'select':
                                                return (
                                                    <Form.Item label={item.label}>
                                                        <Select
                                                            size="small"
                                                            style={{ width: '100%' }}
                                                            placeholder={item.name}
                                                            value={filter[item.key]}
                                                            allowClear
                                                            onChange={(v, option) => {
                                                                this.handleInput({ target: { name: item.key, value: v } });
                                                                // item.desc && this.handleInput({ target: { name: item.desc, value: option.props.children}})
                                                            }}
                                                        >
                                                            {item.list &&
                                                                item.list.map(item => (
                                                                    <Select.Option
                                                                        value={item.name}
                                                                        key={item.name}>
                                                                        {item.value}
                                                                    </Select.Option>
                                                                ))}
                                                        </Select>
                                                    </Form.Item>
                                                );
                                            case 'input':
                                                return (
                                                    <Form.Item label={item.label}>
                                                        <Input
                                                            size="small"
                                                            placeholder={item.name}
                                                            name={item.key}
                                                            value={filter[item.key]}
                                                            onChange={this.handleInput}
                                                        />
                                                    </Form.Item>
                                                );
                                            case 'datePicker':
                                                return (
                                                    <Form.Item label={item.label}>
                                                        <DatePicker
                                                            size="small"
                                                            style={{ width: '100%' }}
                                                            placeholder={item.name}
                                                            onChange={(date, dateString) => {
                                                                this.datePickerChange(item.key, dateString);
                                                            }}
                                                            value={filter[item.key] ? moment(filter[item.key], 'YYYY-MM-DD') : undefined}
                                                        />
                                                    </Form.Item>
                                                );
                                            case 'rangePicker':
                                                return (
                                                    <Form.Item label={item.label}>
                                                        <RangePicker
                                                            size="small"
                                                            ranges={{
                                                                Today: [moment(), moment()],
                                                                'This Month': [
                                                                    moment().startOf('month'),
                                                                    moment().endOf('month'),
                                                                ],
                                                            }}
                                                            value={
                                                                item.keylistName &&
                                                                    filter[item.keylistName] &&
                                                                    typeof filter[item.keylistName] == 'string'
                                                                    ? filter[item.keylistName]
                                                                        .split(',')
                                                                        .map(item => moment(item, 'YYYY-MM-DD'))
                                                                    : []
                                                            }
                                                            onChange={(date, dateString) => {
                                                                this.rangePickerChange(
                                                                    item.keylistName,
                                                                    item.key,
                                                                    date,
                                                                    dateString
                                                                );
                                                            }}
                                                            placeholder={JSON.parse(item.name)}
                                                        />
                                                    </Form.Item>
                                                );
                                            case 'district':
                                                return <Form.Item label={item.label}>
                                                    <Cascader
                                                        size="small"
                                                        options={region}
                                                        fieldNames={{
                                                            label: 'name', value: 'code', children: 'area'
                                                        }}
                                                        style={{ width: '100%' }}
                                                        onChange={(value, selectedOptions) => {
                                                            this.handleInput({ target: { name: item.key, value: value[value.length - 1] } });
                                                        }}
                                                        value={filter[item.key] ? districtSplitByCode(filter[item.key]) : []}
                                                    ></Cascader>
                                                </Form.Item>

                                            default:
                                                return null;
                                        }
                                    })()}
                                </Card.Grid>
                            ))}

                        <Card.Grid style={{ width: '20%' }}>
                            <Row type="flex" gutter={20} align="middle" align="middle" style={{ height: 40 }}>
                                <Col>
                                    <Button
                                        size="small"
                                        type="primary"
                                        onClick={() => {
                                            this.onClick('search');
                                        }}>
                                        查询
                                </Button>
                                </Col>
                                <Col>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            this.onClick('reset');
                                        }}>
                                        重置
                                </Button>
                                </Col>
                                {
                                    children &&
                                    <Col>
                                        {children}
                                    </Col>
                                }
                            </Row>
                        </Card.Grid>
                    </Card>
                </div>
                <Divider />
            </div>
        )
    }
}

function districtSplitByCode(code) {
    let code1 = code.slice(0, 2) + '0000';
    let code2 = code.slice(0, 4) + '00';
    let code3 = code.slice(0);
    return [code1, code2, code3]
}
