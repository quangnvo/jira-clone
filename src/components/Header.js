import React from 'react'
import { NavLink } from 'react-router-dom'
import { USER_LOGIN } from '../redux/constants/constants'



export default function Header() {

    let isButtonUserManagementDisplay = false
    let isButtonProjectManagementDisplay = false

    if (localStorage.getItem(USER_LOGIN)) {
        isButtonUserManagementDisplay = true
        isButtonProjectManagementDisplay = true
    }

    const renderButtonLogout = () => {
        if (localStorage.getItem(USER_LOGIN)) {
            return <li className="nav-item active bg-light mr-2" style={{ borderRadius: '7px' }}>
                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to="/logout">Logout</NavLink>
            </li>
        }
        return ''
    }


    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3">
                <h4 className='text-light mr-4'>JiraCloneApp</h4>

                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />

                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                        {/* Button User Management */}
                        {isButtonUserManagementDisplay ?

                            <li className="nav-item active bg-light mr-2 " style={{ borderRadius: '7px' }}>
                                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to='/yourprofile' >Your Profile</NavLink>
                            </li> :

                            <li className="nav-item active bg-light mr-2 " style={{ borderRadius: '7px' }}>
                                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to='/loginrequirenotification' >Your Profile</NavLink>
                            </li>}


                        {/* Button User Management */}
                        {isButtonUserManagementDisplay ?

                            <li className="nav-item active bg-light mr-2 " style={{ borderRadius: '7px' }}>
                                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to='/usermanagement' >User Management</NavLink>
                            </li> :

                            <li className="nav-item active bg-light mr-2 " style={{ borderRadius: '7px' }}>
                                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to='/loginrequirenotification' >User Management</NavLink>
                            </li>}



                        {/* Button Project Management */}
                        {isButtonProjectManagementDisplay ?

                            <li className="nav-item active bg-light mr-2" style={{ borderRadius: '7px' }}>
                                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to="/projectmanagement">Project Management</NavLink>
                            </li> :

                            <li className="nav-item active bg-light mr-2" style={{ borderRadius: '7px' }}>
                                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to="/loginrequirenotification">Project Management</NavLink>
                            </li>}
                    </ul>


                    <div className="form-inline my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                            {/* Button Signup */}
                            <li className="nav-item active bg-light mr-2 " style={{ borderRadius: '7px' }}>
                                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to="/signup">Sign Up</NavLink>
                            </li>


                            {/* Button Login */}
                            <li className="nav-item active bg-light mr-2" style={{ borderRadius: '7px' }}>
                                <NavLink className="nav-link text-dark font-weight-bold navLinkItem" to="/login">Login</NavLink>
                            </li>


                            {/* Button Logout */}
                            {renderButtonLogout()}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
