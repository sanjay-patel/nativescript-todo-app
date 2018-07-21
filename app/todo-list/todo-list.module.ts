import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { TodoListRoutingModule } from "./todo-list-routing.module";
import { TodoListComponent } from "./todo-list.component";
import { TodoService } from '../services/todo.service';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TodoListRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        TodoListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [TodoService]
})
export class TodoListModule { }
