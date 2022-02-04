import React, { FC } from 'react';
import {
  TableCell as MuiTableCell,
  TableSortLabel,
  styled,
  Divider as MuiDivider,
  Collapse,
} from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_FilterTextfield } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';

export const StyledTableHeadCell = styled(MuiTableCell)({
  fontWeight: 'bold',
  verticalAlign: 'text-top',
});

const TableCellContents = styled('div')({
  display: 'grid',
});

const TableCellText = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

const CellFlexItem = styled('span')({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
});

const Divider = styled(MuiDivider)({
  borderRightWidth: '2px',
  borderRadius: '2px',
  maxHeight: '2rem',
});

interface Props {
  column: HeaderGroup;
}

export const MRT_TableHeadCell: FC<Props> = ({ column }) => {
  const {
    densePadding,
    disableColumnActions,
    disableFilters,
    enableColumnResizing,
    localization,
    muiTableHeadCellProps,
    showFilters,
    tableInstance,
  } = useMaterialReactTable();

  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  const mTableHeadCellProps =
    muiTableHeadCellProps instanceof Function
      ? muiTableHeadCellProps(column)
      : muiTableHeadCellProps;

  const tableCellProps = {
    ...mTableHeadCellProps,
    ...column.getHeaderProps(),
    style: {
      padding: densePadding ? '0.5rem' : '1rem',
      transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
      ...column.getHeaderProps().style,
      ...(mTableHeadCellProps?.style ?? {}),
    },
  };

  return (
    <StyledTableHeadCell align={isParentHeader ? 'center' : 'left'} {...tableCellProps}>
      <TableCellContents>
        <TableCellText
          style={{ justifyContent: isParentHeader ? 'center' : undefined }}
        >
          <CellFlexItem {...column.getSortByToggleProps()}>
            {column.render('Header')}
            {!isParentHeader && column.canSort && (
              <TableSortLabel
                aria-label={
                  column.isSorted
                    ? column.sortDescFirst
                      ? localization?.columnActionMenuItemClearSort
                      : localization?.columnActionMenuItemSortDesc
                    : localization?.columnActionMenuItemSortAsc
                }
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
                style={{ margin: 0 }}
              />
            )}
          </CellFlexItem>
          <CellFlexItem>
            {!disableColumnActions && !isParentHeader && (
              <MRT_ToggleColumnActionMenuButton column={column} />
            )}
            {enableColumnResizing && !isParentHeader && (
              <Divider
                flexItem
                orientation="vertical"
                onDoubleClick={() => tableInstance.resetResizing()}
                {...column.getResizerProps()}
              />
            )}
          </CellFlexItem>
        </TableCellText>
        {!disableFilters && column.canFilter && (
          <Collapse in={showFilters}>
            <MRT_FilterTextfield column={column} />
          </Collapse>
        )}
      </TableCellContents>
    </StyledTableHeadCell>
  );
};
