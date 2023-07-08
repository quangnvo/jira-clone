import React, { useEffect } from 'react'
import { USER_LOGIN, TOKEN } from '../redux/constants/constants'



export default function Logout() {

    useEffect(() => {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(USER_LOGIN)
    }, [])

    return (
        <>
            <h1 className='mt-5 text-center' style={{ letterSpacing: '0.05rem' }}>Thank you for choosing Jira Clone App, see you again !</h1>

            <div className='text-center mt-4'>
                <img
                    src={require('../assets/img/byebyePicture.gif')}
                    alt='byebyePicture'
                    width={400}
                />
            </div>
        </>
    )
}
