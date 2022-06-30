import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isAuth } from "../../helpers/auth";

//继承路由
interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType <any>;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
    component: Component,
    ...rest
}) => {
    return <Route {...rest} render={props => {
                const auth = isAuth();
                console.log(auth);
                if (auth) {
                    return <Component {...props} />
                }
                return <Redirect to="/signin" />
            }
        }
        />
    
            
    
}