import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
 
const useGetProfile = (id) => {
    const dispatch = useDispatch();
 
    useEffect(() => {
        const fetchMyProfile = async () => {
            if (!id) return; // Prevent API call if id is undefined
 
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
                    withCredentials: true,
                });
 
                console.log("Profile Data:", res.data);
                dispatch(getMyProfile(res.data.user));
 
            } catch (error) {
                console.error("Error fetching profile:", error);
 
                if (error.response?.status === 401) {
                    console.warn("Unauthorized! Redirecting to login...");
                    // Handle logout or redirect logic here
                }
            }
        };
 
        fetchMyProfile();
    }, [id, dispatch]); // ✅ Added dispatch to dependency array
};
 
export default useGetProfile;
 
 
 
 
 
// import axios from "axios";
// import { USER_API_END_POINT } from "../utils/constant";
// import { useEffect } from "react";
// import {useDispatch} from "react-redux";
// import { getMyProfile } from "../redux/userSlice";
 
// const useGetProfile = (id) => {
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         const fetchMyProfile = async () => {
//             try {
//                 const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
//                     withCredentials:true
//                 });
//                 console.log(res);
//                 dispatch(getMyProfile(res.data.user));
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchMyProfile();
//     },[id]);
// };
// export default useGetProfile;