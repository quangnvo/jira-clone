import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'

// --------- Import templates ---------
import { SignUpTemplate } from './templates/SignUpTemplate'
import { JiraTemplate } from './templates/JiraTemplate'
import { PageChuyenGiaoTemplate } from './templates/PageChuyenGiaoTemplate'

// --------- Import pages ---------
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserManagement from './pages/UserManagement'
import Home from './pages/Home'
import ProjectManagement from './pages/ProjectManagement'
import Logout from './pages/Logout'
import PageChuyenGiao from './pages/PageChuyenGiao'
import CreateProject from './pages/CreateProject'
import YourProfile from './pages/YourProfile'
import ProjectDetail from './pages/ProjectDetail'

// --------- Import background picture ---------
import backgroundSignUp from './assets/img/background_7.jpg'
import backgroundLogin from './assets/img/background_9.jpg'

// --------- Import components ---------
import Loading from './components/Loading/Loading'
import DrawerHOC from './HOC/DrawerHOC'
import { ADD_HISTORY } from './redux/constants/constants'


export default function App() {

	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({
			type: ADD_HISTORY,
			history: history
		})
	}, [])

	return (
		<>
			<Loading />
			<DrawerHOC />
			<Switch>
				<Route exact path='/' component={Home} />

				{/* ----------------- Sign Up Template ----------------- */}
				{/* Sign up page */}
				<SignUpTemplate
					exact
					path='/signup'
					ComponentTruyenVao={SignUp}
					propBackground={backgroundSignUp}
				/>

				{/* Login page */}
				<SignUpTemplate
					exact
					path='/login'
					ComponentTruyenVao={Login}
					propBackground={backgroundLogin}
				// propBackground='../public/img/background_9.jpg'
				/>

				{/* ----------------- Jira Template ----------------- */}
				{/* User management page */}
				<JiraTemplate
					exact
					path='/usermanagement'
					ComponentTruyenVao={UserManagement}
				/>

				{/* Project management page */}
				<JiraTemplate
					exact
					path='/projectmanagement'
					ComponentTruyenVao={ProjectManagement}
				/>

				{/* Project Detail page */}
				<JiraTemplate
					exact
					path='/projectdetail/:projectId'
					ComponentTruyenVao={ProjectDetail}
				/>

				{/* Create Project page */}
				<JiraTemplate
					exact
					path='/createproject'
					ComponentTruyenVao={CreateProject}
				/>

				{/* Your Profile page */}
				<JiraTemplate
					exact
					path='/yourprofile'
					ComponentTruyenVao={YourProfile}
				/>


				{/* ----------------- PageChuyenGiao Template ----------------- */}
				{/* Logout page */}
				<PageChuyenGiaoTemplate
					exact
					path='/logout'
					ComponentTruyenVao={Logout}
				/>

				{/* PageChuyenGiao page */}
				<PageChuyenGiaoTemplate
					exact
					path='/loginrequirenotification'
					ComponentTruyenVao={PageChuyenGiao}
				/>
			</Switch>
		</>
	)
}
