import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'
const Appointments = () => {
    const [appointments,setAppointments] = useState([])
    const getAppointments =async()=>{
        try {
            const res = await axios.get('/api/v1/user/user-appointments',{
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


    const columns =[
        {
            title:'ID',
            dataIndex:'_id',
        },
        {
            title:'Name',
            dataIndex:'name',
            render:(text,record)=>(
                <span>
                    {record.doctorId.firstName} {record.doctorId.lastName}
                </span>
            )
        },
       
        {
            title:'Phone',
            dataIndex:'phone',
            render:(text,record)=>(
                <span>
                    {record.doctorId.phone}
                </span>
            )
        },
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


    ]




  return (
    <Layout>
        <h1>Appointments List</h1>
        {/* dataSource - kisse hamare table ko fill karna hai */}
        <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
}

export default Appointments