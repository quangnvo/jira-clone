import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';

// --------- Import Ant Degisn ---------
import {
    Select,
    Slider,
    Tag
} from 'antd'

// --------- Import Formik, Yup -----------
import { withFormik } from 'formik';
import * as Yup from 'yup';

// ------------- Import tinymce -------------
import { Editor } from '@tinymce/tinymce-react';

// ------------- Import lodash -------------
import _ from 'lodash';

// ------------- Import constants -------------
import {
    ADD_HANDLE_SUBMIT_FUNCTION,
    CREATE_TASK_SAGA,
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_PROJECT_CHO_DROPDOWN_SAGA,
    GET_ALL_STATUS_SAGA,
    GET_ALL_TASK_TYPE_SAGA,
    GET_ALL_USER_CHO_DROPDOWN_SAGA,
    GET_PROJECT_DETAIL_FOR_CREATE_TASK_SAGA,
} from '../../redux/constants/constants';




function FormCreateTask(props) {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;


    const { arrAllProjectDungDeDropDown } = useSelector(state => state.ProjectReducer)
    const { arrTaskType } = useSelector(state => state.ProjectReducer)
    const { arrPriority } = useSelector(state => state.ProjectReducer)
    const { arrAllUserDungDeDropDown } = useSelector(state => state.ProjectReducer)
    const { arrStatus } = useSelector(state => state.ProjectReducer)
    const { projectDetailOnlyForCreateTask } = useSelector(state => state.ProjectReducer)


    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    // Biến đổi mảng arrAllUserDungDeDropDown lấy về từ reducer để thành mảng assigneeOptions có dạng [{label:'',value:''},{label:'',value:''}] để dùng trong thuộc tính options của thẻ Select của Ant Design
    const assigneeOptions = arrAllUserDungDeDropDown.map((item, index) => {
        return {
            label: item.name,
            value: item.userId
        }
    })


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_CHO_DROPDOWN_SAGA })
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
        dispatch({ type: GET_ALL_PRIORITY_SAGA })
        dispatch({ type: GET_ALL_STATUS_SAGA })
        dispatch({
            type: ADD_HANDLE_SUBMIT_FUNCTION,
            handleSubmitFunction: handleSubmit
        })
    }, [])


    return (
        <div>
            <h3 className='text-center mt-2'>Create Task</h3>

            <h5 className='mt-4'>Lưu ý:</h5>
            <h6 className='ml-4'>- Bạn chỉ có thể tạo ra Task mới tại Project của bạn.</h6>
            <h6 className='ml-4'>- Nếu bạn chưa có project nào, bạn có thể tạo project mới <a href='/createproject'>Tại đây</a> .</h6>

            <form className='container-fluid'>

                <div className='row mt-5'>

                    {/* Project Name */}
                    <div className='col-7'>
                        <h6>Project name</h6>
                        <select
                            className='form-control'
                            name='projectId'
                            onChange={(e) => {
                                dispatch({
                                    type: GET_ALL_USER_CHO_DROPDOWN_SAGA,
                                    projectId: e.target.value
                                })
                                dispatch({
                                    type: GET_PROJECT_DETAIL_FOR_CREATE_TASK_SAGA,
                                    projectId: e.target.value
                                })
                                setFieldValue('projectId', e.target.value)
                            }}
                        >
                            {arrAllProjectDungDeDropDown?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.projectName}</option>
                            })}
                        </select>
                    </div>


                    {/* Project ID */}
                    <div className='col-2'>
                        <h6>Project ID</h6>
                        <Tag className='mt-2' color="cyan">{projectDetailOnlyForCreateTask.id}</Tag>
                    </div>

                    {/* Project creator */}
                    <div className='col-3'>
                        <h6>Project creator</h6>
                        <Tag className='mt-2' color="green">{projectDetailOnlyForCreateTask.creator.name}</Tag>
                    </div>

                    {/* Task Name */}
                    <div className='col-12 mt-4'>
                        <h6>Task name</h6>
                        <input
                            className='form-control'
                            name='taskName'
                            onChange={handleChange}
                        />
                        <div className='text-danger'>{errors.taskName}</div>
                    </div>


                    {/* Status */}
                    <div className='col-12 mt-4'>
                        <h6>Status</h6>
                        <select
                            className='form-control'
                            name='statusId'
                            onChange={handleChange}
                        >
                            {arrStatus?.map((item, index) => {
                                return <option key={index} value={item.statusId}>{item.statusName}</option>
                            })}
                        </select>
                    </div>


                    {/* Priority */}
                    <div className='col-6 mt-4'>
                        <h6>Priority</h6>
                        <select
                            className='form-control'
                            name='priorityId'
                            onChange={handleChange}
                        >
                            {arrPriority?.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })}
                        </select>
                    </div>


                    {/* Task type */}
                    <div className='col-6 mt-4'>
                        <h6>Task type</h6>
                        <select
                            className='form-control'
                            name='typeId'
                            onChange={handleChange}
                        >
                            {arrTaskType?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.taskType}</option>
                            })}
                        </select>
                    </div>


                    {/* Assignees */}
                    <div className='col-6 mt-4'>
                        <h6>Assignees</h6>
                        <Select
                            style={{ width: '100%', }}
                            mode="multiple"
                            size='large'
                            placeholder="Select assignees"
                            optionFilterProp='label'
                            options={assigneeOptions}
                            onSelect={(valueNguoiDungChon) => { }}
                            onChange={(tatCaValueNguoiDungChon) => {
                                setFieldValue('listUserAsign', tatCaValueNguoiDungChon)
                            }}
                        />
                    </div>


                    {/* Original estimate */}
                    <div className='col-6 mt-4'>
                        <h6>Original estimate</h6>
                        <input
                            className='form-control'
                            type='number'
                            defaultValue='0'
                            min='0'
                            name='originalEstimate'
                            onChange={handleChange}
                        />
                    </div>


                    {/* Time tracking */}
                    <div className='col-12 mt-4'>
                        <h6>Time tracking</h6>
                        <Slider
                            value={timeTracking.timeTrackingSpent}
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                        />
                    </div>

                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-6 text-left'>
                                {timeTracking.timeTrackingSpent}h logged
                            </div>
                            <div className='col-6 text-right'>
                                {timeTracking.timeTrackingRemaining}h remaining
                            </div>
                        </div>
                    </div>


                    {/* Time spent */}
                    <div className='col-6 mt-4'>
                        <h6>Time spent (hours)</h6>
                        <input
                            className='form-control'
                            type='number'
                            defaultValue='0'
                            min='0'
                            name='timeTrackingSpent'
                            onChange={(e) => {
                                setTimeTracking({
                                    ...timeTracking,
                                    timeTrackingSpent: e.target.value
                                })
                                setFieldValue('timeTrackingSpent', e.target.value)
                            }}
                        />
                    </div>


                    {/* Time remaining */}
                    <div className='col-6 mt-4'>
                        <h6>Time remaining (hours)</h6>
                        <input
                            className='form-control'
                            type='number'
                            defaultValue='0'
                            min='0'
                            name='timeTrackingRemaining'
                            onChange={(e) => {
                                setTimeTracking({
                                    ...timeTracking,
                                    timeTrackingRemaining: e.target.value
                                })
                                setFieldValue('timeTrackingRemaining', e.target.value)
                            }}
                        />
                    </div>


                    {/* Description */}
                    <div className='col-12 mt-4'>
                        <h6>Description</h6>
                        <Editor
                            value={values.description}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(content, editor) => {
                                setFieldValue('description', content)
                            }}
                        />
                        <div className='text-danger'>{errors.description}</div>

                    </div>
                </div>
            </form >
        </div>

    )
}


