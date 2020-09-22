import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})
export class ToDosComponent implements OnInit {

  todos:Todo[]

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe( todo => {
      this.todos = todo
    })
  }

  deleteTodoItem (todo: Todo) {
    // delete from the UI
    this.todos = this.todos.filter(item => {
      return item.id != todo.id
    })

    // delete from server
    this.todoService.deleteTodo(todo).subscribe(response => {
      console.log(response)
    })
  }

  addTodo (todo: Todo) {
    // add to server
    this.todoService.addTodo(todo).subscribe(response => {
      // add to the UI
      this.todos.unshift(response)
      // console.log(response)
    })
  }
}
