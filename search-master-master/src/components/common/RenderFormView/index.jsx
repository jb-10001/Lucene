/* eslint-disable */
/**柯礼钦
 * 4/8/2020, 9:45:09 AM
 * doc comment for the file goes here
 */

/** 表单渲染组件 */
import React, { ReactNode, ReactEventHandler, Component, useEffect, useState } from 'react';
import { Icon, Card, Input, Collapse, Select, DatePicker, Radio, Cascader, Button } from 'antd';
const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import './index.scss';
import region from '../../../utils/region';
import { dataByIdcard } from './dataByIdcard';
import moment from 'moment';

export default function RenderFormView({ form = [], handleChange = (data) => {
}, formData = {}, }) {
    const [defaultActiveKey, setDefaultActiveKey] = useState(form.map(({ name }) => name));

    return (
        <div className="render-form-view-main">

            {/* <Collapse defaultActiveKey={defaultActiveKey}> */}
            {
                form.map((panel, idx) => {
                    return <Card title={panel.label} key={panel.name} headStyle={{ background: '#EBEEF8' }} style={{ marginBottom: '24px' }} type="inner" >
                        {/* <Panel header={panel.label} key={panel.name}> */}
                        <Card bordered={false}>
                            {
                                panel.data.map((f, i) => {
                                    return <Card.Grid hoverable={false} style={{ minHeight: '82px', width: f.type == 'textArea' ? '68%' : '' }} key={i}>
                                        {
                                            render(f, i, handleChange, form, formData)
                                        }
                                    </Card.Grid>
                                })
                            }

                        </Card>
                        {/* </Panel> */}
                    </Card>

                })
            }
            {/* </Collapse> */}
        </div>
    )
}

const titleRender = (label, labelExt, require, bold) => {
    return <div className={bold ? 'label-style fontWeight' : 'label-style'}>
        {label}{require && <span style={{ color: 'red', marginLeft: '4PX' }}>*</span>}
        {labelExt && <span className={labelExt.className || 'label-ext'}>{labelExt.text}</span>}
    </div>
}

export const render = (f, i, c, fl, fd) => {

    const h = (d) => {
        let { index, key, value } = d;
        fd[key] = value
        c(fd);
    }

    const { name, require, value, type, label, labelExt, list = [], extra = null, margin, disabled = false, desc, placeholder = null, start = '1970-01-01', clear = false, className = "" } = f;
    switch (type) {
        case 'text':
        case 'number':
        case 'password':
        case 'phone':
        case 'idcard':
        case 'digit':
            return <div>
                <div style={{ display: 'flex' }}>
                    {titleRender(label, labelExt, require)}
                    <div style={{ marginLeft: 20 }}>
                        {clear && <Button size="small" onClick={() => {
                            c({ personType: '1', clear: true })
                        }}>清除身份信息</Button>}
                    </div>
                </div>
                <div className="flex-box">
                    <Input
                        style={{ color: className && fd[name] ? '#58bc58' : '' }}
                        addonAfter={extra || null}
                        className="flex-1"
                        disabled={disabled}
                        name={name}
                        // title={titleRender(label, require)}
                        type={type}
                        value={fd[name]}
                        placeholder={!disabled ? (placeholder || '请输入' + label) : '暂无'}
                        onChange={e => {
                            // 当修改身份证时候，同时满足身份证格式，自动回填户籍地以及籍贯
                            h({
                                index: i,
                                key: name,
                                value: e.target.value
                            });
                            dataByIdcard(name, i, e.target.value, h);
                        }}
                    />
                    {/* {extra || null} */}
                </div>
            </div>

        case 'divider':
            return <div >
                {label}
            </div>
        case 'select':
            return <div>
                {titleRender(label, labelExt, require)}
                <Select
                    style={{ width: '100%', color: className && fd[name] ? '#58bc58' : "" }} disabled={disabled} value={fd[name]} placeholder={!disabled ? '请选择' : ''} onChange={(v, option) => {
                        h({
                            index: i,
                            key: name,
                            value: v
                        });
                        h({
                            key: `${desc ? desc : name + 'Desc'}`,
                            value: option.props.children
                        })
                    }}>
                    {
                        list.map(({ name, value, id }) => (
                            <Option value={name} key={id}>{value}</Option>
                        ))
                    }
                </Select>
            </div>
        case 'radio':
            return <div>
                {titleRender(label, labelExt, require)}
                <Radio.Group disabled={disabled} onChange={e => {
                    h({
                        index: i,
                        key: name,
                        value: e.target.value
                    })
                }} value={fd[name]}>
                    <Radio value={'1'}>是</Radio>
                    <Radio value={'0'}>否</Radio>
                </Radio.Group>
            </div>
        case 'time':
        case 'date':
            return <div>
                {titleRender(label, labelExt, require)}
                <DatePicker style={{ width: '100%' }} className={className && fd[name] ? className : ''} disabled={disabled} onChange={(date, dateString) => {
                    h({
                        index: i,
                        key: name,
                        value: new Date(dateString).getTime()
                    })
                }} value={fd[name] ? moment(new Date(fd[name]), 'YYYY/MM/DD') : undefined} />
            </div>
        case 'rangePicker':
            return <div>
                {titleRender(label, labelExt, require)}
                <RangePicker style={{ width: '100%' }} disabled={disabled} onChange={(date, dateString) => {
                    h({
                        index: i,
                        key: JSON.parse(name)[0],
                        value: dateString[0]
                    })
                    h({
                        index: i,
                        key: JSON.parse(name)[1],
                        value: dateString[1]
                    })
                }} value={fd[JSON.parse(name)[0]] ? [moment(new Date(fd[JSON.parse(name)[0]]), 'YYYY/MM/DD'), moment(new Date(fd[JSON.parse(name)[1]]), 'YYYY/MM/DD')] : undefined} />
            </div>
        case 'district':
            return <div>
                {titleRender(label, labelExt, require)}
                <Cascader
                    disabled={disabled}
                    options={region}
                    fieldNames={{
                        label: 'name', value: 'code', children: 'area'
                    }}
                    style={{ width: '100%', color: className && fd[name] ? '#58bc58' : "" }}

                    onChange={(value, selectedOptions) => {
                        h({
                            index: i,
                            key: name,
                            value: value[value.length - 1]
                        })
                    }}
                    value={fd[name] ? districtSplitByCode(fd[name]) : []}
                ></Cascader>
            </div>
        case 'textArea':
            return <div>
                {titleRender(label, labelExt, require)}
                <TextArea
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    addonAfter={extra || null}
                    className="flex-1"
                    disabled={disabled}
                    name={name}
                    title={titleRender(label, labelExt, require)}
                    type={type}
                    value={fd[name]}
                    placeholder={!disabled ? (placeholder || '请输入' + label) : '暂无'}
                    onChange={e => {
                        // 当修改身份证时候，同时满足身份证格式，自动回填户籍地以及籍贯
                        h({
                            index: i,
                            key: name,
                            value: e.target.value
                        });
                        dataByIdcard(name, i, e.target.value, h);
                    }} />
            </div>

    }
}

function districtSplitByCode(code) {
    let code1 = code.slice(0, 2) + '0000';
    let code2 = code.slice(0, 4) + '00';
    let code3 = code.slice(0);
    return [code1, code2, code3]
}
