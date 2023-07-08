import React, { useEffect, useState } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { Layout } from 'antd';



const { Sider, Content } = Layout

export const SignUpTemplate = (props) => {

    let { ComponentTruyenVao, propBackground, ...restRoute } = props

    const [size, setSize] = useState({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight)
    })

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    }, [])


    const renderSider = () => {
        return <Sider
            width={size.width / 2}
            style={{
                height: size.height,
                backgroundImage: `url(${propBackground})`,
                backgroundSize: 'cover'
            }}
        >
            {/* Button Back to home */}
            <NavLink className='text-light' to='/'>
                <button className='btn btn-dark mt-4 ml-4'>Back to home</button>
            </NavLink>

        </Sider>
    }


    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Layout>
                {/* Sider */}
                {renderSider()}


                {/* Content */}
                <Content>
                    <ComponentTruyenVao {...propsRoute} />
                </Content>
            </Layout>
        </>
    }} />
}