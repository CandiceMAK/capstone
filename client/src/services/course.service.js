import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  post(title, location, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { title, location, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/eduInt/" + _id, {
      header: {
        Authorization: token,
      },
    });
  }
}

export default new CourseService();
