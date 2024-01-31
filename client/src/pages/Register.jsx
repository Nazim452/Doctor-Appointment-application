import React from 'react'
import { Form, Input,message } from 'antd'
import "../styles/RegisterStyle.css"
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { showLoading,hideLoading } from '../redux/features/alertSlice';




const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //form handler - form submit karne par value me all data aa jyega
    const onFinishHandler = async(value)=>{

        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/register',value);
            dispatch(hideLoading())
            if(res.data.success){
                message.success("Successfully registered")
                navigate("/login");
            }
            else{
                message.error(res.data.message)
            }
            
        } catch (error) {
            dispatch(hideLoading())

            console.log("Error in Register UI form",error);
            message.error("Something went wrong While registering")
            
        }
      
       
    }




  return (
    <>
    {/* <div className="form-container">
       <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h1 className='text-center'>Register Form</h1>

        <Form.Item label ="Name" name="name">
            <Input type='text'></Input>
        </Form.Item>
        <Form.Item label ="Email" name="email">
            <Input type='email' required></Input>
        </Form.Item>
        <Form.Item label ="Password" name="password">
            <Input type='password' required></Input>
        </Form.Item>
      
        <Link to="/login" className='m-2'>Already user Login here</Link>

        <button className='btn btn-primary' type='submit'>Register</button>

       </Form>
    </div> */}

    <form action="" >
        <input type="email" placeholder='Enter Your Email'  />
        <input type="password" placeholder='Enter Your Password' />
        <button onClick={onFinishHandler}></button>


    </form>
{/* 
 <form onSubmit={submtHandler}
        className='flex flex-col w-full gap-y-4 mt-6'
      >


        <label
          className='w-full '
          htmlFor="">
          <p className='text-[0.875rem] mb-1 leading-[1.375rem]'>
            Email Address

            <sup className='text-pink-200'>*</sup>
          </p>

          <input
          className='bg-slate-800 w-full p-[12px]'


            type="email"
            required
            value={formData.email}
            onChange={changeHandler}
            placeholder='Enter Email'
            name='email'
          />
        </label>


        <label className='w-full relative'>
          <p  className='text-[0.875rem] mb-1 leading-[1.375rem]'>
            PassWord
          </p>
          <input 
           className='bg-slate-800 w-full p-[12px]'



          type={showPassword ? ("text") : ("password")}
            required
            value={formData.password}
            onChange={changeHandler}
            placeholder='Enter PassWord'
            name='password'

          />



          



          <span 
          className='absolute top-[38px] right-3 cursor-pointer' 
          onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} />) : (<AiOutlineEye fontSize={24} />)}
          </span>




          <Link to="#">
            <p className='text-xs mt-1 text-blue-500 ml-auto max-w-max'>Forgot Password</p>
          </Link>



        </label>


        <button className='w-full bg-yellow-400 rounded-[8px] font-medium text-black px-[12px] py-[8px]'>
          SignIn
        </button>






      </form> */}


    </>
  )
}

export default Register