import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Mainlayout = () =>{
    return  (
        <>
            <Sidebar/>
            <Outlet/>
        </>
    )
}
export default Mainlayout;