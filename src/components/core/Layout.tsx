import { PageHeader } from 'antd';
import React, {FC} from 'react'
import { Navigation } from './Navigation';
interface Props {
    children: React.ReactNode,
    title: string,
    subTitle: string,

}
// console.log(API)
//页面布局
export  const Layout: FC<Props> = ({ children, title, subTitle}) => {
  //Navigation导航栏
  //PageHeader 登录炫彩头部
  //children 页面组件
  return (
    <div>
      <Navigation />
      <PageHeader className='jumbotron' title={title} subTitle={subTitle} />
      { children }
    </div>
    
  )
}
