import { SortDirection } from '@angular/material/sort/sort-direction';
import { TableColumn } from 'src/app/shared/components/table/TableColumn';

export function DisplayColumn(
  header: string,
  position: 'left' | 'right',
  isFilterable: boolean = true,
  isVisible: boolean = true,
  isSortable: boolean = true,
  isExport: boolean = true,
  sortOrder?: SortDirection,
  ascOrderId: number = 0,
  descOrderId = 0,
  isLink = false,
  minCharLength = 1
): PropertyDecorator {
  return (target, key) => {
    const tableColumn = new TableColumn();
    tableColumn.dataKey = key as string;
    tableColumn.name = header;
    tableColumn.position = position;
    tableColumn.isFilterable = isFilterable;
    tableColumn.isVisible = isVisible;
    tableColumn.isSortable = isSortable;
    tableColumn.isExport = isExport;
    tableColumn.sortOrder = sortOrder;
    tableColumn.ascOrderId = ascOrderId;
    tableColumn.descOrderId = descOrderId;
    tableColumn.isLink = isLink;
    tableColumn.minCharLength = minCharLength && parseInt(minCharLength.toString()) > 0 ? minCharLength : 1;

    addToReflect(
      target.constructor.prototype ? target.constructor.prototype : target,
      tableColumn,
      'displayColumn'
    );
  };
}

function addToReflect(target: object, key: any, name: any) {
  const items = Reflect.getMetadata(name, target) || [];
  if (!items.includes(key)) {
    items.push(key);
  }
  Reflect.defineMetadata(name, items, target);
}
