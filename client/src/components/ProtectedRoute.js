import { Link, Navigate } from "react-router-dom";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import axios from "axios";



export default function ProtectedRoute({children}){
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user);
    // dispatch(setUser({ user: 'user' }));



    const getUser =async()=>{
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/getUserData',{token:localStorage.getItem('token')},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
            }

            )
            dispatch(hideLoading());
            if(res.data.success){
                dispatch(setUser(res.data.data))  ///userCntrl.js ke 100 line par hamne data me name pss kiya tha wahi delt data le  lo
            }
            else{
                <Navigate to="/login" />
                localStorage.clear();
            }
            
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();


            console.log("Error in ProtectedRoute , getUser data",error);
            
        }
    };

    useEffect(()=>{
        console.log("USeefffect inside protec running");
        if(!user){
            getUser();
        }

    },[user,getUser]);







    if(localStorage.getItem("token")){
        return children;
    }
    else{
        return <Navigate to="/login" />;
    }




}



// const getUser = async (dispatch) => {
//   try {
//     dispatch(showLoading());
//     const res = await axios.post(
//       '/api/v1/user/get/getUserData',
//       { token: localStorage.getItem('token') },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       }
//     );
//     dispatch(hideLoading());
//     if (res.data.success) {
//       dispatch(setUser(res.data.data));
//     } else {
//       // If not successful, navigate to the login page
//       return <Navigate to="/login" />;
//     }
//   } catch (error) {
//     dispatch(hideLoading());
//     console.log('Error in ProtectedRoute, getUser data', error);
//   }
// };

// export default function ProtectedRoute({ children }) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);

//   useEffect(() => {
//     console.log('useEffect inside protect running');
//     if (!user) {
//       getUser(dispatch);
//     }
//   }, [user, dispatch]);

//   if (localStorage.getItem('token')) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// }




// const getUser = async (dispatch) => {
//   try {
//     dispatch(showLoading());
//     const res = await axios.post(
//       '/api/v1/user/get/getUserData',
//       { token: localStorage.getItem('token') },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       }
//     );
//     dispatch(hideLoading());
//     if (res.data.success) {
//       dispatch(setUser(res.data.data));
//     } else {
//       // If not successful, navigate to the login page
//       return <Navigate to="/login" />;
//     }
//   } catch (error) {
//     dispatch(hideLoading());
//     console.log('Error in ProtectedRoute, getUser data', error);
//   }
// };

// export default function ProtectedRoute({ children }) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);

//   const memoizedGetUser = useCallback(() => getUser(dispatch), [dispatch]);

//   useEffect(() => {
//     console.log('useEffect inside protect running');
//     if (!user) {
//       memoizedGetUser();
//     }
//   }, [user, memoizedGetUser, dispatch]);

//   if (localStorage.getItem('token')) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// }

// Chat-GPT________________


// export default function ProtectedRoute({ children }) {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { user } = useSelector((state) => state.user);

//     // get user
//     const getUser = async () => {
//         try {
//             dispatch(showLoading());
//             const res = await axios.post(
//                 '/api/v1/user/getUserData',
//                 { token: localStorage.getItem('token') },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 }
//             );
//             dispatch(hideLoading());

//             if (res.data.success) {
//                 dispatch(setUser(res.data.data));
//             } else {
//                 navigate('/login'); // Use navigate for redirection
//             }
//         } catch (error) {
//             dispatch(hideLoading());
//             console.log('Error While getUser in ProtectedRoute: ', error);
//         }
//     }

//     useEffect(() => {
//         console.log('UseEffect for getUSerData in ProtectedRoute Running');
//         getUser();
//     }, []);

//     if (localStorage.getItem('token')) {
//         return children;
//     } else {
//         return <Navigate to="/login" />;
//     }
// }




