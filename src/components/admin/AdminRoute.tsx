import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isAuth } from "../../helpers/auth";
import { Jwt } from "../../store/models/auth";

//继承路由
interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType <any>;
}

export const AdminRoute: FC<PrivateRouteProps> = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                const auth = isAuth();
                if (auth) {
                    const { user: { role } } = auth as Jwt;
                    if(role === 1) {
                        return <Component {...props} />
                    } 
                }
                return <Redirect to="/signin" />
            }}
        />
            
    )
}