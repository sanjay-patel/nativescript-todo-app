import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { DataItem } from "./dataItem";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { TodoService } from '../services/todo.service';
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { View } from 'tns-core-modules/ui/core/view';
import * as dialogs from "ui/dialogs";

@Component({
    selector: "todo-list",
    moduleId: module.id,
    templateUrl: "./todo-list.component.html",
    styleUrls: ["todo-list.component.css"]
})

export class TodoListComponent implements OnInit {
    
    private _dataItems: ObservableArray<DataItem>;
    public data: DataItem[] = []; 
    @ViewChild("myListView") listViewComponent: RadListViewComponent;
    
    constructor(private _routerExtensions: RouterExtensions, private todoService: TodoService) { }
    
    get dataItems(): ObservableArray<DataItem> {
        return this._dataItems;
    }

    ngOnInit(): void {
        this.loadTodoList();
    }
    
    loadTodoList() {            
      this.todoService.fetch().then((res) => {
        this._dataItems = new ObservableArray(res);
      });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
    create(): void {
        this._routerExtensions.navigate(["/todo-detail"],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }

    public onCellSwiping(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;

        if (args.data.x > 200) {
            console.log("Notify perform left action");
        } else if (args.data.x < -200) {
            console.log("Notify perform right action");
        }
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var leftItem = swipeView.getViewById<View>('edit-view');
        var rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }

    public onSwipeCellFinished(args: ListViewEventData) {}

    public onLeftSwipeClick(args: ListViewEventData) {
        console.log("Left swipe click");
        var id = args.object.bindingContext.id;
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
        this._routerExtensions.navigate(["/todo-detail"],
        {
            queryParams: {id: id},
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }

    public onRightSwipeClick(args) {
        console.log("Right swipe click");
        var id = args.object.bindingContext.id;
        dialogs.confirm({
            title: "Confirm Delete",
            message: "Are you sure you want to delete this item?",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then(result => {
            if(result) {
                this.todoService.deleteRecord(id).then((res) => {
                    if(res.success) {
                        this._dataItems.splice(this._dataItems.indexOf(args.object.bindingContext), 1);
                    }
                });
            }
        });
    }
}
