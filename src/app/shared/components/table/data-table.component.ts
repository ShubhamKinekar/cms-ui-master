import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TableColumn } from './TableColumn';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SortFilterModel } from '../../models/base.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Status } from '../../enums';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseValidationsComponent } from '../../base/base-validations/base-validations.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent extends BaseValidationsComponent implements OnInit, OnChanges, AfterViewInit {
  public rowCount: number = 0;
  public tableDataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = [];
  public filterColumns: string[] = [];
  public selectedItems: any[] = [];
  private sortFilterData: SortFilterModel = new SortFilterModel();
  status = Status;
  @ViewChild(MatPaginator, { static: false })
  matPaginator: MatPaginator | null = null;

  @ViewChild(MatSort, { static: true }) matSort: MatSort | null = null;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionIcon: string = '';
  @Input() totalRecords: number = 0;
  @Input() paginationSizes: number[] = [10, 25, 50, 100];
  @Input() defaultPageSize = this.paginationSizes[3];
  @Input() showCheckBox: boolean = false;
  @Input() showDateFilter: boolean = false;

  @Input() primaryKey: string = '';
  @Input() unlockStatus: Status = Status.None;
  @Output() sort: EventEmitter<SortFilterModel> = new EventEmitter();
  @Output() filter: EventEmitter<SortFilterModel> = new EventEmitter();
  @Output() page: EventEmitter<SortFilterModel> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectAction: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  filterTextChanged$ = new Subject<string>();
  formInput: FormGroup = new FormGroup({});
  today = new Date();
  minDateToFinish = new Subject<string>();
  minDate: any;

  properties: any = {
    startDate: 'startDate',
    endDate: 'endDate'
  };

  constructor() {
    super();
    this.initForm();
  }

  initForm() {
    //const today = new Date();
    const endDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 0, 0, 0, 0);
    const startDate = new Date(this.today.getFullYear(), this.today.getMonth() - 2, this.today.getDate(), 0, 0, 0, 0);
    this.formInput = new FormGroup({
      startDate: new FormControl(startDate),
      endDate: new FormControl(endDate)
    });
    this.setForm(this.formInput);
  }

  formatDate(date: Date) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.rowCount =
      changes && changes.totalRecords && changes.totalRecords.currentValue
        ? changes.totalRecords.currentValue
        : this.rowCount;
    if (changes && changes.showDateFilter && changes.showDateFilter.currentValue) {
      this.showDateFilter = changes.showDateFilter.currentValue;
      this.applyDateFilter();
    }
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    const columnDataKeys = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.dataKey
    );
    this.displayedColumns = [...columnNames];
    this.filterColumns = [...columnDataKeys];
    if (this.rowActionIcon) {
      this.displayedColumns = [...this.displayedColumns, this.rowActionIcon];
      this.filterColumns = [...this.filterColumns, this.rowActionIcon];
    }

    if (this.showCheckBox) {
      this.displayedColumns.splice(0, 0, this.primaryKey);
      this.filterColumns.splice(0, 0, this.primaryKey);
    }


    if (this.unlockStatus && this.unlockStatus != Status.None) {
      this.displayedColumns.splice(0, 0, 'unlockStatus');
      this.filterColumns.splice(0, 0, 'unlockStatus');
    }

    columnDataKeys.forEach((e) => {
      this.sortFilterData[e] = null;
    });
    this.filterTextChanged$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((filterValue: string) => {
        this.filter.emit(this.sortFilterData);
      });
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    console.log(this.rowCount);
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(col: TableColumn, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const startSearch = col.minCharLength == 1 ? true : filterValue && filterValue.length >= col.minCharLength;
    if (startSearch) {
      this.sortFilterData = {
        ...this.sortFilterData,
        start: 0,
        length: this.defaultPageSize,
      };
      this.sortFilterData[col.dataKey] = filterValue;
      //this.filter.emit(this.sortFilterData);
      this.filterTextChanged$.next(filterValue);
    }
  }

  pageData(event: PageEvent) {
    this.sortFilterData = {
      ...this.sortFilterData,
      start: event.pageSize * event.pageIndex,
      length: event.pageSize
    };
    this.page.emit(this.sortFilterData);
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    // sortParameters.active = this.tableColumns.find(
    //   (column) => column.name === sortParameters.active
    // )?.dataKey!;
    const sortCol = this.tableColumns.find(
      (column) => column.name === sortParameters.active
    );
    if (sortCol) {
      this.sortFilterData = {
        ...this.sortFilterData,
        start: 0,
        length: this.defaultPageSize,
        columnSort:
          sortParameters.direction === 'asc'
            ? sortCol?.ascOrderId
            : sortCol?.descOrderId,
      };
      this.sort.emit(this.sortFilterData);
    }
  }

  searchData() {
    this.sortFilterData = new SortFilterModel();
    this.applyDateFilter();
  }

  applyDateFilter() {
    if (this.showDateFilter) {
      this.sortFilterData = {
        ...this.sortFilterData,
        startDate: this.formatDate(this.formInput.controls[this.properties.startDate].value as Date),//+'T00:00:00.000Z';
        endDate: this.formatDate(this.formInput.controls[this.properties.endDate].value as Date),//+'T23:59:59.000Z';
      };
      this.sort.emit(this.sortFilterData);
    }
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

  emitSelectAction(row: any) {
    if (this.showCheckBox && this.primaryKey) {
      const indx = this.selectedItems.findIndex(
        (f) => f[this.primaryKey] == row[this.primaryKey]
      );
      if (indx == -1) {
        this.selectedItems.push(row);
      } else {
        this.selectedItems = this.selectedItems.filter(
          (f) => f[this.primaryKey] != row[this.primaryKey]
        );
      }
      this.selectAction.emit(this.selectedItems);
    }
  }
}
