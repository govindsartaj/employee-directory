import Filter from './Filter';
import Sort from './Sort';

const FilterAndSort = ({ availableFilters, appliedFilters, setAppliedFilters }: FilterAndSortProps) => {
  return (
    <div className="flex">
      <Filter availableFilters={availableFilters} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters}/>
      <Sort />
    </div>
  );
};
export default FilterAndSort;
