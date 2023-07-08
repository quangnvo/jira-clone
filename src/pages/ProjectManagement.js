import React, { useEffect, useRef, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'

// --------- Import Ant Design ---------
import { FileSearchOutlined } from '@ant-design/icons';
import {
    Input,
    Table,
    Popconfirm,
    Tag, Avatar,
    Popover,
    AutoComplete
} from 'antd';

// --------- Import constant ---------
import {
    ASSIGN_USER_TO_PROJECT,
    DELETE_PROJECT_SAGA,
    GET_ALL_PROJECT_SAGA,
    GET_PROJECT_WITH_KEYWORD,
    GET_USER_WITH_KEYWORD_WITHOUT_LOADING,
    OPEN_DRAWER_WITH_FORM_EDIT_PROJECT,
    REMOVE_USER_FROM_PROJECT
} from '../redux/constants/constants';

// --------- Import formik ---------
import { withFormik } from 'formik';

// --------- Import others ---------
import FormEditProject from '../components/Forms/FormEditProject';
import { NavLink } from 'react-router-dom';




function ProjectMangement(props) {

    const {
        handleChange,
        handleSubmit,
    } = props;

    const dispatch = useDispatch();
    const { allProject } = useSelector(state => state.ProjectReducer)
    const { userSearchAutocomplete } = useSelector(state => state.UserReducer)


    let allProjectWithSerialNumber = allProject.map((user, index) => {
        return { ...user, demSoLuong: index + 1 }
    })

    const [valueDuaVaoAutoComplete, setValueDuaVaoAutoComplete] = useState('')

    const searchRef = useRef(null)

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA })
    }, [])


    const columns = [
        // -------- Numbers --------
        {
            title: 'Number',
            dataIndex: 'demSoLuong',
            key: 'demSoLuong',
            sorter: (item2, item1) => {
                return item2.demSoLuong - item1.demSoLuong
            },
            sortDirections: ['descend']
        },

        // -------- Project name --------
        {
            title: 'Project name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`}>
                    {text}
                </NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1
                }
                return 1
            },
        },

        // -------- Project ID --------
        {
            title: 'Project ID',
            dataIndex: 'id',
            key: 'id',
        },

        // -------- Category --------
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1
                }
                return 1
            },
        },

        // -------- Creator --------
        {
            title: 'Creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record?.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1
                }
                return 1
            },
        },

        // -------- Members --------
        {
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return (
                            <Popover
                                key={index}
                                title="Members"
                                content={() => {
                                    return <table className="table">

                                        <thead>
                                            <tr style={{ fontSize: '1rem' }}>
                                                <th>User ID</th>
                                                <th>Avatar</th>
                                                <th>Name</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {record.members?.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className='align-middle' style={{ fontSize: '1rem' }}>{item.userId}</td>
                                                    <td><Avatar size={37} src={item.avatar} /></td>
                                                    <td className='align-middle' style={{ fontSize: '1rem' }}>{item.name}</td>
                                                    <td>

                                                        {/* Button Remove User from project */}
                                                        <button
                                                            className='btn btn-outline-danger'
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: REMOVE_USER_FROM_PROJECT,
                                                                    projectAndUserId: {
                                                                        projectId: record.id,
                                                                        userId: item.userId
                                                                    }
                                                                })
                                                            }}
                                                        >
                                                            Remove
                                                        </button>

                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>

                                    </table>
                                }}
                            >
                                <Avatar
                                    key={index}
                                    size={41}
                                    src={member.avatar}
                                />
                            </Popover>
                        )
                    })}

                    {record.members?.length > 3 ?
                        <Popover
                            key={index}
                            title="Members"
                            content={() => {
                                return <table className="table">

                                    <thead>
                                        <tr style={{ fontSize: '1rem' }}>
                                            <th>User ID</th>
                                            <th>Avatar</th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {record.members?.map((item, index) => {
                                            return <tr key={index}>
                                                <td className='align-middle' style={{ fontSize: '1rem' }}>{item.userId}</td>
                                                <td><Avatar size={37} src={item.avatar} /></td>
                                                <td className='align-middle' style={{ fontSize: '1rem' }}>{item.name}</td>
                                                <td>

                                                    {/* Button Remove User from project */}
                                                    <button
                                                        className='btn btn-outline-danger'
                                                        onClick={() => {
                                                            dispatch({
                                                                type: REMOVE_USER_FROM_PROJECT,
                                                                projectAndUserId: {
                                                                    projectId: record.id,
                                                                    userId: item.userId
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        Remove
                                                    </button>

                                                </td>
                                            </tr>
                                        })}
                                    </tbody>

                                </table>
                            }}
                        >
                            <Avatar size={41}>...</Avatar>
                        </Popover> :
                        ''}


                    {/* Button Assign (add) user to project */}
                    <Popover
                        placement="rightTop"
                        trigger="click"
                        title={'Add user'}
                        content={() => {
                            return <AutoComplete
                                style={{ width: 200, }}
                                placeholder="Type user here"

                                value={valueDuaVaoAutoComplete}
                                onChange={(textNguoiDungNhapVao) => {
                                    setValueDuaVaoAutoComplete(textNguoiDungNhapVao)
                                }}

                                onSelect={(valueSelect, option) => {
                                    setValueDuaVaoAutoComplete(option.label)
                                    // Assign (thêm) user vào project
                                    dispatch({
                                        type: ASSIGN_USER_TO_PROJECT,
                                        projectAndUserId: {
                                            projectId: record.id,
                                            userId: option.value
                                        }
                                    })
                                }}

                                onSearch={(textNguoiDungNhapVao) => {

                                    if (searchRef.current) {
                                        clearTimeout(searchRef.current)
                                    }

                                    searchRef.current = setTimeout(() => {
                                        dispatch({
                                            type: GET_USER_WITH_KEYWORD_WITHOUT_LOADING,
                                            keyword: textNguoiDungNhapVao
                                        })
                                    }, 300);
                                }}

                                options={userSearchAutocomplete?.map((user, index) => {
                                    return {
                                        label: user.name,
                                        value: user.userId.toString()
                                    }
                                })}
                            />
                        }}
                    >
                        <button
                            className='btn btn-outline-primary'
                            style={{ borderRadius: '50%', fontSize: '1.05rem' }}
                        >
                            +
                        </button>
                    </Popover>

                </div>
            }
        },

        // -------- Action --------
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return <div>
                    {/* Button Edit Project*/}
                    <button
                        className='btn btn-primary mr-2'
                        onClick={() => {
                            dispatch({
                                type: OPEN_DRAWER_WITH_FORM_EDIT_PROJECT,
                                ComponentContentDrawer: <FormEditProject />,
                                projectInfoEdit: record
                            })
                        }}
                    >
                        Edit
                    </button>


                    {/* Button Delete Project*/}
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                projectId: record.id
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
        <div>

            <h3 className='font-weight-bold mb-4'>Project management</h3>

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
                        type='submit'
                    >
                        Search
                    </button>

                    {/* Button Load all projects */}
                    <button
                        className='btn btn-outline-dark mt-3 d-inline-block'
                        onClick={() => { dispatch({ type: GET_ALL_PROJECT_SAGA }) }}
                    >
                        Load all projects
                    </button>
                </form>

                {/* Table user */}
                <div className='mt-4'>

                    <h5 className='mb-4 text-left font-weight-bold'>Total projects: {allProject.length}</h5>

                    {/* Lưu ý section */}
                    <div className='mb-4'>
                        <h6 className='mb-2 text-left'><span className='font-weight-bold'>Lưu ý:</span> </h6>
                        <h6 className='text-left ml-4'>1. Bạn không thể thêm hoặc xóa member tại project của người khác</h6>
                        <h6 className='text-left ml-4'>2. Bạn có thể click vào tên của project để xem thông tin chi tiết của project đó</h6>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={allProjectWithSerialNumber}
                        rowKey={'id'}
                    />
                </div>
            </div>
        </div>
    )
}



const ProjectManagementWithFormik = withFormik({
    mapPropsToValues: () => ({
        keyword: '',
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: GET_PROJECT_WITH_KEYWORD,
            keyword: values.keyword
        })
    },

    displayName: 'ProjectManagement',
})(ProjectMangement);



export default connect()(ProjectManagementWithFormik) 