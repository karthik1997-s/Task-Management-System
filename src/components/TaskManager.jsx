import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TaskCard from "./TaskCard";
import TaskIcon from "../assets/no-task.jpg";

const TaskManager = ({ searchQuery }) => {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const queryParams = new URLSearchParams(location.search);
    const currentTab = queryParams.get("activeTab");
  const [activeTab, setActiveTab] = useState(currentTab || "Pending"); // Active tab state

  // Fetch tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const updateTask = (id, updatedData) => {
    const updatedTasks = tasks?.map((task) =>
      task.id === id ? { ...task, ...updatedData } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks?.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div className="h-[calc(100%-58px)] flex flex-col lg:px-4">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h2 className="xs:text-center md:text-left text-xl font-semibold lg:mb-2">
          Task List
        </h2>
        {/* Link to Task Creation Page */}
        <Link
          to="/create-task"
          className="px-3 text-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Task
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b-2">
        {["Pending", "In Progress", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 font-medium ${
              activeTab === status
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-400"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-4 h-full overflow-auto">
        {filteredTasks?.filter((task) => task?.status === activeTab).length >
        0 ? (
          filteredTasks
            ?.filter((task) => task?.status === activeTab)
            ?.map((task) => (
              <TaskCard
                key={task?.id}
                task={task}
                activeTab={activeTab}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))
        ) : (
          <div className="text-center gap-4 flex-col flex items-center justify-center h-full font-bold bg-white">
            <img src={TaskIcon} alt="task-icon" className="w-72" />
            <div className="text-[#19283999] font-medium">No Tasks Found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
