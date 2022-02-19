import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import * as TodoServizio from '../todos.service'

@Component({
  template: `
        <div>
    <ng-container *ngIf="todos; else elseTemplate">

        <div *ngIf="todos.length > 0; else elseNoTask">
          <div *ngFor="let task of todos; let i =  index">
            <div>
              - {{task.title}}
              <button class="complete" (click)="completeTask(task, i)" >✅</button>
            </div>

          </div>

        </div>
      </ng-container>
      <ng-template #elseTemplate>
        <p>Recupero Tasks...</p>

      </ng-template>

    </div>

    <div>
      <input type="text" [(ngModel)]="newTaskTitle" >
      <button (click)="aggiungi()">+</button>
    </div>

    <ng-template #elseNoTask>
        <p>Ops, non ci sono Task</p>
      </ng-template>

  `,
    styles: [
      `
      div {
        text-align: center;
        margin-top: 20px;
      }
      `
    ]
})
export class TodosPage{
      i!: number;
      todo = ""
      todos!: Todo[];
      newTaskTitle:string | undefined;

  constructor() {
    TodoServizio.get().then((todos)=> {
      console.log(todos);
      this.todos = todos.filter(todo=>!todo.completed)
    })

  }

  async aggiungi() {
    /*TodoServizio.add(this.todo).then((todos) =>  {
      console.log(todos);
      this.todo = "";*/
      const nTodo = await TodoServizio.add({title:this.newTaskTitle as string,completed:false})
        this.todos.push(nTodo);
        this.newTaskTitle ='';
    }


  async completeTask(todo:Todo,i:number){
    await TodoServizio.update({completed:true},todo.id)
    this.todos.splice(i,1)
  }}

