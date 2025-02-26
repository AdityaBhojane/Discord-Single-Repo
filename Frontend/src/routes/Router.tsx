import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SIgnIn/SignIn";
import NotFound from "../components/NotFound/NotFound";
import HomePage from "../pages/Home/HomePage";
import MainContent from "../components/MainContent/MainContent";
import ServerMainContent from "../components/ServerMainContent/ServerMainContent";
import MessageContent from "../components/MessageContent/MessageContent";
import VoiceMessageContent from "../components/VoiceMessageContent/VoiceMessageContent";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Invite from "../pages/Invite/Invite";
import ProtectedUser from "../components/protectedRouteUser/ProtectedUser";





export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedUser><></></ProtectedUser>}/>
      <Route path={'/signin'} element={<ProtectedUser><Auth><SignIn /></Auth></ProtectedUser>} />
      <Route path={'/signup'} element={<ProtectedUser><Auth><SignUp /></Auth></ProtectedUser>} />
      <Route path={"/?"} element={<ProtectedRoute />}>
        <Route path={'/@me'} element={<HomePage><MainContent /></HomePage>} />
        <Route path={'/signin'} element={<Auth><SignIn /></Auth>} />
        <Route path={'/channels/:serverId/message?/:channelId?'} element={<HomePage><ServerMainContent><MessageContent /></ServerMainContent></HomePage>} />
        <Route path={'/channels/:serverId/:channelId/voice'} element={<HomePage><ServerMainContent><VoiceMessageContent /></ServerMainContent></HomePage>} />
        <Route path={'/channels/:serverId/:joinCode/users'} element={<Invite />} />
      </Route>
      <Route path={'*'} element={<NotFound />} />

    </Routes>
  )
}
