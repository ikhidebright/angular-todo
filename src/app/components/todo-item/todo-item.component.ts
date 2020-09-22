import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo:Todo
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter()

  constructor(private TodoService:TodoService) { }

  ngOnInit(): void {
  }

  // set dynamic classes

  getClasses () : object {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes
  }

  // mark todo as done
  onMark (todo) : void {
    // from ui
    todo.completed = !todo.completed

    // from api
    this.TodoService.toggleTodo(todo).subscribe(response => {
      // console.log(response)
    })
  }

  // delete todo
  onDelete (todo) : void {
    this.deleteTodo.emit(todo)
  }

}
