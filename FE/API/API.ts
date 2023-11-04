import axios from "axios";

const URL = "http://localhost:4000/api/v3";

export const getTodos = async () => {
  try {
    return axios.get(`${URL}/viewTodo`).then((res) => {
      console.log(res);
      return res.data.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const addTodo = (data: {}) => {
  try {
    return axios.post(`${URL}/createTodo`, data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = (ID: any) => {
  try {
    return axios.delete(`${URL}/deleteTodo/${ID}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (ID: any) => {
  try {
    console.log("update");

    return axios.patch(`${URL}/updateTodo/${ID}`).then((res) => {
      console.log("update", res);
    });
  } catch (err) {
    console.log(err);
  }
};
