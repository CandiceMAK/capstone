import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CourseService from "../services/course.service";

const SearchComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddToWishList = (e) => {
    CourseService.add(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("Added to WishList.");
        history.push("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "eduInt" && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            class="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>Data we got back from API.</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Price: {course.price}</p>
                <p>Student: {course.students.length}</p>
                <a
                  href="#"
                  onClick={handleAddToWishList}
                  className="card-text"
                  className="btn btn-primary"
                  id={course._id}
                >
                  Add to WishList
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
