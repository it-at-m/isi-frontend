export interface DataTableHeader {
  title?: string | undefined;
  key?: string | undefined;
  sortable?: boolean | undefined;
  align?: "start" | "end" | "center" | undefined;
  width?: string | number | undefined;
}
