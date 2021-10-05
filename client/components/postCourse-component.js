import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [location, setLocation] = useState("");
  let [price, setPrice] = useState(1);
  let [message, setMessage] = useState("");
  const history = useHistory();
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const postCourse = () => {
    CourseService.post(title, location, price)
      .then(() => {
        window.alert("New course has been created.");
        history.push("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before posting a new course.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "eduInt" && (
        <div>
          <p>Only Education Institution can post new courses.</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "eduInt" && (
        <div className="form-group">
          <label for="exampleforTitle">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />
          <br />
          <label for="exampleforContent">Location</label>
          <textarea
            className="form-control"
            id="exampleforLocation"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeLocation}
          />
          <br />
          <label for="exampleforPrice">Price</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            Submit
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
