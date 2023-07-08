import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';

// ----------- Import ant design -----------
import {
	Avatar,
	Tag,
	Slider,
	Select,
	Popconfirm,
} from 'antd';

// ------------- Import tinymce -------------
import { Editor } from '@tinymce/tinymce-react';

// --------- Import parse ---------
import parse from 'html-react-parser';

// --------- Import lodash ---------
import _ from 'lodash';

// --------- Import Formik, Yup -----------
import { withFormik } from 'formik';

// --------- Import constants ---------
import {
	GET_ALL_PRIORITY_SAGA,
	GET_ALL_STATUS_SAGA,
	GET_ALL_TASK_TYPE_SAGA,
	UPDATE_ASSIGNEE_IN_TASK_MODAL,
	UPDATE_TASK_MODAL,
	REMOVE_ASSIGNEE_IN_TASK_MODAL,
	HANDLE_SERIES_CHANGE_MODAL_VA_POST_API_SAGA,
	INSERT_COMMENT_SAGA,
	DELETE_TASK_SAGA,
} from '../../redux/constants/constants';
import OneComment from '../OneComment';



function ModalTaskDetail(props) {

	const {
		values,
		errors,
		handleChange,
		handleSubmit,
		setFieldValue
	} = props;

	const { taskDetailModal } = useSelector(state => state.TaskReducer)
	const { arrStatus } = useSelector(state => state.ProjectReducer)
	const { arrPriority } = useSelector(state => state.ProjectReducer)
	const { arrTaskType } = useSelector(state => state.ProjectReducer)
	const { projectDetail } = useSelector(state => state.ProjectReducer)

	console.log('taskDetailModal: ', taskDetailModal);
	console.log('projectDetail: ', projectDetail);


	const [isEditorVisible, setIsEditorVisible] = useState(false)

	const [contentEditorBanDau, setContentEditorBanDau] = useState(taskDetailModal.description)
	const [contentEditorSauKhiEdit, setContentEditorSauKhiEdit] = useState(taskDetailModal.description)


	const [isEditorTaskNameVisible, setIsEditorTaskNameVisible] = useState(false)
	const [contentEditorTaskNameBanDau, setContentEditorTaskNameBanDau] = useState(taskDetailModal.taskName)
	const [contentEditorTaskNameSauKhiEdit, setContentEditorTaskNameSauKhiEdit] = useState(taskDetailModal.taskName)


	const handleChangeGiaTriTrongModal = (e) => {
		const { name, value } = e.target

		dispatch({
			type: HANDLE_SERIES_CHANGE_MODAL_VA_POST_API_SAGA,
			subActionType: UPDATE_TASK_MODAL,
			name,
			value
		})
	}


	const renderSliderInTimeTracking = () => {
		if (taskDetailModal.timeTrackingSpent === 0 && taskDetailModal.timeTrackingRemaining === 0) {
			return <p className='font-italic mb-1'>Time spent and remaining are not set yet !</p>
		} else {
			return <Slider
				value={taskDetailModal.timeTrackingSpent}
				max={Number(taskDetailModal.timeTrackingSpent) + Number(taskDetailModal.timeTrackingRemaining)}
			/>
		}
	}


	const renderAssigneeInTaskModal = () => {
		if (_.isEmpty(taskDetailModal.assigness)) {
			return <p className='mb-0 font-italic'>No assignees in this task</p>
		} else {
			return taskDetailModal.assigness.map((item, index) => {
				return <div
					key={index}
					className='container-fluid mt-2'
					style={{
						backgroundColor: '#fbeeee',
						height: 'auto',
						borderRadius: '6px',
						paddingTop: '0.5rem',
						paddingBottom: '0.5rem'
					}}
				>
					<div className='row'>
						<div className='col-2'>
							<Avatar size={38} src={item.avatar} />
						</div>
						<div className='col-8 d-flex justify-content-center align-items-center'>
							<h6 className=" ml-2 mr-2 mb-0">
								{item.name}
							</h6>
						</div>

						{/* Button remove assignee */}
						<div className='col-2 d-flex justify-content-center align-items-center'>
							<i
								className="fa-solid fa-xmark"
								style={{ cursor: 'pointer' }}
								onClick={() => {
									dispatch({
										type: HANDLE_SERIES_CHANGE_MODAL_VA_POST_API_SAGA,
										subActionType: REMOVE_ASSIGNEE_IN_TASK_MODAL,
										userId: item.id
									})
								}}
							>
							</i>
						</div>
					</div>
				</div >
			})
		}
	}


	const renderCommentOfUser = () => {
		if (_.isEmpty(taskDetailModal.lstComment)) {
			return <p className='font-italic'>No comment of any users</p>
		} else {
			let reverseListComment = [...taskDetailModal.lstComment].reverse()
			return reverseListComment.map((item, index) => {
				return <OneComment
					key={index}
					item={item}
					taskDetailModal={taskDetailModal}
					projectDetail={projectDetail}
				/>
			})
		}
	}


	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: GET_ALL_STATUS_SAGA })
		dispatch({ type: GET_ALL_PRIORITY_SAGA })
		dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
	}, [])

	return (
		<div className="modal fade" id="infoModal" tabIndex={-1} role="dialog">
			<div className="modal-dialog modal-info">
				<div className="modal-content">

					{/* Modal Header */}
					<div className="modal-header">

						{/* Task ID */}
						<span className='ml-0 font-weight-bold'>
							<span className='mr-1'>Task ID : </span>
							<Tag color="cyan">{taskDetailModal.taskId}</Tag>
						</span>

						{/* Button Close */}
						<button type="button" className="close" data-dismiss="modal">
							<span>x</span>
						</button>
					</div>



					{/* Modal body */}
					<div className="modal-body">
						<div className="container-fluid">
							<div className="row">

								{/* ---------- Left side ----------*/}
								<div className="col-8">

									{/* Task name */}
									<div>
										<h6 className='font-weight-bold align-middle'>Task name:</h6>
										<div
											style={{
												backgroundColor: '#efefef',
												borderRadius: '7px',
												paddingTop: '10px',
												paddingBottom: '8px',
												paddingLeft: '20px',
												paddingRight: '20px',
												fontSize: '1.1rem'
											}}
										>
											{taskDetailModal.taskName}
										</div>
									</div>


									{/* Description */}
									<div className='mt-3'>
										<div className='mb-2 d-flex justify-content-between align-items-center'>
											<h6 className='font-weight-bold align-middle'>Task description:</h6>

											{/* Button edit description */}
											<button
												className='btn btn-outline-dark text-right'
												onClick={() => {
													setContentEditorBanDau(taskDetailModal.description)
													setIsEditorVisible(true)
												}}
											>
												Edit description
											</button>
										</div>

										<div>
											{isEditorVisible ?
												// Nếu hiện Editor cho description
												<div>
													<Editor
														initialValue={taskDetailModal.description}
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
														onEditorChange={(contentNguoiDungNhap, editor) => {
															setContentEditorSauKhiEdit(contentNguoiDungNhap)
														}}
													/>
													<div className='mt-3'>

														{/* Button Close for edit description */}
														<button
															className='btn btn-outline-dark mr-2'
															onClick={() => {
																dispatch({
																	type: HANDLE_SERIES_CHANGE_MODAL_VA_POST_API_SAGA,
																	subActionType: UPDATE_TASK_MODAL,
																	name: 'description',
																	value: contentEditorBanDau
																})

																setIsEditorVisible(false)
															}}
														>
															Close
														</button>


														{/* Button Save for edit description */}
														<button
															className='btn btn-success'
															onClick={() => {
																dispatch({
																	type: HANDLE_SERIES_CHANGE_MODAL_VA_POST_API_SAGA,
																	subActionType: UPDATE_TASK_MODAL,
																	name: 'description',
																	value: contentEditorSauKhiEdit
																})
																setIsEditorVisible(false)
															}}
														>
															Save
														</button>
													</div>
												</div> :


												// Nếu không hiện description Editor
												<div
													style={{
														backgroundColor: '#eeecf1',
														borderRadius: '7px',
														paddingTop: '10px',
														paddingBottom: '8px',
														paddingLeft: '20px',
														paddingRight: '20px'
													}}
												>
													{parse(taskDetailModal.description)}
												</div>
											}
										</div>
									</div>

									<hr style={{
										marginTop: '3.5rem',
										border: 0,
										height: '2px',
										background: '#333',
										backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)'
									}}></hr>

									{/* Comment */}
									<div className="comment">
										<h6 className='mb-2 mt-4 font-weight-bold'>Comment</h6>

										<p className='mb-0 font-italic'>
											<span className='mr-2'>Write your comment</span>
											<i style={{ fontSize: '1rem' }} className="fa-regular fa-face-smile"></i>
										</p>

										{/* Comment input */}
										<div className='mt-2'>
											<Editor
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
										</div>


										{/* Button post comment */}
										<button
											className='btn btn-success mt-3'
											onClick={() => handleSubmit()}
										>
											Post comment
										</button>
									</div>


									<hr style={{
										marginTop: '2rem',
										border: 0,
										height: '2px',
										background: '#333',
										backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)'
									}}></hr>

									{/* Comment section of users */}
									<div>
										{renderCommentOfUser()}
									</div>

								</div>


								{/* ---------- Right side ----------*/}
								<div className="col-4">
									<div className='mb-3'>
										<span className='font-weight-bold mr-2'>Lưu ý: </span>
										<span>Bạn chỉ có thể thay đổi những thông tin dưới đây nếu Task này thuộc Project của bạn !</span>
									</div>


									{/* Status */}
									<div>
										<h6 className='font-weight-bold'>Status</h6>
										<select
											name='statusId'
											className='form-control'
											onChange={(e) => { handleChangeGiaTriTrongModal(e) }}
										>
											{arrStatus?.map((item, index) => {
												if (item.statusId == taskDetailModal.statusId) {
													return <option key={index} selected value={item.statusId}>{item.statusName}</option>
												} else {
													return <option key={index} value={item.statusId}>{item.statusName}</option>
												}
											})}
										</select>
									</div>


									{/* Task Type */}
									<div className='mt-4'>
										<h6 className='font-weight-bold'>Task type</h6>
										<select
											name='typeId'
											className='form-control'
											onChange={(e) => { handleChangeGiaTriTrongModal(e) }}
										>
											{arrTaskType.map((item, index) => {
												if (item.id == taskDetailModal.typeId) {
													return <option key={index} selected value={item.id}>{item.taskType}</option>
												} else {
													return <option key={index} value={item.id}>{item.taskType}</option>
												}
											})}
										</select>
									</div>


									{/* Assignees */}
									<div className="mt-4">
										<h6 className='font-weight-bold'>Assignees</h6>

										{/* Render tất cả assignees */}
										{renderAssigneeInTaskModal()}


										{/* Button Add more assignees */}
										<Select
											className='mt-2 w-100'
											placeholder='Add more assignee'
											optionFilterProp='label'
											value='Add more assignee'

											options={
												projectDetail.members?.filter(nguoiTrongProject => {
													let index = taskDetailModal.assigness?.findIndex(nguoiTrongTask => nguoiTrongTask.id === nguoiTrongProject.userId)
													if (index !== -1) {
														return false
													}
													return true
												}).map((item, index) => {
													return {
														label: item.name,
														value: item.userId
													}
												})}

											onSelect={(value) => {
												let selectedUser = projectDetail.members?.find(nguoiTrongProject => nguoiTrongProject.userId == value)
												selectedUser = { ...selectedUser, id: selectedUser.userId }

												dispatch({
													type: HANDLE_SERIES_CHANGE_MODAL_VA_POST_API_SAGA,
													subActionType: UPDATE_ASSIGNEE_IN_TASK_MODAL,
													selectedUser
												})
											}}
										>
										</Select>
									</div>


									{/* Priority */}
									<div className="mt-4" style={{ marginBottom: 20 }}>
										<h6 className='font-weight-bold'>Priority</h6>
										<select
											className='form-control'
											name='priorityId'
											onChange={(e) => { handleChangeGiaTriTrongModal(e) }}
										>
											{/* Render priority select options */}
											{arrPriority?.map((item, index) => {
												if (item.priorityId == taskDetailModal.priorityId) {
													return <option
														key={index}
														selected
														value={item.priorityId}
													>
														{item.description}
													</option>
												} else {
													return <option
														key={index}
														value={item.priorityId}
													>
														{item.description}
													</option>
												}
											})}
										</select>
									</div>


									{/* Original estimate */}
									<div className='mt-4'>
										<h6 className='font-weight-bold mt-2'>Original estimate (hours)</h6>
										<input
											name='originalEstimate'
											type='number'
											className='form-control'
											value={taskDetailModal.originalEstimate}
											onChange={(e) => { handleChangeGiaTriTrongModal(e) }}
										/>
									</div>


									<div className='row mt-4'>

										{/* Time spent */}
										<div className='col-6'>
											<h6 className='font-weight-bold'>Time spent</h6>
											<input
												className='form-control'
												type='number'
												name='timeTrackingSpent'
												value={taskDetailModal.timeTrackingSpent}
												onChange={(e) => {
													handleChangeGiaTriTrongModal(e)
												}}
											/>
										</div>

										{/* Time remaining */}
										<div className='col-6'>
											<h6 className='font-weight-bold'>Time remaining</h6>
											<input
												className='form-control'
												type='number'
												name='timeTrackingRemaining'
												value={taskDetailModal.timeTrackingRemaining}
												onChange={(e) => {
													handleChangeGiaTriTrongModal(e)
												}}
											/>
										</div>
									</div>


									{/* Time tracking */}
									<div className='mt-4'>
										<h6 className='font-weight-bold mt-3'>Time tracking</h6>

										{renderSliderInTimeTracking()}

										<div className='d-flex justify-content-between'>
											<p>{taskDetailModal.timeTrackingSpent}h logged</p>
											<p>{taskDetailModal.timeTrackingRemaining}h remaining</p>
										</div>
									</div>


									{/* Button Delete Task*/}
									<div className='text-right'>
										<Popconfirm
											title="Are you sure to delete this task?"
											onConfirm={() => {
												dispatch({
													type: DELETE_TASK_SAGA,
													taskId: taskDetailModal.taskId,
													projectId: projectDetail.id
												})
											}}
											okText="Yes"
											cancelText="No"
										>
											<button className='btn btn-outline-danger'>Delete task</button>
										</Popconfirm>
									</div>


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}



const ModalTasktWithFormik = withFormik({
	enableReinitialize: true,

	mapPropsToValues: (props) => {
		return {
			description: ''
		}
	},

	handleSubmit: (values, { props, setSubmitting }) => {

		const { taskDetailModal, projectDetail } = props

		props.dispatch({
			type: INSERT_COMMENT_SAGA,
			commentOfUser: {
				taskId: taskDetailModal.taskId,
				contentComment: values.description,
				projectId: projectDetail.id
			}
		})
	},

	displayName: 'ModalTaskDetail',
})(ModalTaskDetail);


const mapStateToProps = (state) => ({
	taskDetailModal: state.TaskReducer.taskDetailModal,
	projectDetail: state.ProjectReducer.projectDetail
})


export default connect(mapStateToProps)(ModalTasktWithFormik) 