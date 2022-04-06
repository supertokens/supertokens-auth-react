const express = require('express');
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers');
const {
  verifySession,
} = require('supertokens-node/recipe/session/framework/express');

const Router = express.Router();

Router.route('/todos')
  .get(verifySession(), getAllTodos)
  .post(verifySession(), createTodo);
Router.route('/todos/:id')
  .patch(verifySession(), updateTodo)
  .delete(verifySession(), deleteTodo);

module.exports = Router;
