const router = require("express").Router();
const Course = require("../models").courseModel;
const courseValidation = require("../validation").courseValidation;

//middleware
router.use((req, res, next) => {
  console.log("A request is coming to API");
  next();
});

router.get("/", (req, res) => {
  Course.find({})
    .populate("eduInt", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch(() => {
      res.status(500).send("Cannot get course!");
    });
});

router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Course.findOne({ _id })
    .populate("eduInt", ["email"])
    .then((course) => {
      res.send(course);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post("/", async (req, res) => {
  // validate the inputs before making a new courese
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { title, location, price } = req.body;
  if (req.user.isStudent()) {
    res.status(400).send("Only Education Institution can post a new course.");
  }

  let newCourse = new Course({
    title,
    location,
    price,
    eduInt: req.user._id,
  });

  try {
    await newCourse.save();
    res.status(200).send("New course has been saved.");
  } catch (err) {
    res.status(400).send("Cannot save course.");
  }
});

router.patch("/:_id", async (req, res) => {
  // validate the inputs before making a new courese
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      sucess: false,
      message: "Course not found.",
    });
  }

  if (course.eduInt.equals(req.user._id) || req.user.isAdmin()) {
    Course.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("Course updated.");
      })
      .catch((e) => {
        res.send({
          sucess: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      sucess: false,
      message: "Only the owner of this course can delete this course.",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "Course not found.",
    });
  }

  if (course.eduInt.equals(req.user._id) || req.user.isAdmin()) {
    Course.deleteOne({ _id })
      .then(() => {
        res.send("Course deleted.");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Only the instructor of this course can delete this course.",
    });
  }
});

module.exports = router;
