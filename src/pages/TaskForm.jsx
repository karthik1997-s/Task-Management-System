import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const TaskForm = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get("activeTab");
  const [formData, setFormData] = useState({
    title: "",
    status: "Pending",
    description: "",
    priority: "Low",
 
  });



  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("taskId");

    if (taskId) {
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const taskToEdit = existingTasks.find(
        (task) => task.id === parseInt(taskId)
      );

      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title,
          status: taskToEdit.status,
          description: taskToEdit.description || "",
          priority: taskToEdit.priority || "Low",
        });
      }
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Capitalize first letter of each word for title and description fields
    if (name === "title" || name === "description") {
      const capitalizedValue = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setFormData((prevData) => ({
        ...prevData,
        [name]: capitalizedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title.trim() === "") {
      return toast.error("Please Enter a task title");
    }

    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("taskId");
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (taskId) {
      const updatedTasks = existingTasks.map((task) =>
        task.id === parseInt(taskId) ? { ...task, ...formData } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast.success("Task Update Successfully")
      navigate(`/tasks?activeTab=${currentTab}`);
    } else {
      const newTask = { id: Date.now(), ...formData };
      const updatedTasks = [newTask, ...existingTasks];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast.success("Task Added Successfully")
      navigate(`/tasks?activeTab=${formData?.status}`);
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {location.search ? "Edit Task" : "Create a New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* {error && formData.title.trim() === "" && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )} */}
          </div>

          {/* Task Description */}
          <div>
            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            ></textarea>
          </div>

          {/* Task Priority */}
          <div>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

     

          {/* Task Status */}
          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            {location.search ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
