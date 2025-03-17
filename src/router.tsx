import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailView from "./views/projects/ProjectDeatailView";
import AuthLayout from "./layout/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layout/ProfileLayout";
import NotFound from "./views/404/NotFound";

export default function Router() {

    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView/>} index/>
                    <Route path='/projects/:projectId' element={<ProjectDetailView />} />
                    <Route path="/projects/create" element={<CreateProjectView/>} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView/>} />  
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView/>} />
                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/password' element={<ChangePasswordView />} />
                    </Route>
                    
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView/>} index/>
                    <Route path="/auth/register" element={<RegisterView/>} index/>
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView/>} index/>
                    <Route path="/auth/request-code" element={<RequestNewCodeView/>} index/>
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView/>} index/>
                    <Route path="/auth/new-password" element={<NewPasswordView/>} index/>
                </Route>
                
                <Route element={<AuthLayout />}>
                    <Route path="*" element={<NotFound/>}/>
                </Route>

            </Routes>
        </BrowserRouter>

        
    )
}