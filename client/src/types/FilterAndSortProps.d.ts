type FilterAndSortProps = {
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
