import { Component, input, output, contentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn<T> {
  field: keyof T | string;
  label: string;
  width?: string;
  cellClass?: string;
  format?: (row: T) => string;
  component?: any;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.html',
})
export class DataTableComponent<T> {
  columns = input.required<TableColumn<T>[]>();
  rows = input.required<T[]>();
  emptyMessage = input<string>('No data found');
  minWidth = input<string>('650px');
  
  rowClick = output<T>();

  cellTemplate = contentChild<TemplateRef<any>>('cellTemplate');

  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  getCellValue(row: T, column: TableColumn<T>): any {
    if (column.format) {
      return column.format(row);
    }
    return (row as any)[column.field];
  }

  getCellClass(column: TableColumn<T>): string {
    return column.cellClass || 'text-surface-100';
  }
}
