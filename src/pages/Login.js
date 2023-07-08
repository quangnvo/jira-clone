import React from 'react'
import { connect } from 'react-redux';

// --------- Import ant design ---------
import { Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons'

// --------- Import formik ---------
import { withFormik } from 'formik';
import * as Yup from 'yup';

// --------- Import others ---------
import { jiraAction } from '../redux/actions/JiraAction';


function Login(props) {

    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;


    return (
        <form className='container'>
            <div className='d-flex justify-content-center align-items-center flex-column' style={{ height: '100vh' }}>
                <div className='mb-3 font-weight-bold'>
                    <span className='title-word title-word-1 wooden-text mediumTitle'>Jira </span>
                    <span className='title-word title-word-2 wooden-text mediumTitle'>Clone </span>
                    <span className='title-word title-word-3 wooden-text mediumTitle'>App</span>
                </div>

                <h3 className='font-weight-bold'>Login</h3>

                {/* Email */}
                <Input size="large"
                    className='mt-2 w-50'
                    name='email'
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    onChange={handleChange}
                />
                <div className='text-danger'>{errors.email}</div>


                {/* Password */}
                <Input
                    size="large"
                    type='password'
                    className='mt-2 w-50'
                    name='passWord'
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    onChange={handleChange}
                />
                <div className='text-danger'>{errors.passWord}</div>


                {/* Button Login */}
                <button
                    type='submit'
                    className='btn btn-dark mt-4 w-25 font-weight-bold'
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </div>
        </form >
    )
}



const LoginWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        passWord: '',
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(jiraAction.signinAction(values))
    },

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        passWord: Yup.string()
            .required('Password is required')
            .min(6, 'Password must has min 6 characters')
            .max(32, 'Password only has max 32 characters'),
    }),

    displayName: 'Login',
})(Login);



export default connect()(LoginWithFormik) 