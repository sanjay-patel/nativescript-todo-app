import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/todo-list", pathMatch: "full" },
    { path: "todo-list", loadChildren: "./todo-list/todo-list.module#TodoListModule" },
    { path: "todo-detail", loadChildren: "./todo-detail/todo-detail.module#TodoDetailModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
