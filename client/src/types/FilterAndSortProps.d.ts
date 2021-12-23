type FilterAndSortProps = FilterProps & SortProps;

type FilterProps = {
  availableFilters: AvailableFilters;
  appliedFilters: AvailableFilters;
  setAppliedFilters: Function;
};

type AvailableFilters =
  | {
      department: Array<string>;
      country: Array<string>;
    }
  | undefined;

type SortProps = {
  appliedSorting: string;
  setAppliedSorting: Function;
};
