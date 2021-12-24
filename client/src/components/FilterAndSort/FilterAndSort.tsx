import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';

const FilterAndSort = ({
  availableFilters,
  appliedFilters,
  setAppliedFilters,
  appliedSorting,
  setAppliedSorting,
}: FilterAndSortProps) => {
  return (
    <div className="flex">
      <Filter
        availableFilters={availableFilters}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
      />
      <Sort
        appliedSorting={appliedSorting}
        setAppliedSorting={setAppliedSorting}
      />
    </div>
  );
};
export default FilterAndSort;
