import React from 'react'

export default function PageChuyenGiao() {
    return (
        <>
            <h1 className='mt-3 text-center' style={{ letterSpacing: '0.05rem' }}>You need to login before using Jira Clone App</h1>
            <h3 className='mt-2 text-center' style={{ letterSpacing: '0.1rem' }}>If you don't have account yet, please sign up !</h3>

            <div className='text-center mt-4'>
                <img
                    src={require('../assets/img/pageChuyenGiaoPicture.gif')}
                    alt='pageChuyenGiaoPicture'
                    width={450}
                />
            </div>
        </>
    )
}
