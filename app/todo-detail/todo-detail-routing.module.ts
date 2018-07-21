import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TodoDetailComponent } from "./todo-detail.component";

const routes: Routes = [
    { path: "", component: TodoDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TodoDetailRoutingModule { }
