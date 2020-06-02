/* eslint-disable */
/**柯礼钦
 * 4/2/2020, 11:22:51 AM
 * doc comment for the file goes here
 */

/** 菜单渲染组件 */

import React, { useState } from 'react';
import { Layout, Menu, Icon, Badge } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import './index.scss';
// import logo from '../../../asset/image/logo.png'
const { SubMenu, Item } = Menu;

export default function MenuView({
    pathname,
    menudata,
    history,
}) {
    if (!menudata.length) return null;

    const { path, name } = find(menudata, pathname);

    if (name) {
        const index = name.indexOf(' - ');
        if (index > -1) {
            document.title = `${name.substr(index)}`;
        } else {
            document.title = `${name}`;
        }
    } else {
        document.title = `海口市干部教育培训管理系统`;
    }

    const defaultOpenKeys = name ? [name] : [];
    const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

    //打开当前选中菜单列，收起其他列
    function onOpenChange(key) {
        let allKeys = menudata.map(({ name }) => name);
        const latestOpenKey = key.find(key => openKeys.indexOf(key) === -1);
        if (allKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(key)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    };

    return (
        <div className="menu-view-main" style={{ padding: 0 }}>
            {/* <div className='pro-div'>
                <div className="pro-div-right">
                    <div className="pro-div-right-top">海口市干部教育培训</div>
                    <div className="pro-div-right-bottom">管理系统</div>
                </div>
            </div> */}
            <Menu
                key={defaultOpenKeys.join('-')}
                style={{ height: '100%', borderRight: 0 }}
                defaultOpenKeys={defaultOpenKeys}
                selectedKeys={path ? [name] : []}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                mode="inline">
                {render(menudata, history)}
            </Menu>
        </div>
        // <Layout.Sider
        //   // width={200}
        //   theme="light"
        //   style={{ backgroundColor: 'white' }}>
        // </Layout.Sider>
    );
}

const render = (data, history) => {
    return data.map(({ name, icon, path, count, children, type, replace, color }, index) =>
        children && children.length ? (
            <SubMenu
                key={name}
                title={
                    <span>
                        {/* <Icon type={icon} /> */}
                        {color ? <span style={{ color }}>{name}</span> : <span>{name}</span>}
                    </span>
                }>
                {render(children, history)}
            </SubMenu>
        ) : (
                <Item
                    key={name}
                    title={name.length > 10 ? name : undefined}
                    onClick={() => {
                        if (replace) {
                            window.location.href = path;
                        } else if (type == 'open') {
                            window.open('/#' + path);
                        } else {
                            history.replace(path);
                        }
                    }}>
                    {Boolean(icon) && <Icon type={icon} />}
                    {Boolean(name) && (color ? <span style={{ color }}>{name}</span> : <span>{name}</span>)} <Badge count={count} />
                </Item>
            )
    );
};

const find = (data, full, pathname = { path: '', name: '' }) =>
    data.reduce((pn, { path = '', name, children }) => {
        if (children && children.length) {
            return find(children, full, pn);
        }
        if (
            path.length > pn.path.length &&
            full.replace(/\/\d+/g, '').startsWith(path.replace(/\/\d+/g, ''))
        ) {
            return { path, name };
        }
        return pn;
    }, pathname);
