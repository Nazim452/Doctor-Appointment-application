import React from 'react'
import { Link, Navigate } from 'react-router-dom'


export default function PublicRoute({children}){
    if(localStorage.getItem('token')){
        return <Navigate to="/"/>
        // return <Link to="/"/>
    }else{
        return children;
    }
    
    
}







