import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'Application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url:string = "https://jsonplaceholder.typicode.com/todos"
  todoLimit:string = '?_limit=5'

  constructor(private http:HttpClient) { }
  

  // get todos
  getTodos (): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.url}${this.todoLimit}`)
  }

  // toggle todos
  toggleTodo (todo: Todo): Observable <any> {
    const url = `${this.url}/${todo.id}`
    return this.http.put(url, todo, httpOptions)
  }

  // delete todo
  deleteTodo (todo: Todo): Observable<any> {
    const url = `${this.url}/${todo.id}`
    return this.http.delete(url, httpOptions)
  }

  // add todo
  addTodo (todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo, httpOptions)
  }
}
