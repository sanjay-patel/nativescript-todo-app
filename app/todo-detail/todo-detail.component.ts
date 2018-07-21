import { Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { alert } from "tns-core-modules/ui/dialogs";
import { TodoService } from '../services/todo.service';
import { DataItem } from "./dataItem";

@Component({
    selector: "todo-detail",
    moduleId: module.id,
    templateUrl: "./todo-detail.component.html"
})
export class TodoDetailComponent implements OnInit {
    public todoId: string;
    private _dataItems: DataItem;
    private _text: string;
    public todoDetail = <DataItem>{};
    public _statusProvider: any;
    @ViewChild('dataform') myCustomDataFormComp: RadDataFormComponent;
    
    constructor( private _pageRoute: PageRoute, private _routerExtensions: RouterExtensions, private todoService: TodoService ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        
        this._pageRoute.activatedRoute.pipe(switchMap(activatedRoute => activatedRoute.queryParams)).forEach((params) => { 
            this.todoId = params.id;
            if(this.todoId == undefined) {
                this._dataItems = new DataItem();
            } else {
                this.loadTodoDetailData(this.todoId); 
            }
        });        
    }
    
    get statusProvider() {
        if (!this._statusProvider) {
            this._statusProvider = ["", "In Progress", "Completed", "Not Started"];
        }
        return this._statusProvider;
    }
    
    get dataItems(): DataItem {
        return this._dataItems;
    }
    get text(): string {
        return this._text;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
    goBack(): void {
        this._routerExtensions.backToPreviousPage();
    }
    
    loadTodoDetailData(id) {
        console.log(id);
        this.todoService.fetchByID(this.todoId).then((res) => {
            this._dataItems = res.data;                
        });
    }
    
    onTap(): void {
        let isValid = true;
       
        var title = this.myCustomDataFormComp.dataForm.getPropertyByName("title");
        var description = this.myCustomDataFormComp.dataForm.getPropertyByName("description");
         var status = this.myCustomDataFormComp.dataForm.getPropertyByName("status");

        if (title.valueCandidate.toLowerCase() == "") {
            this.myCustomDataFormComp.dataForm.notifyValidated("title", false);
            isValid = false;
        } else {
            this.myCustomDataFormComp.dataForm.notifyValidated("title", true);
        }

        if (description.valueCandidate.toLowerCase() == "") {
            this.myCustomDataFormComp.dataForm.notifyValidated("description", false);
            isValid = false;
        } else {
            this.myCustomDataFormComp.dataForm.notifyValidated("description", true);
        }
        
        if (status.valueCandidate.toLowerCase() == "") {
            this.myCustomDataFormComp.dataForm.notifyValidated("status", false);
            isValid = false;
        } else {
            this.myCustomDataFormComp.dataForm.notifyValidated("status", true);
        }

        this._text = null;

        if (!isValid) {
            this._text = "filed does not allowed blank.";
        } else {
            this._text = "";
            this.myCustomDataFormComp.dataForm.commitAll();
            
            if(this.todoId == undefined) {
                this.todoService.insert(this._dataItems).then((res) => {
                    console.log(res);
                    if(res.success) {
                        this._routerExtensions.navigate(["/todo-list"]);
                    }
                });
            } else {
                this.todoService.update(this.todoId, this._dataItems).then((res) => {
                    console.log(res);
                    if(res.success) {
                        this._routerExtensions.navigate(["/todo-list"]);
                    }
                });
            }
        }
        
    }
}
