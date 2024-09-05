import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader"

export default function Protectedroute({children,isadmin}){
    const {isauthenticated,loading,user}=useSelector(state=>state.authstate)

    if(!isauthenticated&&!loading){
        return <Navigate to={'/login'}/>
    }
    if(isauthenticated ){
        if(isadmin===true && user.role !=='admin'){
            return <Navigate to={'/'}/>
        }
        return children
    }
    if(loading){
        return <Loader/>
    }
   
}