import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// --------- Import Ant Degisn ---------
import { Drawer, Space } from 'antd'

// --------- Import constants ---------
import { CLOSE_DRAWER } from '../redux/constants/constants';



export default function DrawerHOC(props) {

    const { isDrawerVisible, ComponentContentDrawer } = useSelector(state => state.DrawerReducer)
    const dispatch = useDispatch()

    const closeDrawer = () => {
        dispatch({ type: CLOSE_DRAWER })
    };

    const { handleSubmitFunction } = useSelector(state => state.DrawerReducer)

    return (
        <>
            <Drawer
                title="Jira Clone App"
                width={720}
                onClose={closeDrawer}
                open={isDrawerVisible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        {/* Button Cancel */}
                        <button className='btn btn-outline-dark' onClick={closeDrawer}>Cancel</button>

                        {/* Button Submit */}
                        <button className='btn btn-success' onClick={handleSubmitFunction}>Submit</button>
                    </Space>
                }
            >

                {/* Add Component (Form cần đưa vào) into drawer */}
                {ComponentContentDrawer}

            </Drawer>
        </>
    )
}