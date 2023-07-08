import React from 'react'
import { connect } from 'react-redux';

// Import ant design
import { Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'

// Import formik and yup
import { withFormik } from 'formik';
import * as Yup from 'yup';

// Import others
import { SIGN_UP_SAGA } from '../redux/constants/constants';
import { jiraAction } from '../redux/actions/JiraAction';



function SignUp(props) {

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

                <h3 className='font-weight-bold'>Sign up</h3>

                {/* Name */}
                <Input
                    size="large"
                    className='mt-4 w-50'
                    name='name'
                    placeholder="Name"
                    prefix={<UserOutlined />}
                    onChange={handleChange}
                />
                <div className='text-danger'>{errors.name}</div>


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



                {/* Email */}
                <Input size="large"
                    className='mt-2 w-50'
                    name='email'
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    onChange={handleChange}
                />
                <div className='text-danger'>{errors.email}</div>


                {/* Phone number */}
                <Input
                    size="large"
                    className='mt-2 w-50'
                    name='phoneNumber'
                    placeholder="Phone number"
                    prefix={<PhoneOutlined />}
                    onChange={handleChange}
                />
                <div className='text-danger'>{errors.phoneNumber}</div>


                {/* Button Register */}
                <button
                    type='submit'
                    className='btn btn-warning mt-4 w-25 font-weight-bold'
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </div>
        </form >
    )
}



const phoneRegExp = /^[0-9]*$/

const SignUpWithFormik = withFormik({
    mapPropsToValues: () => ({
        name: '',
        passWord: '',
        email: '',
        phoneNumber: ''
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(jiraAction.signupAction(values))
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        passWord: Yup.string()
            .required('Password is required')
            .min(6, 'Password must has min 6 characters')
            .max(32, 'Password only has max 32 characters'),
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .matches(phoneRegExp, 'Phone number must be in number'),
    }),

    displayName: 'SignUp',
})(SignUp);


export default connect()(SignUpWithFormik) 