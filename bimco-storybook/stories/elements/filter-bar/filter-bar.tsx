import * as React from 'jsx-dom';
import './filter-bar.scss'
import { Button } from '../button/button';

interface FilterBarArgs {
  values: string[];
}

export const FilterBar = ({
  values
}: FilterBarArgs) => {
  const barClass = "filter-bar";
  const linkClass = "filter-bar__clear";

  const valuesJoined = values.map(value => "'" + value + "'" ).join();

  return <div class={barClass} x-load="visible"
  x-data={ `filterBar([${valuesJoined}])` }
  x-effect="handleResize($store.mediaQuery)">
    <div class="filter-bar__tag-container"></div>
    <Button type="link" label="Clear all" contextClass={linkClass}></Button>
  </div>
};
