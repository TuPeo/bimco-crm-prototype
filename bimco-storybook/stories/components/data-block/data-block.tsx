import * as React from 'jsx-dom';
import { Table, TableArgs } from "../../elements/table/table";
import { SimpleSelect, SimpleSelectProps } from '../../elements/form-control/simple-select/simple-select';

import './data-block.scss';

export interface DataBlockTabArgs {
  label: string;
  table: TableArgs
}

export interface DataBlockArgs {
  id: string;
  heading: string;
  topFilter?: SimpleSelectProps;
  filtersHeading?: string;
  filters?: SimpleSelectProps[];
  tabs: DataBlockTabArgs[];
}

export const DataBlock = ({
  id,
  heading,
  topFilter,
  filtersHeading,
  filters,
  tabs
}: DataBlockArgs) => {
  return <div id={id} class="data-block" x-load x-data="dataBlock">
    {heading &&
      <div class="data-block__header">
        <h5 class="data-block__heading">{heading}</h5>
        {topFilter &&
          <SimpleSelect {...topFilter} />
        }
      </div>
    }
    <div class="data-block__content">
      {filters &&
        <div class="data-block__filters-wrapper">
          <div class="data-block__filters-heading">
            {filtersHeading}
          </div>
          <div class="data-block__filters">
            {filters.map(filter =>
              <SimpleSelect {...filter} />
            )}
          </div>
        </div>
      }
      <div class="data-block__table-wrapper">
        {tabs.length > 1 &&
          <div class="nav nav-tabs" role="tablist">
            {tabs.map((tab, index) =>
              <div
                id={`${id}--tab-${index}`}
                role="tab"
                aria-controls={`${id}--tab-pane-${index}`}
                data-bs-toggle="tab"
                data-bs-target={`#${id}--tab-pane-${index}`}
                class={index == 0 ? "nav-link active" : "nav-link"}>
                {tab.label}
              </div>
            )}
          </div>
        }
        <div class="tab-content">
          {tabs.map((tab, index) =>
            <div 
              id={`${id}--tab-pane-${index}`} 
              aria-labelledby={`${id}--tab-${index}`}
              role="tabpanel"
              class={index == 0 ? "tab-pane fade show active" : "tab-pane fade"}>
              <Table {...tab.table} />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
};
