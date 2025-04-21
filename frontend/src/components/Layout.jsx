import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col-reverse md:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* Left Side - Create Task */}
        <div className="w-full md:w-2/3">
          <CreateTask />
          <div className="mt-6">
            <Outlet />
          </div>
        </div>

        {/* Right Side - Task Indicator */}
        <div className="w-full md:w-1/3">
          <TaskIndicator />
        </div>
      </div>
    </div>
  );
}

export default Layout;
