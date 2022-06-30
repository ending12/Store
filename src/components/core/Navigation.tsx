import React from "react";
import { RouterState } from "connected-react-router"
import { useSelector } from "react-redux"
import { AppState } from "../../store/reducers"
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, ShopOutlined, PhoneOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../store/models/auth";

function usePathJudge(currentPath:string, path:string):string {
    return currentPath === path ? "ant-menu-item-selected" : "";
}

//实现导航菜单
export const Navigation = () => {
    const router = useSelector<AppState, RouterState>(state => state.router);
    const pathname =  router.location.pathname;
    const isHome = usePathJudge(pathname, "/");
    const isShop = usePathJudge(pathname, "/shop");
    // const isMy = usePathJudge(pathname, "/my");
    const isSignin = usePathJudge(pathname, "/signin");
    const isSignup = usePathJudge(pathname, "/signup");
    //判断user还是admin的dashboard
    const isDashboard = usePathJudge(pathname, getDashboarUrl());
    //因为要根据角色现在不同组件，这里我们要先定义默认url在判断角色是否出现

    function getDashboarUrl() {
        let url = "/user/dashboard"
        if (isAuth()) {
          const {
            user: { role }
          } = isAuth() as Jwt
    
          if (role === 1) {
            url = "/admin/dashboard"
          }
        }
        return url
      }
    return (
    <Menu mode="horizontal" selectable={false}>

        <Menu.Item key="index" className={isHome} icon={<MailOutlined />}>
            <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="shop" className={isShop} icon={<ShopOutlined />}>
            <Link to="/shop">商城</Link>
        </Menu.Item>
        
        {//登录时进行隐藏
          !isAuth() && (
            <>
                <Menu.Item key="login" className={isSignin} icon={<MailOutlined />}>
                    <Link to="/signin">登录</Link>
                </Menu.Item>
                <Menu.Item key="register" className={isSignup} icon={<ShopOutlined />}>
                    <Link to="/signup">注册</Link>
                </Menu.Item>
            </>
        )
        // 当登录时 isAuth返回true 无登录时 isAuth返回false 那么对isAuth进行取否
        //然后用与&&短路与来判断后面是否执行
        // 不能用|| 短路或判断 因为进行登录时 isAuth返回true 就不执行||右边的式子 
        //直接返回isAuth的数据 导致页面出错
        }
        
        
       {//登录时根据role选择跳转显示 
          isAuth() &&  (
           <>
                <Menu.Item key="my" className={isDashboard} icon={<PhoneOutlined />}>
                    <Link to={getDashboarUrl()}>我的</Link>
                </Menu.Item>
                <Menu.SubMenu key="SubMenu" title="设置" icon={<SettingOutlined/>}>
                    <Menu.Item key="two" icon={<AppstoreOutlined />}>
                        dashboard1
                    </Menu.Item>
                    <Menu.Item key="three" icon={<AppstoreOutlined />}>
                        dashboard2
                    </Menu.Item>
                </Menu.SubMenu>
           </>
       )}
    </Menu>
    )
}