const router = require('express').Router();

const {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

//Set up GET all and POST at /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

//Setup GET one, PUT, and DELETE at /api/user/:id
//The route determines what will happen with this parameter is giving in the req
//The HTTP method detemines what function is called
router
  .route('/:id')
  .get(getUserbyId)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;