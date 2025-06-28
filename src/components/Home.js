import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar'
// import Feed from './Feed'
import useOtherUsers from '../hooks/useOtherUsers'
import RightSidebar from './RightSidebar'
// import { Outlet } from 'react-router-dom'
 
const Home = () => {
  const { user ,otherUsers} = useSelector(store => store.user);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user,navigate]);
 
  useOtherUsers(user?._id);
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSidebar/>
      <Outlet/>
      <RightSidebar otherUsers={otherUsers}/>
    </div>
  )
}
 
export default Home