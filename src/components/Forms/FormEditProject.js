import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'

// --------- Import Ant Degisn ---------
import { Input, Tag } from 'antd'

// --------- Import Formik, Yup -----------
import { withFormik } from 'formik';

// ------------- Import tinymce -------------
import { Editor } from '@tinymce/tinymce-react';
import { ADD_HANDLE_SUBMIT_FUNCTION, EDIT_PROJECT_SAGA, GET_PROJECT_CATEGORY_SAGA } from '../../redux/constants/constants';

function FormEditProject(props) {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const dispatch = useDispatch()


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    const { projectCategory } = useSelector(state => state.ProjectReducer)

    useEffect(() => {
        dispatch({ type: GET_PROJECT_CATEGORY_SAGA })
        dispatch({
            type: ADD_HANDLE_SUBMIT_FUNCTION,
            handleSubmitFunction: handleSubmit
        })
    }, [])

    return (
        <div>
            <h3 className='text-center mt-2'>Edit project</h3>

            <div className='text-center mt-3 font-weight-bold'>
                <span className='mr-1'>Project ID: </span>
                <Tag color="cyan">{values.id}</Tag>
            </div>

            <form className='container-fluid'>

                <div className='row mt-5'>

                    {/* Project Name */}
                    <div className='col-6'>
                        <h6>Project name</h6>
                        <Input
                            value={values.projectName}
                            size="large"
                            name='projectName'
                            placeholder="Project name"
                            onChange={handleChange}
                        />
                        <div className='text-danger'>{errors.projectName}</div>
                    </div>


                    {/* Project category */}
                    <div className='col-6'>
                        <h6>Project category</h6>
                        <select
                            name='categoryId'
                            className='form-control'
                            onChange={handleChange}
                            value={values.categoryId}
                        >
                            {projectCategory.map((item, index) => {
                                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
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
                            onEditorChange={handleEditorChange}
                        />
                        <div className='text-danger'>{errors.description}</div>
                    </div>
                </div>
            </form >
        </div>
    )
}


const FormEditProjectWithFormik = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const { projectInfoEdit } = props
        return {
            id: projectInfoEdit?.id,
            projectName: projectInfoEdit?.projectName,
            description: projectInfoEdit?.description,
            categoryId: projectInfoEdit?.categoryId.toString()
        }
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        if (!values.projectName || !values.description) {
            Swal.fire({
                title: 'Please check again !',
                text: 'Project name and description are required',
                icon: 'warning',
                confirmButtonText: 'Close',
            })
        } else {
            props.dispatch({
                type: EDIT_PROJECT_SAGA,
                editedProject: values
            })
        }
    },

    displayName: 'FormEditProject',
})(FormEditProject);


const mapStateToProps = (state) => ({
    projectInfoEdit: state.DrawerReducer.projectInfoEdit
})

export default connect(mapStateToProps)(FormEditProjectWithFormik) 