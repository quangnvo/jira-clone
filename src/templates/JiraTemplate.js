import React, { useEffect, useState } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

// ---------- Import Ant Design ----------
import {
    UserOutlined,
    HomeOutlined,
    PlusOutlined,
    ProjectOutlined,
    BarsOutlined,
    PlusCircleOutlined,
    StarOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

// ---------- Import constants ----------
import {
    GET_USER_SAGA,
    OPEN_DRAWER_WITH_FORM_CREATE_TASK,
    USER_LOGIN
} from '../redux/constants/constants';

// ---------- Import lodash ----------
import _ from 'lodash';
import FormCreateTask from '../components/Forms/FormCreateTask';



const { Header, Content, Sider } = Layout;


export const JiraTemplate = (props) => {

    const yourProfileInforFromLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN))

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_USER_SAGA })
    }, [])

    const { allUser } = useSelector(state => state.UserReducer)


    const { history } = useSelector(state => state.HistoryReducer)

    const [state, setState] = useState({
        collapsed: false
    });
    const toggle = () => {
        setState({
            collapsed: !state.collapsed
        })
    }

    let { ComponentTruyenVao, ...restRoute } = props

    return <Route {...restRoute} render={(propsRoute) => {
        return <div className='row mr-0 ml-0' style={{ height: '100vh' }}>

            <Layout>
                {/* Sider Menu */}
                <Sider trigger={null} collapsible collapsed={state.collapsed}>

                    <div className='text-right text-white font-weight-bold p-2'><BarsOutlined style={{ cursor: 'pointer', fontSize: '1.3rem' }} onClick={toggle} /></div>

                    <Menu
                        theme="dark"
                        mode="inline"
                        className='p-1'
                        items={[
                            {
                                key: '1',
                                icon: <HomeOutlined />,
                                label: 'Home',
                                onClick: () => { history.push('/') }
                            },
                            {
                                key: '2',
                                icon: <StarOutlined />,
                                label: 'Your profile',
                                onClick: () => { history.push('/yourprofile') }
                            },
                            {
                                key: '3',
                                icon: <PlusOutlined />,
                                label: 'Create Task',
                                onClick: () => {
                                    dispatch({
                                        type: OPEN_DRAWER_WITH_FORM_CREATE_TASK,
                                        ComponentContentDrawer: <FormCreateTask />,
                                    })
                                }
                            },
                            {
                                key: '4',
                                icon: <PlusCircleOutlined />,
                                label: 'Create Project',
                                onClick: () => { history.push('/createproject') }
                            },
                            {
                                key: '5',
                                icon: <ProjectOutlined />,
                                label: 'Project Management',
                                onClick: () => { history.push('/projectmanagement') }
                            },
                            {
                                key: '6',
                                icon: <UserOutlined />,
                                label: 'User Management',
                                onClick: () => { history.push('/usermanagement') }
                            },
                        ]}
                    />
                </Sider>


                <Layout className='container-fluid'>
                    {/* Header  */}
                    <Header className='bg-light'>
                        <div className='font-weight-bold d-flex align-items-center justify-content-between'>

                            {/* Jira Clone App logo */}
                            <NavLink to='/'>
                                <span className='title-word title-word-1 wooden-text mediumTitle'>Jira </span>
                                <span className='title-word title-word-2 wooden-text mediumTitle'>Clone </span>
                                <span className='title-word title-word-3 wooden-text mediumTitle'>App</span>
                            </NavLink>


                            {/* Welcome user */}
                            <div>
                                <h5>
                                    <span>Welcome, </span>
                                    {(_.isEmpty(allUser)) ?
                                        <span>.....</span> :
                                        <span>
                                            <span className='mr-2'>{yourProfileInforFromLocalStorage.name}</span>
                                            <img src={yourProfileInforFromLocalStorage.avatar} alt='' style={{ borderRadius: '50%', width: '3rem' }} />
                                        </span>
                                    }
                                </h5>
                            </div>


                        </div>
                    </Header>


                    {/* Content */}
                    <Content className='mt-4'>
                        <ComponentTruyenVao {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>

        </div >
    }} />
}



