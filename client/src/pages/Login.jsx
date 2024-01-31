import React from 'react'

import "../styles/RegisterStyle.css"
import {useNavigate,Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { showLoading,hideLoading } from '../redux/features/alertSlice';
import { Form, Input,message } from 'antd'

import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async(value)=>{

    try {
      dispatch(showLoading())
      
      const res = await axios.post('/api/v1/user/login', value);
      window.location.reload();   //relload karne par actual data aata tha is liye yaeh automatically once time reload kar dega>>>>
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success("Login successfully");
        navigate('/')
      }
      else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log("Error While Logining", error);

      
    }
  }




  return (
    <>
    <div className="form-container">
    <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h1 className='text-center'>Login Form</h1>

        
        <Form.Item label ="Email" name="email">
            <Input type='email' required></Input>
        </Form.Item>
        <Form.Item label ="Password" name="password">
            <Input type='password' required></Input>
        </Form.Item>
      
        <Link to="/register" className='m-2'>Not a user Register here</Link>

        <button className='btn btn-primary' type='submit'>Login</button>

       </Form>  

    </div>
   


    </>
  )
}

export default Login