import { useState } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Tab, Tabs } from '@material-ui/core';
import { Adjustments as AdjustmentsIcon } from '../../icons/adjustments';
import type { Filter } from '../../types/filter';
import {
  containsOperator,
  endsWithOperator,
  equalOperator,
  greaterThanOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator,
  lessThanOperator,
  notContainsOperator,
  notEqualOperator,
  startsWithOperator
} from '../../utils/filter-operators';
import { BulkActionsMenu } from '../bulk-actions-menu';
import { Query } from '../query';
import { FilterDialog } from '../filter-dialog';

interface CustomersFilterProps {
  disabled: boolean;
  filters: Array<{ property: string; value: string; operator: string }>;
  onFiltersApply: (newFilters: Filter[]) => void;
  onFiltersClear: () => void;
  onQueryChange: (newQuery: string) => void;
  onViewChange: (newView: string) => void;
  query: string;
  selectedCustomers: string[];
  view: string;
}

const views = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Returning',
    value: 'isReturning'
  },
  {
    label: 'Ordered recently',
    value: 'orderedRecently'
  }
];

const filterProperties = [
  {
    label: 'Name',
    name: 'fullName',
    type: 'string'
  },
  {
    label: 'Phone',
    name: 'phone',
    type: 'string'
  },
  {
    label: 'Email',
    name: 'email',
    type: 'string'
  },
  {
    label: 'Created',
    name: 'createdAt',
    type: 'date'
  }
];

const filterOperators = [
  equalOperator,
  notEqualOperator,
  containsOperator,
  notContainsOperator,
  startsWithOperator,
  endsWithOperator,
  greaterThanOperator,
  lessThanOperator,
  isAfterOperator,
  isBeforeOperator,
  isBlankOperator,
  isPresentOperator
];

export const CustomersFilter: FC<CustomersFilterProps> = (props) => {
  const {
    disabled,
    filters,
    onFiltersApply,
    onFiltersClear,
    onQueryChange,
    onViewChange,
    query,
    selectedCustomers,
    view
  } = props;
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  return (
    <>
      <div>
        <Box
          sx={{
            px: {
              sm: 3
            }
          }}
        >
          <Tabs
            onChange={(event, value) => onViewChange?.(value)}
            allowScrollButtonsMobile
            value={view}
            variant="scrollable"
          >
            {views.map((option) => (
              <Tab
                disabled={disabled}
                key={option.label}
                label={option.label}
                value={option.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              sm: selectedCustomers.length > 0 ? 'auto 1fr auto' : '1fr auto',
              xs: 'auto'
            },
            justifyItems: 'flex-start',
            p: 3
          }}
        >
          <BulkActionsMenu
            disabled={disabled}
            onArchive={() => {}}
            onDelete={() => {}}
            selectedCount={selectedCustomers.length}
            sx={{
              display: selectedCustomers.length > 0 ? 'flex' : 'none',
              order: {
                sm: 1,
                xs: 2
              }
            }}
          />
          <Query
            disabled={disabled}
            onChange={onQueryChange}
            sx={{
              order: {
                sm: 2,
                xs: 1
              }
            }}
            value={query}
          />
          <Button
            color="primary"
            disabled={disabled}
            onClick={() => setOpenFilterDialog(true)}
            startIcon={<AdjustmentsIcon />}
            size="large"
            sx={{ order: 3 }}
            variant={filters.length ? 'contained' : 'text'}
          >
            Filter
          </Button>
        </Box>
      </div>
      <FilterDialog
        onApply={onFiltersApply}
        onClear={onFiltersClear}
        onClose={() => setOpenFilterDialog(false)}
        open={openFilterDialog}
        operators={filterOperators}
        properties={filterProperties}
      />
    </>
  );
};

CustomersFilter.defaultProps = {
  filters: [],
  selectedCustomers: [],
  view: 'all'
};

CustomersFilter.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.array,
  onFiltersApply: PropTypes.func,
  onFiltersClear: PropTypes.func,
  onQueryChange: PropTypes.func,
  onViewChange: PropTypes.func,
  query: PropTypes.string,
  selectedCustomers: PropTypes.array,
  view: PropTypes.string
};
