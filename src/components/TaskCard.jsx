import React from "react";
import DeleteIcon from "../assets/delete-icon.svg";
import EditIcon from "../assets/edit-icon.svg";
import { Link, useNavigate } from "react-router-dom";

const TaskCard = ({ task, updateTask, deleteTask,activeTab }) => {
  const handleDelete = (task) => {
    if (window.confirm("Are you sure delete this task?")) {
      deleteTask(task?.id);
    }
  };

  // Function to determine the badge color based on priority
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-800"; // Default when no priority is set
    }
  };

  return (
    <div className="border p-4 rounded shadow flex bg-white items-center">
      <div className="flex flex-col flex-1">
        <div className="font-semibold text-base">{task?.title}</div>
        <div className="text-sm text-gray-600 mb-2">
          <p>
            <span className="font-semibold text-gray-500">
              {task?.description || "No description"}
            </span>{" "}
          </p>
        </div>
      </div>

      <div className="flex ml-auto">
        <span
          className={`px-3 py-1 rounded-full text-sm ${getPriorityBadgeColor(
            task?.priority
          )}`}
        >
          {task?.priority || "Not set"}
        </span>
        <Link
          className="text-white px-2 py-1 rounded ml-auto"
          to={`/create-task?taskId=${task?.id}&activeTab=${activeTab}`}
        >
          <img src={EditIcon} alt="edit-icon" />
        </Link>
        <button
          onClick={() => handleDelete(task)}
          className="text-white px-2 py-1 rounded"
        >
          <img src={DeleteIcon} alt="delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
