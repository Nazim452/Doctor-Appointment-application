import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Users = () => {

    const [users,setUsers] = useState([])
    
    //getting Allusers data_____

    const getUsers=async()=>{
        try {
            const res = await axios.get('/api/v1/admin/getAllUsers',{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
            })

            if(res.data.success){
                setUsers(res.data.data);
            }
            
        } catch (error) {
            console.log("Error in User.js in admin Folder",error);
            
        }

    }




    useEffect(()=>{
        getUsers();
    },[]);


    //antD  table co

    const columns = [
        {
            title:'Name',
            dataIndex: 'name', // same as model

        },
        {
            title:'Email',
            dataIndex: 'email', // same as model
        },
        {
            title:'Doctor',
            dataIndex: 'isDoctor', // same as model
            render:(text,record)=>(
                <span>{record.isDoctor?'Yes':'No'}</span>
            )
        },
        // {
        //     title:'Created At',
        //     dataIndex:'createdAt'
        // },
        {
            title:"Actions",
            dataIndex:'actions',
            render:(text,record)=>(
                <div className="d-flex">
                    <button className='btn btn-danger'>Bock</button>
                </div>
            )
        }
    ]

  return (
   <Layout>
    <h1>All users list here</h1>


    <Table columns={columns} dataSource={users}/>
   </Layout>
  )
}

export default Users