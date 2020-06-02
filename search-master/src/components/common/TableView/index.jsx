/* eslint-disable */
/**柯礼钦
 * 4/3/2020, 9:57:26 AM
 * doc comment for the file goes here
 */

/** 表格公用组件 */
import React, { ReactNode, ReactEventHandler, Component } from 'react';
import { Table } from 'antd';
import './index.scss';
import fetch from '../../../api/request';

export default class TableView extends Component {
    constructor(props) {
        super(props);
        this.config = {
        };
        this.state = {
            tableData: [],
            totalElements: 0,
            pageSize: 10,
            page: 1,
            loading: false
        };
    }

   UNSAFE_componentWillMount() { }

    componentDidMount() {
        let { page, size } = this.props.formData;
        this.loadData(page, size);
    }

    loadData = (page, size) => {
        let { formData, extraFromData, url } = this.props;
        this.setState({
            loading: true,
        });
        fetch({
            url,
            params: {
                ...formData,
                ...extraFromData,
                page,
                size
            }
        }).then(res => {
            console.log('res++++', res)
            if (res) {
                res.content = res.content.map(({ ...a }, idx) => ({
                    ...a,
                    index: idx + 1 + 10 * (page - 1),
                    key: idx,
                }));
            }
            this.setState({
                tableData: res ? res.content : [],
                loading: false,
                totalElements: res ? res.totalElements : 0,
            });
        });
    };

    pageChange = (page, size) => {
        this.props.setFormData({
            ...this.props.formData,
            page
        });
        this.loadData(page, size);
    };

    onShowSizeChange = (current, size) => {
        this.props.setFormData({
            ...this.props.formData,
            page: 1,
            size
        });
        this.loadData(1, size);
    };

    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <span>上一页&nbsp;</span>;
        } else if (type === 'next') {
            return <span>&nbsp;下一页</span>;
        }
        return originalElement;
    };

    render() {
        const { columns, rowSelection, rowClassName } = this.props;
        const { page, size } = this.props.formData;
        return (
            <div className="table-view-main">
                <Table
                    rowSelection={rowSelection || null}
                    rowClassName={rowClassName}
                    size="middle"
                    className="rowColor"
                    dataSource={this.state.tableData}
                    loading={{ spinning: this.state.loading }}
                    columns={columns}
                    pagination={{
                        pageSize: Number(size),
                        onChange: this.pageChange,
                        total: this.state.totalElements,
                        showSizeChanger: true,
                        onShowSizeChange: this.onShowSizeChange,
                        showTotal: (total, range) => `共${total}条记录 `,
                        // itemRender: this.itemRender,
                        showQuickJumper: true,
                        defaultCurrent: 1,
                        current: Number(page),
                    }} />
            </div>
        )
    }
}
