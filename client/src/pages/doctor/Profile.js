import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Col, Form, Row, Input, TimePicker, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {showLoading,hideLoading} from '../../redux/features/alertSlice'
import moment from 'moment'

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user)
  const [doctor, setDoctor] = useState(null);
  const params = useParams();





    //handle Form
    // const handleFinish = async(values)=>{

    
     
    //   try {
    //     dispatch(showLoading());
    //    //also sending userId
    //     const res = await axios.post('api/v1/doctor/updateProfile',{...values,userId:user._id},{
    //       headers:{
    //         Authorization: `Bearer ${localStorage.getItem('token')}`
    //       }
    //     })
    //     dispatch(hideLoading());
  
    //     if(res.data.success){
    //       message.success(res.data.success)
    //       navigate('/')
    //     }
    //     else{
    //       message.error(res.data.success)
    //     }
        
    //   } catch (error) {
    //     dispatch(hideLoading());
    //     console.log("Error in ApplyDoctor.js During Sending Apply Request", error);
    //     message.error("Something went wrong during Applying Docotr")
        
    //   }
    // }
    const handleFinish = async (values) => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/doctor/updateProfile",
          {
            ...values,
            userId: user._id,
            // for updating time
            timings: [
              moment(values.timings[0]).format("HH:mm"),
              moment(values.timings[1]).format("HH:mm"),
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(res.data.message);
          navigate("/");
        } else {
          message.error(res.data.success);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error("Somthing Went Wrrong ");
      }
    };
  //getDoctor Details

  const getDoctorInfo = async () => {
    try {
      // params.id(jo hamne app.js ke colon me id provide kiya tha wo lw rah ahu)----------------Taking id from the params_
      const res = await axios.post('/api/v1/doctor/getDoctorInfo', { userId: params.id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setDoctor(res.data.data)
      }
    } catch (error) {
      console.log("Error in getDoctorInfo in pRofile.js", error);

    }
  }

  useEffect(() => {
    getDoctorInfo();

  }, []);
  // return (
  //   <Layout>
  //     <h1>Manage Profile</h1>

  //     {doctor && (

  //       //initital value is doctor means all value fillled as previous
  //       <Form layout='vertical' onFinish={handleFinish} className='m-3'
  //        initialValues={{...doctor,
  //        timings:[
  //         moment(doctor.timings[0],"HH;mm"),
  //         moment(doctor.timings[1],"HH;mm"),
  //        ]}}>
  //         <h4 className=''>Personal Details:</h4>
  //         <Row gutter={20}>

  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="First Name"
  //               name="firstName"  
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your first name' />
  //             </Form.Item>

  //           </Col>
  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Last Name"
  //               name="lastName"
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your last name' />
  //             </Form.Item>

  //           </Col>
  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Phone No"
  //               name="phone"
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your Contact no' />
  //             </Form.Item>

  //           </Col>
  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Email"
  //               name="email"
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your email address' />
  //             </Form.Item>

  //           </Col>
  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Website"
  //               name="website"
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your website' />
  //             </Form.Item>

  //           </Col>
  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Adress"
  //               name="address"
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your clinic Address' />
  //             </Form.Item>

  //           </Col>
  //         </Row>

  //         <h4 >Professional Details:</h4>
  //         <Row gutter={20}>

  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Specialization"
  //               name="specialization"
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your Speciallization' />
  //             </Form.Item>

  //           </Col>
  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Experience"
  //               name="experience"
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your experience' />
  //             </Form.Item>

  //           </Col>
  //           <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Fees Per Cunsultation"
  //               name="feesPerCunsaltation"
  //               required
  //               rules={[{ require: true }]}
  //             >
  //               <Input type="text" placeholder='Your Fees Per Cunsultation' />
  //             </Form.Item>

  //           </Col>

  //           {/* <Col xs={24} md={24} lg={8}>
  //             <Form.Item
  //               label="Timing"
  //               name="timings"
  //               required
  //             //  rules={[{require:true}]}             
  //             >
  //               <TimePicker.RangePicker format="HH:mm" />
  //             </Form.Item>
  //           </Col> */}
  //           <Col xs={24} md={24} lg={8}></Col>
  //           <Col xs={24} md={24} lg={8}>
  //             <button className='btn btn-primary form-btn'>Update</button>

  //           </Col>
  //         </Row>


  //       </Form>




  //     )}
  //   </Layout>
  // )
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
        >
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Cunsaltation"
                name="feesPerCunsaltation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact no" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;


// export default Profile