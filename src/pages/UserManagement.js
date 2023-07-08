import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'

// --------- Import Ant Design ---------
import { FileSearchOutlined } from '@ant-design/icons';
import { Input, Table, Popconfirm, Tag } from 'antd';

// --------- Import constant ---------
import { DELETE_USER_SAGA, GET_USER_SAGA, GET_USER_WITH_KEYWORD, OPEN_DRAWER_WITH_FORM_EDIT, OPEN_DRAWER_WITH_FORM_EDIT_USER } from '../redux/constants/constants';

// --------- Import formik ---------
import { withFormik } from 'formik';

// --------- Import others ---------
import FormEditUser from '../components/Forms/FormEditUser';



function UserManagement(props) {

    const {
        handleChange,
        handleSubmit,
    } = props;

    const dispatch = useDispatch();
    const { allUser } = useSelector(state => state.UserReducer)

    let allUseWithSerialNumber = allUser.map((user, index) => {
        return { ...user, demSoLuong: index + 1 }
    })


    useEffect(() => {
        dispatch({ type: GET_USER_SAGA })
    }, [])


    const columns = [
        {
            title: 'Number',
            dataIndex: 'demSoLuong',
            key: 'demSoLuong',
            sorter: (item2, item1) => {
                return item2.demSoLuong - item1.demSoLuong
            },
            sortDirections: ['descend']
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (item2, item1) => {
                let name1 = item1.name?.trim().toLowerCase();
                let name2 = item2.name?.trim().toLowerCase();
                if (name2 < name1) {
                    return -1
                }
                return 1
            },
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return <div>
                    {/* Button Edit */}
                    <button
                        className='btn btn-primary mr-2'
                        onClick={() => {
                            dispatch({
                                type: OPEN_DRAWER_WITH_FORM_EDIT_USER,
                                ComponentContentDrawer: <FormEditUser />,
                                userInfoEdit: record
                            })
                        }}
                    >
                        Edit
                    </button>


                    {/* Button Delete */}
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_USER_SAGA,
                                userId: record.userId
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className='btn btn-danger'>Delete</button>
                    </Popconfirm>
                </div>
            }
        },
    ];


    return (
        <div className=''>

            <h3 className='font-weight-bold mb-4'>User management</h3>

            {/* Button Sign up */}
            <NavLink to='/signup'>
                <button className='btn btn-warning font-weight-bold mb-2'>Create user (Sign up)</button>
            </NavLink>


            <div className='mt-3 text-center'>

                {/* Form search  */}
                <form className='form-group'>
                    <Input
                        name='keyword'
                        size="large"
                        placeholder="Type keyword to search here: ..."
                        prefix={<FileSearchOutlined />}
                        onChange={handleChange}
                    />

                    {/* Button Search */}
                    <button
                        className='btn btn-outline-dark mt-3 d-inline-block mr-3'
                        onClick={handleSubmit}
                    >
                        Search
                    </button>

                    {/* Button Load all users */}
                    <button
                        className='btn btn-outline-dark mt-3 d-inline-block'
                        onClick={() => { dispatch({ type: GET_USER_SAGA }) }}
                    >
                        Load all users
                    </button>
                </form>


                {/* Table user */}
                <div className='mt-4'>
                    <h5 className='mb-4 text-left font-weight-bold'>Total users: {allUser.length}</h5>

                    {/* Những user hiện tại không thể delete được */}
                    <div className='mb-4 text-left font-weight-bold'>
                        <h6 className='d-inline mr-1'>At the moment, you cannot delete the following users with ID: </h6>
                        <Tag color="volcano">2417</Tag>
                        <Tag color="volcano">2537</Tag>
                        <Tag color="volcano">2909</Tag>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={allUseWithSerialNumber}
                        rowKey={'id'}
                    />
                </div>



            </div>



        </div>
    )
}



const UserManagementWithFormik = withFormik({
    mapPropsToValues: () => ({
        keyword: '',
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: GET_USER_WITH_KEYWORD,
            keyword: values.keyword
        })
    },

    displayName: 'UserManagement',
})(UserManagement);



export default connect()(UserManagementWithFormik) 