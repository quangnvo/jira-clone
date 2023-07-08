import React, { useState } from 'react'

// ---------- Import ant design ----------
import { Avatar, Popconfirm, Tag } from 'antd'

// ------------- Import tinymce -------------
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, connect } from 'react-redux';

// --------- Import parse ---------
import parse from 'html-react-parser';

// --------- Import sweet alert ---------
import Swal from 'sweetalert2'

// --------- Import Formik, Yup -----------
import { withFormik } from 'formik';

// --------- Import constants ---------
import { DELETE_COMMENT_SAGA, GHI_NHO_COMMENT_ID_KHI_NHAP_EDIT_COMMENT, UPDATE_COMMENT_SAGA, USER_LOGIN } from '../redux/constants/constants';




function OneComment(props) {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const userInformationLayTuLocalStorage = JSON.parse(localStorage.getItem(USER_LOGIN))

    const [isCommentEditorVisible, setIsCommentEditorVisible] = useState(false)

    const { item, taskDetailModal, projectDetail } = props

    const dispatch = useDispatch()

    return <div className='row m-0 mt-3'>

        {/* Avatar of comment user */}
        <div className='col-1 d-flex p-0'>
            <Avatar size={38} src={item.avatar} />
        </div>

        {/* Comment showing box */}
        <div
            className='col-11'
            style={{
                backgroundColor: '#f3f3f4',
                borderRadius: '10px',
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '20px',
                paddingRight: '20px'
            }}
        >
            <div className='row mb-2'>

                {/* Name of user comment */}
                <div className='col-6'>
                    <p className='font-weight-bold mb-0'>{item.name}</p>
                </div>

                {/* Comment ID */}
                <div className='col-6 text-right'>
                    Comment id : <Tag color="geekblue">{item.id}</Tag>
                </div>
            </div>


            {isCommentEditorVisible ?
                <div>
                    <Editor
                        initialValue={item.commentContent}
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
                            setFieldValue('commentEditedContent', contentNguoiDungNhap)
                            console.log('content nguoi dung nhap', contentNguoiDungNhap);
                        }}
                    />
                    <div className='mt-3'>

                        {/* Button Close edit comment */}
                        <button
                            className='btn btn-outline-dark mr-2'
                            onClick={() => {
                                setIsCommentEditorVisible(false)
                            }}
                        >
                            Close
                        </button>


                        {/* Button Save edit comment */}
                        <button
                            className='btn btn-success'
                            onClick={() => {
                                handleSubmit()
                                setIsCommentEditorVisible(false)
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div> :

                <div>

                    <div>{parse(item.commentContent)}</div>

                    <div>
                        {/* Button Edit Comment */}
                        <span
                            style={{
                                textShadow: '2px 1px 1px #CCCCCC',
                                color: 'blue',
                                cursor: 'pointer'
                            }}
                            className='mr-1'
                            onClick={() => {
                                if (userInformationLayTuLocalStorage.id !== item.idUser) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Cannot edit comment',
                                        text: 'Bạn không thể edit comment này vì bạn không phải người tạo comment này !',
                                    })
                                } else {
                                    dispatch({
                                        type: GHI_NHO_COMMENT_ID_KHI_NHAP_EDIT_COMMENT,
                                        commentID: item.id
                                    })
                                    setIsCommentEditorVisible(true)
                                }
                            }}
                        >
                            Edit
                        </span>

                        <span>-</span>

                        {/* Button Delete Comment */}
                        <Popconfirm
                            title="Are you sure to delete this comment?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                if (userInformationLayTuLocalStorage.id !== item.idUser) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Cannot delete comment',
                                        text: 'Bạn không thể xóa comment này vì bạn không phải người tạo comment này !',
                                    })
                                } else {
                                    dispatch({
                                        type: DELETE_COMMENT_SAGA,
                                        commentId: item.id,
                                        taskId: taskDetailModal.taskId,
                                        projectId: projectDetail.id
                                    })
                                }
                            }}
                        >
                            <span
                                style={{
                                    textShadow: '2px 1px 1px #CCCCCC',
                                    color: 'red',
                                    cursor: 'pointer'
                                }}
                                className='ml-1'
                            >
                                Delete
                            </span>
                        </Popconfirm>
                    </div>
                </div>
            }
        </div>
    </div>
}



const OneCommentWithFormik = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        return {
            commentEditedContent: ''
        }
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        const { commentIdTuReducer, taskDetailModal, projectDetail } = props

        props.dispatch({
            type: UPDATE_COMMENT_SAGA,
            commentObject: {
                id: commentIdTuReducer,
                contentComment: values.commentEditedContent,
                projectId: projectDetail.id,
                taskId: taskDetailModal.taskId
            }
        })
    },

    displayName: 'OneComment',
})(OneComment);


const mapStateToProps = (state) => ({
    commentIdTuReducer: state.TaskReducer.commentIdTuReducer,
    taskDetailModal: state.TaskReducer.taskDetailModal,
    projectDetail: state.ProjectReducer.projectDetail
})


export default connect(mapStateToProps)(OneCommentWithFormik) 