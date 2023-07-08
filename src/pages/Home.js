import React from 'react'
import Header from '../components/Header'

// Import CSS file
import '../BaiTapJira.css'

// Import ant design
import { Avatar } from 'antd';

// Import lodash
import _ from 'lodash';

// Import constants
import { USER_LOGIN } from '../redux/constants/constants';



export default function Home() {

    const renderHelloUser = () => {
        if (localStorage.getItem(USER_LOGIN)) {

            let yourProfileInforFromLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN))

            return <>
                <img
                    style={{ maxWidth: '200px' }}
                    src={require('../assets/img/helloPicture.gif')}
                    alt='helloPictureGif'
                    className='d-inline'
                />
                <h3 style={{ letterSpacing: '0.12rem' }} className='d-inline'>
                    <span className='font-weight-bold mr-3'> {yourProfileInforFromLocalStorage.name}</span>
                    <Avatar src={yourProfileInforFromLocalStorage.avatar} size={50} />
                    <span> - welcome to JiraCloneApp !</span>
                </h3>
            </>
        }
        return ''
    }


    return (
        <div>

            {/* Header at Home page */}
            <Header />

            {/* User infor after login will be loaded at here */}
            {renderHelloUser()}

            {/* Jira Clone App words */}
            <h1
                className='text-center font-weight-bold'
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)'
                }}
            >
                <span className='title-word title-word-1 wooden-text bigTitle'>Jira </span>
                <span className='title-word title-word-2 wooden-text bigTitle'>Clone </span>
                <span className='title-word title-word-3 wooden-text bigTitle'>App</span>
            </h1>
            
        </div >
    )
}
