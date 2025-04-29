import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Image } from '@my-monorepo/ui-kit';
import { TableColumn, TableConfig } from '../types';

const CustomTable = <T,>({
  config,
  data,
  isLoading,
  loaderIcon,
  error,
}: {
  config: TableConfig<T>;
  data: T[];
  isLoading: boolean;
  loaderIcon: string;
  error: any;
}) => {
  return (
    <>
      {isLoading && <Image width="115px" height="32px" path={loaderIcon} />}
      {!isLoading && error && (
        <Typography>Oops, something went wrong :(</Typography>
      )}
      {!isLoading && !error && (
        <>
          {data.length === 0 ? (
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
                  {data.map((entity: T, rowIndex: number) => (
                    <TableRow key={rowIndex} role={'row'}>
                      {config.columns.map(
                        (column: TableColumn<T>, rowIndex: number) => (
                          <TableCell key={rowIndex} size="small" role={'row'}>
                            {column.render
                              ? column.render(entity[column.key], entity)
                              : entity[column.key]}
                          </TableCell>
                        )
                      )}
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

export default CustomTable;
