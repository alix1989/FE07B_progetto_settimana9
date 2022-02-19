import { Todo } from "./models/todo";

let todos: Todo[] = [];

export function get(): Promise<Todo[]>{
  return new Promise((res,rej) => {
    setTimeout(() => {
      res(todos);
    }, 2000);
  });
}

/*export function add(task: string): Promise<Todo> {
  return new Promise ((res, rej) => {
    setTimeout(() => {
      const newTodo: Todo = {
        title: task,
        id: todos.length + 1,
        completed: false
      };
      todos.push(newTodo);
      res(newTodo);
    }, 2000);
  })
}*/

export function add(todo: Omit<Todo, 'id'>): Promise<Todo> {
  return new Promise((res, rej) => {
    setTimeout(() =>{
      const newTodo: Todo = {...todo, id: todos.length +1};
      todos.push(newTodo)
      res(newTodo);
    }, 2000);
  });
}

/*export function changeTrue(todos: Todo[], i:number): Promise<Todo>{
  return new Promise((res, rej)=>{
    setTimeout(() => {
      todos[i].completed = true;
      res(todos[i])
    }, 2000);
  })*/

  export function update(newTodo: Partial<Todo>, id:number):Promise<Todo>{
    return new Promise((res, rej) => {
      setTimeout(() => {
        todos = todos.map((todo) =>
        todo.id == id ? { ...todo, ...newTodo }: todo
        );
        const updatedTodo= todos.find((todo) => todo.id == id);
        if (updatedTodo) {
          res(updatedTodo);
        } else{
          rej('todo non trovato');
        }
      }, 2000);
    });
}
