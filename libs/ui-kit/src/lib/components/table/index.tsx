import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { CustomImage } from '../image';
import { useEffect, useState } from 'react';

export interface TableColumn<T> {
  label: string;
  key: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableConfig<T> {
  columns: Array<TableColumn<T>>;
}

export const CustomTable = <T, >({ config, data, isLoading, loaderIcon, error, searchQuery }: {
  config: TableConfig<T>,
  data: Array<T>,
  isLoading: boolean,
  loaderIcon: string,
  error: any,
  searchQuery?: string,
}) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    const filteredData = data.filter(it => it.name?.toLowerCase().includes(searchQuery.toLowerCase()) || it.title?.toLowerCase().includes(searchQuery.toLowerCase()));
    setTableData(filteredData);
  }, [searchQuery, data]);

  return (
    <>
      {isLoading && <CustomImage width="115px" height="32px" path={loaderIcon} />}
      {!isLoading && error && <Typography>Oops, something went wrong :(</Typography>}
      {!isLoading && !error && (
        <>
          {tableData.length === 0 ? (
            <Typography>No results found</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow role={'columnheader'}>
                    {config.columns.map((header: TableColumn<T>) => (
                      <TableCell key={header.key} role={'columnheader'}>
                        {header.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.map((entity: T, rowIndex: number) => (
                    <TableRow key={rowIndex} role={'row'}>
                      {config.columns.map((column: TableColumn<T>, rowIndex: number) => (
                        <TableCell key={rowIndex} size="small" role={'row'}>
                          {column.render ? column.render(entity[column.key], entity) : entity[column.key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
};

