/**
 * 菜单列表
 * key, path需要保持唯一
 * permKey表示权限Key值
 */
const menus = [
    {
        key: '0',
        name: '首页',
        path: '/',
        permKey: 'menu.home',
        children: [],
    },
    {
        key: 'menu1',
        name: '菜单1',
        path: '/menu1',
        icon: 'user',
        permKey: 'menu1',
        children: [
            {
                key: 'menu1-1',
                name: '菜单1-1',
                path: '/menu1/menu1-1',
                permKey: '/menu1/menu1-1',
                children: [],
            },
        ]
    },

];

export default menus;
