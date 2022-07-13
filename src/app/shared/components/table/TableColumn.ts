import { SortDirection } from '@angular/material/sort';

export class TableColumn {
  name: string = '';
  dataKey: string = '';
  position?: 'right' | 'left';
  isFilterable:boolean = true;
  isSortable?: boolean = false;
  isVisible: boolean = true;
  isExport: boolean = true;
  sortOrder?: SortDirection = '';
  ascOrderId?: number = 0;
  descOrderId?: number = 0;
  isLink?:boolean = false;
  minCharLength:number = 1;
}