const FormCreateTasktWithFormik = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const { arrAllProjectDungDeDropDown, arrTaskType, arrPriority, arrStatus } = props

        if (!_.isEmpty(arrAllProjectDungDeDropDown)) {
            props.dispatch({
                type: GET_ALL_USER_CHO_DROPDOWN_SAGA,
                projectId: arrAllProjectDungDeDropDown[0].id
            })
        }

        if (!_.isEmpty(arrAllProjectDungDeDropDown)) {
            props.dispatch({
                type: GET_PROJECT_DETAIL_FOR_CREATE_TASK_SAGA,
                projectId: arrAllProjectDungDeDropDown[0].id
            })
        }

        return {
            listUserAsign: [],
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrAllProjectDungDeDropDown[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId
        }
    },

    validationSchema: Yup.object().shape({
        taskName: Yup.string()
            .required('Task name is required'),
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_TASK_SAGA,
            newTask: values
        })
    },

    displayName: 'FormCreateTask',
})(FormCreateTask);


const mapStateToProps = (state) => ({
    arrAllProjectDungDeDropDown: state.ProjectReducer.arrAllProjectDungDeDropDown,
    arrTaskType: state.ProjectReducer.arrTaskType,
    arrPriority: state.ProjectReducer.arrPriority,
    arrStatus: state.ProjectReducer.arrStatus,
})


export default connect(mapStateToProps)(FormCreateTasktWithFormik) 