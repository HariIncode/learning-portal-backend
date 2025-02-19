const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/Fetchuser");
const { body, validationResult } = require("express-validator");
const Course = require("../models/Courses"); // Use Course instead of Courses

router.post(
  "/courses",
  // Middleware to validate the token
  fetchuser,
  [
    body("name", "Course name must be at least 3 characters...").isLength({
      min: 3,
    }),
    body("description", "Enter a valid description").isLength({ min: 10 }),
    body("image", "Enter a valid image URL").isLength({ min: 10 }),
    body("category", "Enter a valid category").isLength({ min: 6 }),
    body("duration", "Enter a valid duration").isNumeric(),
    body("price", "Enter a valid price").isNumeric(),
    body("language", "Enter a valid language").isLength({ min: 3 }),
    body("rating", "Enter a valid rating").isNumeric(),
    body("numReviews", "Enter a valid numReviews").isNumeric(),
    body("enrolledStudents", "Enter a valid number of enrollments").isNumeric(),
  ],

  async (req, res) => {
    try {
      const {
        name,
        description,
        image,
        category,
        duration,
        price,
        language,
        rating,
        numReviews,
        enrolledStudents,
      } = req.body;

      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new course
      const course = new Course({
        name,
        description,
        image,
        category,
        language,
        duration,
        price,
        rating,
        numReviews,
        enrolledStudents,
        user: req.user.id,
      });

      // Save the course
      const savedCourse = await course.save();
      res.json(savedCourse);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  }
);

// fetch all the courses

router.get("/fetchAllCourses", fetchuser, async (req, res) => {
  const data = await Course.find();
  res.json(data);
});

// delete a course
// router.delete(
//     "/deleteCourse/:id",
//      fetchuser,
//     async (req, res) => {
//         try{
//             // find the note by delete
//             let course = await Course.findById(req.params.id);
//             if(!course) {
//                 res.status(404).send("Not Found");
//             }
//         setCourses(data); // Assuming setCourses updates the state
//             course = await Course.findByIdAndDelete(req.params.id);
//             res.json(course);
//         } catch (error){
//             console.log(error);
//             res.status(500).json({ message: error.message });
//         }
//     });

router.delete("/deleteCourse/:id", fetchuser, async (req, res) => {
    try {
      let course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).send("Not Found");
      }
  
      course = await Course.findByIdAndDelete(req.params.id);
      res.json({ message: "Course deleted", course });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
