import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const fetchDashboard = async () => {
    setDashboardData(dashboard_data)
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

      {/* Top cards */}
      <div className='flex flex-wrap gap-4'>
        {/* Blogs Card */}
        <div>
          <img src={assets.dashboard_icon_1} alt="icon" />
          <div className='flex items-center gap-4 bg-white p-4 min-w-[232px] rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <p className='text-xl font-semibold'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        {/* Comments Card */}
        <div>
          <img src={assets.dashboard_icon_2} alt="icon" />
          <div className='flex items-center gap-4 bg-white p-4 min-w-[232px] rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <p className='text-xl font-semibold'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div>
          <img src={assets.dashboard_icon_3} alt="icon" />
          <div className='flex items-center gap-4 bg-white p-4 min-w-[232px] rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <p className='text-xl font-semibold'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Section */}
      <div className='mt-10'>
        <div className='flex items-center gap-3 text-gray-600 mb-4'>
          <img src={assets.dashboard_icon_4} alt="icon" />
          <p className='text-lg font-medium'>Latest Blogs</p>
        </div>

        {dashboardData.recentBlogs.length === 0 ? (
          <p className='text-gray-400'>No recent blogs found.</p>
        ) : (
          <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white'>
            <table className='w-full text-sm text-gray-700'>
              <thead className='text-xs text-gray-600 uppercase bg-gray-100'>
                <tr>
                  <th className='px-4 py-3 xl:px-6'>#</th>
                  <th className='px-4 py-3'>Blog Title</th>
                  <th className='px-4 py-3 max-sm:hidden'>Date</th>
                  <th className='px-4 py-3  max-sm:hidden'>Status</th>
                  <th className='px-4 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBlogs.map((blog,index)=>{
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1}/>

                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
