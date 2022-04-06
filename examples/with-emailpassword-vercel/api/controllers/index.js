const todos = [];

exports.getAllTodos = async (req, res) => {
  const user = req.session.getUserId();
  const userTodos = todos.filter((todoData) => todoData.user === user);
  res.status(201).json(userTodos);
};

exports.createTodo = async (req, res) => {
  const { name } = req.body;
  const user = req.session.getUserId();
  const newTodo = todos.push({
    id: todos.length + 1,
    name,
    user,
    completed: false,
    dateCreated: Date.now(),
  });

  res.status(200).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const newTodo = todos.map((todo) => {
    if (todo.id == id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  res.status(200).json(newTodo);
};

exports.deleteTodo = (req, res) => {
  const {id} = req.params;
  todos.splice(
    todos.findIndex((todo) => todo.id == id),
    1
  );
  res.status(201).json({ msg: "todo Deleted" });
};
