import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { FormInput } from "./model/form-input";

import Swal, { SweetAlertType } from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class Database {
  private database: any;

  private request: any;

  private formBuilder = new BehaviorSubject<Array<FormInput>>([]);

  constructor() {
    if (!window.indexedDB) {
      this.renderSwal("error", "Your browser version is not supported!");
    }

    this.request = window.indexedDB.open("formBuilder", 1);

    this.request.onerror = event => {
      this.renderSwal("error", "The database is opened failed");
    };

    this.request.onsuccess = event => {
      this.database = this.request.result;
      this.read();
    };

    this.request.onupgradeneeded = event => {
      this.database = event.target["result"];
      const objectStore = this.database.createObjectStore("formBuilder", {
        keyPath: "id"
      });
    };
  }

  public add() {
    const request = this.database
      .transaction(["formBuilder"], "readwrite")
      .objectStore("formBuilder")
      .add({ id: 1, data: [] });

    request.onsuccess = event => {};

    request.onerror = event => {};
  }

  public read() {
    const transaction = this.database.transaction(["formBuilder"]);
    const objectStore = transaction.objectStore("formBuilder");
    const request = objectStore.get(1);

    request.onerror = event => {
      this.renderSwal("error", "Transaction failed");
    };

    request.onsuccess = event => {
      if (request.result) {
        this.formBuilder.next(request.result.data);
      } else {
        this.add();
      }
    };
  }

  public put(formBuilder) {
    if (!this.database) {
      return;
    }

    const request = this.database
      .transaction(["formBuilder"], "readwrite")
      .objectStore("formBuilder")
      .put({ id: 1, data: formBuilder });

    request.onsuccess = event => {};

    request.onerror = event => {
      this.renderSwal("error", "The data has been written failed");
    };
  }

  public getFormBuilder(): Observable<Array<FormInput>> {
    return this.formBuilder.asObservable();
  }

  private renderSwal(type: SweetAlertType, title: string) {
    Swal.fire({
      type: type,
      title: title,
      showConfirmButton: false,
      timer: 1000
    });
  }
}
