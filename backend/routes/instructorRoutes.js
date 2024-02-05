const express = require('express');
const auth = require('../middleware/auth');

const { 

    createInstructor,
    getInstructors,
    getInstructor,
    updateInstructor,
    deleteInstructor,
    loginInstructor,


} = require('../controllers/instructorController');

const router = express.Router({ mergeParams: true });

router.post('/', createInstructor);
router.get('/', getInstructors);
router.get('/:id', getInstructor);
router.patch('/:id', updateInstructor);
router.delete('/:id', deleteInstructor);
router.post('/login', loginInstructor);




module.exports = router;
