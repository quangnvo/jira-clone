import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';

// --------- Import Ant Degisn ---------
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd'

// --------- Import Formik, Yup -----------
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { ADD_HANDLE_SUBMIT_FUNCTION, EDIT_USER_SAGA } from '../../redux/constants/constants';


function FormEditUser(props) {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({
            type: ADD_HANDLE_SUBMIT_FUNCTION,
            handleSubmitFunction: handleSubmit
        })
    }, [])

    return (
        <div>
            <h3 className='text-center mt-2'>Edit user</h3>

            <div className='text-center mt-3 font-weight-bold'>
                <span className='mr-1'>User ID: </span>
                <Tag color="cyan">{values.id}</Tag>
            </div>

            <form className='container text-center'>

                {/* Name */}
                <Input
                    value={values.name}
                    size="large"
                    className='mt-4 w-75'
                    name='name'
                    placeholder="Name"
                    prefix={<UserOutlined />}
                    onChange={handleChange}
                />
                <div className='text-danger'>{errors.name}</div>

                {/* Email */}
                <Input
                    value={values.email}
                    size="large"
                    className='mt-3 w-75'
                    name='email'
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    onChange={handleChange}
                />
                <div className='text-danger'>{errors.email}</div>

                {/* Phone number */}
                <Input
                    value={values.phoneNumber}
                    size="large"
                    className='mt-3 w-75'
                    name='phoneNumber'
                    placeholder="Phone number"
                    prefix={<PhoneOutlined />}
                    onChange={handleChange}
                />
                <div className='text-danger'>{errors.phoneNumber}</div>
            </form >
        </div>
    )
}



const phoneRegExp = /^[0-9]*$/

const FormEditUserWithFormik = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const { userInfoEdit } = props
        return {
            id: userInfoEdit?.userId,
            email: userInfoEdit?.email,
            name: userInfoEdit?.name,
            phoneNumber: userInfoEdit?.phoneNumber
        }
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: EDIT_USER_SAGA,
            editedUser: values
        })
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .matches(phoneRegExp, 'Phone number must be in number'),
    }),

    displayName: 'FormEditUser',
})(FormEditUser);


const mapStateToProps = (state) => ({
    userInfoEdit: state.DrawerReducer.userInfoEdit
})


export default connect(mapStateToProps)(FormEditUserWithFormik) 