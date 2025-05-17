import React, { ReactNode } from "react";

interface Props {
  columns: string[];
  content: ReactNode[][];
}

export const Table = ({ columns, content }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-2 font-semibold bg-sidebar-accent border-sidebar"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
