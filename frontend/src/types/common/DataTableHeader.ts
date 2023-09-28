export class DataTableHeader {
  text: string | undefined;
  value: string | undefined;
  sortable: boolean | undefined;

  constructor(text: string | undefined, value: string | undefined, sortable: boolean | undefined) {
    this.text = text;
    this.value = value;
    this.sortable = sortable;
  }
}
