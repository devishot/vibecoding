import axios from 'axios';

const API_URL = `/tasks`;


export const readTasks = async (skip = 0, limit = 100, projectId = null, status = null) => {
  try {
    const response = await axios.get(process.env.BACKEND_URL+API_URL, {
      params: { skip, limit, project_id: projectId, status }
    });
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    console.error('Error reading tasks:', error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(process.env.BACKEND_URL+API_URL, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const readTask = async (taskId) => {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL+API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error reading task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${process.env.BACKEND_URL+API_URL}/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
