import React from 'react'
import { useDispatch } from 'react-redux';
import { OPEN_DRAWER_WITH_FORM_EDIT_USER, USER_LOGIN } from '../redux/constants/constants';
import FormEditUser from '../components/Forms/FormEditUser';


export default function YourProfile() {

    const dispatch = useDispatch()

    if (localStorage.getItem(USER_LOGIN)) {

        var yourProfileInforFromLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN))

        var yourProfileInforFromLocalStorageThemThuocTinhUserID = {
            ...yourProfileInforFromLocalStorage,
            userId: yourProfileInforFromLocalStorage.id
        }
    }


    return (
        <div>
            <h3 className='font-weight-bold mb-4'>Your profile</h3>

            <div className='container mt-5'>
                <div className='row'>

                    {/* Picture gif */}
                    <div className='col-5 text-center'>
                        <img
                            src={require('../assets/img/profilePicture.gif')}
                            alt='profileGif'
                            width={230}
                        />
                    </div>

                    <div className='col-7'>

                        {/* User ID */}
                        <div className='row mt-3'>
                            <div className='col-3'>
                                <h4 className='font-weight-bold'>User ID </h4>
                            </div>
                            <div className='col-9'>
                                <h4>{yourProfileInforFromLocalStorageThemThuocTinhUserID.id}</h4>
                            </div>
                        </div>


                        {/* Name */}
                        <div className='row mt-3'>
                            <div className='col-3 '>
                                <h4 className='font-weight-bold'>Name </h4>
                            </div>
                            <div className='col-9'>
                                <h4>{yourProfileInforFromLocalStorageThemThuocTinhUserID.name}</h4>
                            </div>
                        </div>

                        {/* Email */}
                        <div className='row mt-3'>
                            <div className='col-3 '>
                                <h4 className='font-weight-bold'>Email</h4>
                            </div>
                            <div className='col-9'>
                                <h4>{yourProfileInforFromLocalStorageThemThuocTinhUserID.email}</h4>
                            </div>
                        </div>

                        {/* Phone number */}
                        <div className='row mt-3'>
                            <div className='col-3 '>
                                <h4 className='font-weight-bold'>Phone </h4>
                            </div>
                            <div className='col-9'>
                                <h4>{yourProfileInforFromLocalStorageThemThuocTinhUserID.phoneNumber}</h4>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-3 '></div>
                            <div className='col-9'>

                                {/* Button Edit profile */}
                                <button
                                    className='btn btn-outline-dark'
                                    onClick={() => {
                                        dispatch({
                                            type: OPEN_DRAWER_WITH_FORM_EDIT_USER,
                                            ComponentContentDrawer: <FormEditUser />,
                                            userInfoEdit: yourProfileInforFromLocalStorageThemThuocTinhUserID
                                        })
                                    }}
                                >
                                    Edit your profile
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
