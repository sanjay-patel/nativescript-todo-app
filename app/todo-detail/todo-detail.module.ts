import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TodoDetailRoutingModule } from "./todo-detail-routing.module";
import { TodoDetailComponent } from "./todo-detail.component";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { TodoService } from '../services/todo.service';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TodoDetailRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        TodoDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [TodoService]
})
export class TodoDetailModule { }
