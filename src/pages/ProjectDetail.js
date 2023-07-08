import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// --------- Import constants ---------
import {
    DELETE_TASK_SAGA,
    GET_PROJECT_DETAIL_SAGA,
    GET_TASK_DETAIL_SAGA
} from '../redux/constants/constants';

// --------- Import ant design ---------
import {
    Avatar,
    Tag,
    Popover
} from 'antd';

// --------- Import lodash ---------
import _ from 'lodash';

// --------- Import parse ---------
import parse from 'html-react-parser';

// --------- Import others ----------
import ModalTaskDetail from '../components/Modals/ModalTaskDetail';


export default function ProjectDetail(props) {

    const dispatch = useDispatch()

    const { projectDetail } = useSelector(state => state.ProjectReducer)


    const renderMemberAvatar = () => {
        if (_.isEmpty(projectDetail?.members)) {
            return <h6 className='mt-2'>No member in this project</h6>
        } else {
            return projectDetail.members?.map((member, index) => {
                return <Popover
                    key={index}
                    content={member.name}
                    trigger="hover"
                >
                    <Avatar
                        size={40}
                        src={member.avatar}
                    />
                </Popover>
            })
        }
    }


    const renderPriorityOnCard = (task) => {
        switch (task.priorityTask.priorityId) {
            case 1:
                return <Tag color="red">High</Tag>
            case 2:
                return <Tag color="orange">Medium</Tag>
            case 3:
                return <Tag color="gold">Low</Tag>
            case 4:
                return <Tag color="green">Lowest</Tag>
            default:
                break;
        }
    }


    const renderAssigneeAvatar = (task) => {
        if (_.isEmpty(task.assigness)) {
            return <p className='font-italic mb-0'>No assignees in this task</p>
        }
        return task.assigness.map((assignee, index) => {
            return <Avatar key={index} src={assignee.avatar} />
        })
    }


    const renderCardTaskList = () => {
        return projectDetail.lstTask?.map((item, index) => {
            return <div
                className="card pb-2 pl-1 pr-1"
                style={{ width: '17rem', height: 'auto' }}
            >

                {/* Name of status block */}
                <div className="card-header font-weight-bold">
                    <h6>{item.statusName}</h6>
                </div>

                {/* List các task */}
                <div className="list-group list-group-flush">

                    {item.lstTaskDeTail.map((task, index) => {
                        return <div
                            className="list-group-item"
                            data-toggle="modal"
                            data-target="#infoModal"
                            onClick={() => {
                                dispatch({
                                    type: GET_TASK_DETAIL_SAGA,
                                    taskId: task.taskId
                                })
                            }}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '10px',
                                boxShadow: '10px 10px 5px -8px rgba(0,0,0,0.75)',
                            }}>

                            {/* Task name */}
                            <p className='mb-1'>
                                <span className='font-weight-bold mr-1'>Task name:</span>
                                {task.taskName}
                            </p>

                            {/* Task ID */}
                            <p className='mb-1'>
                                <span className='font-weight-bold mr-1'>Task ID:</span>
                                {task.taskId}
                            </p>

                            {/* Priority */}
                            <p className='mb-1'>
                                <span className='font-weight-bold mr-1'>Priority:</span>
                                {renderPriorityOnCard(task)}
                            </p>

                            {/* Task type */}
                            <p className='mb-1'>
                                <span className='font-weight-bold mr-1'>Task type:</span>
                                {task.taskTypeDetail.taskType}
                            </p>

                            {/* Time spent */}
                            <p className='mb-1'>
                                <span className='font-weight-bold mr-1'>Time spent:</span>
                                {task.timeTrackingSpent}
                                <span>h</span>
                            </p>

                            {/* Time remaining */}
                            <p className='mb-1'>
                                <span className='font-weight-bold mr-1'>Time remaining:</span>
                                {task.timeTrackingRemaining}
                                <span>h</span>
                            </p>

                            {/* Assignees avatar */}
                            <div className='text-right mb-1'>
                                {renderAssigneeAvatar(task)}
                            </div>

                        </div>
                    })}
                </div>
            </div>
        })
    }


    useEffect(() => {
        const { projectId } = props.match.params
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId
        })
    }, [])

    return (
        <div>
            {/* ---------- Main board ----------*/}
            <div className="main">
                <h3 className='font-weight-bold mb-4'>Project detail</h3>

                {/* Table project id, project name, category, project creator, description */}
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-7'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th><h6 className='font-weight-bold'>Project ID</h6></th>
                                        <th><h6 className='font-weight-bold'>Project name</h6></th>
                                        <th><h6 className='font-weight-bold'>Category</h6></th>
                                        <th><h6 className='font-weight-bold'>Project creator</h6></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Tag color="cyan">{projectDetail.id}</Tag></td>
                                        <td><Tag color="geekblue">{projectDetail.projectName}</Tag></td>
                                        <td><Tag color="geekblue">{projectDetail.projectCategory.name}</Tag></td>
                                        <td><Tag color="green">{projectDetail.creator.name}</Tag></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='col-5'>
                            <h6 className='font-weight-bold'>Description: </h6>
                            <span>{parse(projectDetail.description)}</span>
                        </div>
                    </div>
                </div>

                {/* Table shows members of project */}
                <div className='container-fluid d-flex mt-2'>
                    <h6 className='font-weight-bold align-middle mb-5 mr-3 pt-2'>Members : </h6>
                    <div className="d-flex">
                        {renderMemberAvatar()}
                    </div>
                </div>


                {/* Cards */}
                <div className="content mb-5" style={{ display: 'flex' }}>
                    {renderCardTaskList()}
                </div>
            </div>


            {/* ---------- Info modal ----------*/}
            <ModalTaskDetail />

        </div>
    )
}
