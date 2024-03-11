const express = require('express');
const auth = require('../middleware/auth');

const instructorController = require('../controllers/instructorController');

// const { 
//     createInstructor,
//     getInstructors,
//     getInstructor,
//     updateInstructor,
//     deleteInstructor,

//     loginInstructor,

//     assignStudent,
//     unassignStudent,
//     swapStudent

// } = require('../controllers/instructorController');

const router = express.Router({ mergeParams: true });

// Basic Instructor routes
router.post('/', instructorController.createInstructor.bind(instructorController));
router.get('/', instructorController.getInstructors.bind(instructorController));
router.get('/:id', instructorController.getInstructor.bind(instructorController));
router.patch('/:id', instructorController.updateInstructor.bind(instructorController));
router.delete('/:id', instructorController.deleteInstructor.bind(instructorController));

// Login route for Instructor
router.post('/login', instructorController.loginInstructor.bind(instructorController));

// Student-Instructor Association
router.patch('/:id/assignStudent', instructorController.assignStudent.bind(instructorController));
router.patch('/:id/unassignStudent', instructorController.unassignStudent.bind(instructorController));
router.patch('/:id/swapStudent', instructorController.swapStudent.bind(instructorController));

module.exports = router;
