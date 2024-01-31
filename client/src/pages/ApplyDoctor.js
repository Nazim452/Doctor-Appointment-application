import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Row ,Input,TimePicker,message} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from 'axios';
import moment from 'moment'


const ApplyDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {user} = useSelector(state=>state.user)

  //handle Form
  const handleFinish = async(values)=>{

    // console.log(values);
   
    try {
      dispatch(showLoading());
     //also sending userId
      const res = await axios.post('api/v1/user/apply-doctor',{...values,userId:user._id,timings:[
        moment(values.timings[0]).format("HH:mm"),
        moment(values.timings[1]).format("HH:mm"),
      ],
    },
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading());

      if(res.data.success){
        message.success(res.data.success)
        navigate('/')
      }
      else{
        message.error(res.data.success)
      }
      
    } catch (error) {
      dispatch(hideLoading());
      console.log("Error in ApplyDoctor.js During Sending Apply Request", error);
      message.error("Something went wrong during Applying Docotr")
      
    }
  }

  
  return (
    <div>
      <Layout>
        <h1 className='text-center'>Apply Doctor</h1>

        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
          <h4 className=''>Personal Details:</h4>
          <Row gutter={20}>
          
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                 label="First Name"
                 name="firstName"
                 required
                 rules={[{require:true}]}             
              >
              <Input type="text" placeholder='Your first name'/>
              </Form.Item>

            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                 label="Last Name"
                 name="lastName"
                 required
                 rules={[{require:true}]}             
              >
              <Input type="text" placeholder='Your last name'/>
              </Form.Item>

            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                 label="Phone No"
                 name="phone"
                 required
                 rules={[{require:true}]}             
              >
              <Input type="text" placeholder='Your Contact no'/>
              </Form.Item>

            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                 label="Email"
                 name="email"
                 required
                 rules={[{require:true}]}             
              >
              <Input type="text" placeholder='Your email address'/>
              </Form.Item>

            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                 label="Website"
                 name="website"
                 required
                 rules={[{require:true}]}             
              >
              <Input type="text" placeholder='Your website'/>
              </Form.Item>

            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                 label="Adress"
                 name="address"
                 required
                 rules={[{require:true}]}             
              >
              <Input type="text" placeholder='Your clinic Address'/>
              </Form.Item>

            </Col>
          </Row>

          <h4 >Professional Details:</h4>
          <Row gutter={20}>
          
          <Col xs={24} md={24} lg={8}>
            <Form.Item
               label="Specialization"
               name="specialization"
               required
               rules={[{require:true}]}             
            >
            <Input type="text" placeholder='Your Speciallization'/>
            </Form.Item>

          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
               label="Experience"
               name="experience"
               required
               rules={[{require:true}]}             
            >
            <Input type="text" placeholder='Your experience'/>
            </Form.Item>

          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
               label="Fees Per Cunsultation"
               name="feesPerCunsaltation"
               required
               rules={[{require:true}]}             
            >
            <Input type="text" placeholder='Your Fees Per Cunsultation'/>
            </Form.Item>

          </Col>
         
          <Col xs={24} md={24} lg={8}>
            <Form.Item
               label="Timing"
               name="timings"
               required
              //  rules={[{require:true}]}             
            >
           <TimePicker.RangePicker format="HH:mm"/>
            </Form.Item>



          

          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
          <button className='btn btn-primary form-btn'>Submit</button>

          </Col>
        </Row>

       
        </Form>


      </Layout>
    </div>
  )
}


export default ApplyDoctor