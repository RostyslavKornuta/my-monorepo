import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {CustomImage} from "../image";

export interface TableColumn<T> {
  label: string
  key: string
  render?: (value: any, row: T) => React.ReactNode
}

export interface TableConfig<T> {
  columns: Array<TableColumn<T>>
}

export const CustomTable = <T, >({config, isLoading, loaderIcon, error, data}: {
  config: TableConfig<T>,
  isLoading: boolean,
  loaderIcon: string,
  error: any,
  data?: Array<T>
}) => {
  return (
    <>
      {isLoading && <CustomImage width='115px' height='32px' path={loaderIcon}/>}
      {!isLoading && error && <Typography>Oops, something went wrong :(</Typography>}
      {!isLoading && !error && <TableContainer>
        <Table>
          <TableHead>
            <TableRow role={'columnheader'}>
              {config.columns.map((header: TableColumn<T>) => (
                <TableCell key={header.key} role={'columnheader'}>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((entity: T, rowIndex: number) => (
              <TableRow key={rowIndex} role={'row'}>
                {config.columns.map((column: TableColumn<T>, rowIndex: number) => (
                  <TableCell key={rowIndex}
                             size='small'
                             role={'row'}>{column.render ? column.render(entity[column.key], entity) : entity[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </>
  )
}
