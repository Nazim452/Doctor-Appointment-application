
import React from 'react'
import {message,Badge} from 'antd';
import "../styles/LayoutStyle.css"
import {  adminMenu, userMenu } from '../data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Layout = ({children}) => {
    const location= useLocation();
    const {user} = useSelector(state=>state.user)
    const navigate = useNavigate();



    // ==========================Doctor Menu===============================

    // After appying doctor once we will remove it from the siderbar bcz once already applied for docotr


  //    const doctorMenu = [
  //     {
  //         name:'Home',
  //         path:'/',
  //         icon:"fa-solid fa-house"
  //     },
  //     {
  //         name:'Appointment',
  //         path:'/appointments',
  //         icon:'fa-solid fa-list'
  //     },
  
   
  //     {
  //         name:'Profile',
  //         path:`/doctor/profile/${user?._id}`, // random [profile url for each user]
  //         icon:'fa-solid fa-user'
  //     },
    
     
  // ];

    // ==========================Doctor Menu===============================







    // //rendering menu list
    // const SideBarMenu = user?.isAdmin?
    // adminMenu:user?.isDoctor?
    // doctorMenu:userMenu;
    // const SideBarMenu = adminMenu




     // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============

  // redering menu list
  const SideBarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
    //handle logout

    const handleLogout=()=>{
      localStorage.clear();
      message.success("Logout SuccessFully")
      navigate("/login");
      
    }


  return (
    <>

    <div className="main">
        <div className="layout">


            <div className="sidebar">
                <div className="logo"><h6>Doc App</h6></div>
                <hr />
                <div className="menu">
                  {SideBarMenu.map(menu=>{
                    

                    const isActive = location.pathname===menu.path


                    return(
                        <>


                        <div  className={`menu-item ${isActive &&`active`}`}>
                            <i className={menu.icon}></i>
                            <Link to={menu.path}>{menu.name}</Link>
                        </div>

                        


                        </>
                    )

                  })}

<div  className={`menu-item`} onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to="/login">Logout</Link>
                        </div>  



                </div>
            </div>


            <div className="content">
                <div className="header">
                    <div className="header-content"   style={{cursor:'pointer'}}>
                      <Badge count={user&& user.notification.length} onClick={()=>{navigate('/notification')}} 
                    // 


                      >
                    <i className='fa-solid fa-bell'></i>

                      </Badge>
                    <Link to="/profile">{user?.name}</Link>

                    </div>
                </div>
                <div className="body">{children}</div>
            </div>



        </div>
    </div>
    
    
    </>
  )
}

export default Layout







