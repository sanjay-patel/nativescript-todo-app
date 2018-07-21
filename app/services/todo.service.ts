import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs";
import { DataItem } from '../todo-list/dataItem';
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class TodoService {

    public todos: DataItem[] = [];
    private database: any;
    public mytodo: DataItem[] = [];
       
    constructor() {
        this.mytodo = [];
        (new Sqlite("my.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS mytodo (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, status TEXT)").then(id => {
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
        });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
     }
     
     insert(data) {
        return this.database.execSQL("INSERT INTO mytodo (title, description, status) VALUES (?, ?, ?)", [data.title, data.description, data.status]).then(id => {
            console.log("INSERT RESULT", id);
            this.fetch();
            var insertData = { 
                success: true, 
                id: id,
                message: 'Data inserted successfully!!' 
            }
            
            return insertData;
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }
        
    fetch() {
        return  this.database.all("SELECT * FROM mytodo").then(rows => {
            this.mytodo = [];
            for(var row in rows) {
                this.mytodo.push({
                    "id": rows[row][0],
                    "title": rows[row][1],
                    "description": rows[row][2],
                    "status": rows[row][3]
                });
            }
            return this.mytodo;
        }, error => {
            console.log("SELECT ERROR", error);
        });       
    }
    
    fetchByID(id) {
        return this.database.get('SELECT * FROM mytodo where id='+id).then(row => {
            var data = {
                    "id": row[0],
                    "title": row[1],
                    "description": row[2],
                    "status": row[3]
            }
            var getByIdData = { 
                success: true, 
                data: data,
                message: 'Data selectedById successfully!!' 
            }
            
            return getByIdData;
        }, error => {
            console.log("SELECT BY ID ERROR", error);
        });
    }
        
    update(id, data) {
        return this.database.execSQL("UPDATE mytodo SET title = ?, description = ?, status = ? WHERE id = "+id, [data.title, data.description, data.status]).then(id => {
           
            var updateData = { 
                success: true, 
                id: id,
                message: 'Data Updated successfully!!' 
            }
            
            return updateData;
        }, error => {
            console.log("UPDATE ERROR", error);
        });
    }
    
    deleteRecord(id) {
        return this.database.execSQL('DELETE FROM mytodo where id='+id).then(id => {           
            var updateData = { 
                success: true, 
                id: id,
                message: 'Record Deleted successfully!!' 
            }
            
            return updateData;
        }, error => {
            console.log("DELETE ERROR", error);
        });
    }
}
