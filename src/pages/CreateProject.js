import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';

// ------------- Import tinymce -------------
import { Editor } from '@tinymce/tinymce-react';

// --------- Import formik ---------
import { withFormik } from 'formik';
import * as Yup from 'yup';

// --------- Import constants ---------
import {
    CREATE_PROJECT_SAGA,
    GET_PROJECT_CATEGORY_SAGA
} from '../redux/constants/constants';



function CreateProject(props) {

    const {
        setFieldValue,
        handleChange,
        handleSubmit,
        errors,
    } = props;

    const { projectCategory } = useSelector(state => state.ProjectReducer)

    const dispatch = useDispatch();

    const renderProjectCategory = (arrProjectCategory) => {
        return arrProjectCategory.map((item, index) => {
            return <option key={index} value={item.id}>{item.projectCategoryName}</option>
        })
    }

    useEffect(() => {
        dispatch({ type: GET_PROJECT_CATEGORY_SAGA })
    }, [])

    return (
        <div>
            <h3 className='font-weight-bold mb-4'>Create project</h3>

            <div className='d-flex justify-content-center' style={{ width: '100%' }}>

                {/* Form create project */}
                <form style={{ width: '70%' }}>

                    {/* Project name */}
                    <div className="form-group w-100 mt-2">
                        <label htmlFor="inputName" className='font-weight-bold' style={{ fontSize: '1.1rem' }}>Project name</label>
                        <input
                            name='projectName'
                            className="form-control "
                            id="inputName"
                            onChange={handleChange}
                        />
                        <div className='text-danger'>{errors.projectName}</div>
                    </div>

                    {/* Description */}
                    <div className="form-group w-100  mt-4">
                        <label htmlFor="inputDescription" className='font-weight-bold' style={{ fontSize: '1.1rem' }}>Description</label>
                        <Editor
                            initialValue=''
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

                    {/* Category */}
                    <div className="form-group w-100  mt-4">
                        <label className='font-weight-bold' style={{ fontSize: '1.1rem' }} htmlFor="selectCategory">Category</label>
                        <select
                            name='categoryId'
                            className="form-control"
                            id="selectCategory"
                            onChange={handleChange}
                        >
                            {renderProjectCategory(projectCategory)}
                        </select>
                    </div>

                    {/* Button Submit */}
                    <button
                        type="submit"
                        className="mb-5 btn btn-outline-dark mt-3 font-weight-bold"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}


const CreateProjectWithFormik = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const { projectCategory } = props
        return {
            projectName: '',
            description: '',
            categoryId: projectCategory[0]?.id.toString(),
        }
    },

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })
    },

    validationSchema: Yup.object().shape({
        projectName: Yup.string()
            .required('Project name is required'),
        description: Yup.string()
            .required('Description is required'),
    }),

    displayName: 'CreateProject',
})(CreateProject);


const mapStateToProps = (state) => ({
    projectCategory: state.ProjectReducer.projectCategory
})


export default connect(mapStateToProps)(CreateProjectWithFormik) 