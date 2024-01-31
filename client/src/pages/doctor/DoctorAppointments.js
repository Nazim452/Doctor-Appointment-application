import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table, message } from 'antd'
const DoctorAppointments = () => {
    const [appointments,setAppointments] = useState([])  
      const getAppointments =async()=>{
        try {
            const res = await axios.get('/api/v1/doctor/doctor-appointments',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,  //taking data from the token of localStorage
                  },
            })
            if(res.data.success){
                setAppointments(res.data.data)
            }
            
        } catch (error) {
            console.log("Error in getAppointments (appointments.js)",error);
            
        }

    }

    useEffect(()=>{
        getAppointments();
    },[]);

    // const handleStatus = async(record,status)=>{
    //     try {
    //         // appointmentsId-- controller ko chahiye appointmentsId wo hame yahan pass karn aparega

    //         const res = await  axios.post('/api/v1/doctor/update-status',{appointmentsId:record._id},{
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`,  //taking data from the token of localStorage
    //               },

    //         })
    //         if(res.data.success){
    //             message.success(res.data.message);
    //             //for updation appointments list
    //             getAppointments();
    //         }
            
    //     } catch (error) {
    //         console.log("Error in handleStatus",error);
    //         message.error("Something went wrong")
            
    //     }
    // }
    const handleStatus = async (record, status) => {
        try {
          const res = await axios.post(
            "/api/v1/doctor/update-status",
            { appointmentsId: record._id, status },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (res.data.success) {
            message.success(res.data.message);
            getAppointments();
          }
        } catch (error) {
          console.log(error);
          message.error("Something Went Wrong");
        }
      };

    const columns =[
        {
            title:'ID',
            dataIndex:'_id',
        },
        // {
        //     title:'Name',
        //     dataIndex:'name',
        //     render:(text,record)=>(
        //         <span>
        //             {record.doctorId.firstName} {record.doctorId.lastName}
        //         </span>
        //     )
        // },
       
        // {
        //     title:'Phone',
        //     dataIndex:'phone',
        //     render:(text,record)=>(
        //         <span>
        //             {record.doctorId.phone}
        //         </span>
        //     )
        // },
        {
            title:'Date & time',
            dataIndex:'date',
            render:(text,record)=>(
                <span>
                    {
                        record.date
                    } &nbsp;

{/* TODO________________________________________________________moment kyo kam n kar raha hai */}

                    {/* {moment(record.date).format("DD-MM-YYYY")}
                    {moment(record.time).format("HH:mm")} */}
                    {
                        <span>
                            {
                                record.time
                            }
                        </span>
                        
                        
                    }
                </span>
            )
        },
        {
            title:'Status',
            dataIndex:'status',
          
        },
        
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
              <div className="d-flex">
                {record.status === "pending" && (
                  <div className="d-flex">
                    <button
                      className="btn btn-success"
                      onClick={() => handleStatus(record, "approved")}
                    >
                      Approved
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleStatus(record, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ),
          },


    ]



  return (
    <Layout>DoctorAppointments
        <h1>Appointments List</h1>
        {/* dataSource - kisse hamare table ko fill karna hai */}
        <Table columns={columns} dataSource={appointments}/>

    </Layout>
  )
}

export default DoctorAppointments