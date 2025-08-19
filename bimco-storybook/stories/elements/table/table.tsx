import * as React from 'jsx-dom';
import './table.scss';
import LinkArgs from "../../types/link-args";

interface TableCellArgs {
  iconBefore?: string;
  iconColor?: string;
  iconStyle?: string;
  link?: LinkArgs;
  value: string;
}

interface TableRowArgs {
  cells: TableCellArgs[];
}

export interface TableArgs {
  header: TableRowArgs;
  rows: TableRowArgs[];
}

export const TableBaseArgs = {
    header: {
      cells: [
        {
          value: "From"
        },
        {
          value: "To"
        },
        {
          value: "Activity"
        },
        {
          value: "Group"
        }
      ]
    },
    rows: [
      {
        cells: [
          {
            value: "06:00:00"
          },
          {
            value: "07:00:00"
          },
          {
            value: "Overtime by request"
          },
          {
            value: "shifts"
          }
        ]
      }, {
        cells: [
          {
            value: "07:00:00"
          },
          {
            value: "15:00:00"
          },
          {
            value: "Normal"
          },
          {
            value: "shifts"
          }
        ]
      }, {
        cells: [
          {
            value: "15:00:00"
          },
          {
            value: "05:30:00"
          },
          {
            value: "Overtime by request"
          },
          {
            value: "shifts"
          }
        ]
      },
    ]
};

export const TableMaximumSizeArgs = {
    header: {
      cells: [
        {
          value: ""
        },
        {
          value: "In metres"
        },
        {
          value: "In feet"
        }
      ]
    },
    rows: [
      {
        cells: [
          {
            value: "Maximum LOA"
          },
          {
            value: "No limitations"
          },
          {
            value: "-"
          }
        ]
      }, {
        cells: [
          {
            value: "Maximum beam"
          },
          {
            value: "No limitations"
          },
          {
            value: "-"
          }
        ]
      }, {
        cells: [
          {
            value: "Maximum draft"
          },
          {
            value: "11.4"
          },
          {
            value: "-"
          }
        ]
      }, {
        cells: [
          {
            value: "Maximum TDW"
          },
          {
            value: "-"
          },
          {
            value: "-"
          }
        ]
      },
    ]
};

export const TableLinksArgs = {
    header: {
      cells: [
        {
          value: "Heading"
        },
        {
          value: "Heading"
        },
        {
          value: "Heading"
        },
        {
          value: "Heading"
        },
      ]
    },
    rows: [
      {
        cells: [
          {
            value: "Lorem ipsum sip dolor"
          },
          {
            value: "Lorem ipsum sip dolor"
          },
          {
            iconColor: "#38A169",
            iconBefore: "arrow-up",
            iconStyle: "regular",
            value: "589 (+2)"
          },
          {
            link: {
              label: "Lorem ipsum",
              url: "/"
            },
            value: ""
          }
        ]
      }
    ]
};

export const Table = ({
  header,
  rows
}: TableArgs) => {
  return <table class="bimco-table">
    {header &&
      <thead>
        <tr>
          {header.cells.map(cell => (<th>
            { cell.link &&
              <a href={cell.link.url}>{cell.link.label}</a>
            }
            { cell.iconBefore && 
              <i class={`fa-sharp fa-${cell.iconStyle} fa-${cell.iconBefore}`} aria-hidden="true"></i> 
            }
            {cell.value}
          </th>))}
        </tr>
      </thead>
    }
    <tbody>
      {rows.map(row => (<tr>
        {row.cells.map(cell => (<td>
          { cell.link &&
            <a href={cell.link.url}>{cell.link.label}</a>
          }
          { cell.iconBefore && 
            <i class={`fa-sharp fa-${cell.iconStyle} fa-${cell.iconBefore}`} style={`color: ${cell.iconColor}`} aria-hidden="true"></i> 
          }
          {cell.value}
        </td>))}
      </tr>))}
    </tbody>
  </table>
};
