import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout'
import axios from 'axios'
import { Table, message } from 'antd'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])




  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (res.data.success) {
        setDoctors(res.data.data);
      }

    } catch (error) {
      console.log("Error in Doctor.js in admin Folder", error);

    }

  };

  // const handleAccountStatus = async(record,status) => {
  //   try {
  //     //doctorId  and status already passed in changeAccountStatusController - adminCntrl.js so we both things calling HEre
  //     const res = await axios.post('/api/v1/admin/changeAccountStatus',{doctorId:record._id,userId:record.userId,status:status},{
  //       headers:{
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
      
  //     if(res.data.success){
  //       message.success("Account status updated successfully")
  //     }
  //   } catch (error) {
  //     console.log("Error in handleAccountStatus", error);
  //     message.error("Something went wrong")
      
  //   }

  // }

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };







  useEffect(() => {
    getDoctors();
  }, []);





  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',  //same as model.name
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title: "Status",
      dataIndex: 'status',
    },
    {
      title: "Phone",
      dataIndex: 'phone',
    },
    {
      title: "Action",
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' ? <button
           className='btn btn-success'
           onClick={()=>handleAccountStatus(record,"approved")} //record render se get ho rah  hai
           >Approve</button> :

           <button className='btn btn-danger'>Reject</button>}
        </div>
      )
    }
  ]



  return (
    <Layout>
      <h1 className='text-center m-3'>All Doctors List here</h1>
      <Table columns ={columns} dataSource = {doctors}/>


    </Layout>
  )
}

export default Doctors