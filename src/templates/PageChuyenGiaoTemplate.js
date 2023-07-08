import React from 'react'
import { NavLink, Route } from 'react-router-dom'


export const PageChuyenGiaoTemplate = (props) => {

    let { ComponentTruyenVao, ...restRoute } = props

    return <Route {...restRoute} render={(propsRoute) => {
        return <div className='container-fluid'>
            <div className='d-flex justify-content-between p-4'>
                <div className='d-flex justify-content-center align-items-center'>
                    {/* Button Back to home */}
                    <NavLink className='text-light' to='/'>
                        <button className='btn btn-outline-dark  ml-4 mr-2'>Back to home</button>
                    </NavLink>

                    {/* Button Login */}
                    <NavLink className='text-light' to='/login'>
                        <button className='btn btn-dark  mr-2'>Login</button>
                    </NavLink>

                    {/* Button Signup */}
                    <NavLink className='text-light' to='/signup'>
                        <button className='btn btn-warning '>Sign Up</button>
                    </NavLink>
                </div>

                <div>
                    <span className='title-word title-word-1 wooden-text mediumTitle'>Jira </span>
                    <span className='title-word title-word-2 wooden-text mediumTitle'>Clone </span>
                    <span className='title-word title-word-3 wooden-text mediumTitle'>App</span>
                </div>
            </div>

            <div className='mb-5'>
                <ComponentTruyenVao {...propsRoute} />
            </div>

        </div>
    }} />
}