import React, {useMemo, useState} from "react";
import {ArrowPathIcon, ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/solid";

// Column interface for generic DataTable
export interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
}

// DataTable props
export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onRefresh?: () => void;
}

/**
 * Generic, reusable DataTable component
 */
function DataTable<T>({
  columns,
  data,
  showAdd = false,
  showEdit = false,
  showDelete = false,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
}: DataTableProps<T>) {
  // Sort configuration: key is a column accessor, direction is 'asc' or 'desc'
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  // Search state for filtering rows
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Memoized filtered data based on searchTerm
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lower = searchTerm.toLowerCase();
    return data.filter(row =>
      columns.some(col => {
        const value = typeof col.accessor === "function"
          ? col.accessor(row)
          : (row[col.accessor] as unknown);
        return String(value).toLowerCase().includes(lower);
      })
    );
  }, [data, columns, searchTerm]);

  // Sort the filtered data based on sortConfig
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const { key, direction } = sortConfig;
    return [...filteredData].sort((a, b) => {
      const aVal = a[key] as unknown as string | number | Date;
      const bVal = b[key] as unknown as string | number | Date;
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  return (
    <>
      {showAdd && onAdd && (
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={onAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New
          </button>
        </div>
      )}
      <div className="w-full mx-auto shadow border-b border-gray-200 sm:rounded-lg overflow-x-auto">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded mr-2"
          />
          <button
            type="button"
            onClick={onRefresh}
            className="flex-shrink-0 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            aria-label="Refresh"
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200 table-auto md:table-fixed">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-2 sm:px-4 py-1 sm:py-2 text-left font-semibold text-gray-700 whitespace-normal break-words">
                  {typeof col.accessor === "string" ? (
                    <button
                      type="button"
                      className="flex items-center space-x-1"
                      onClick={() => {
                        // Determine next direction
                        let direction: "asc" | "desc" = "asc";
                        if (sortConfig?.key === col.accessor && sortConfig.direction === "asc") {
                          direction = "desc";
                        }
                        if (typeof col.accessor === "string") {
                          setSortConfig({ key: col.accessor, direction });
                        }
                      }}
                    >
                      <span>{col.header}</span>
                      {sortConfig?.key === col.accessor ? (
                        sortConfig.direction === "asc" ? (
                          <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                        )
                      ) : null}
                    </button>
                  ) : (
                    <span>{col.header}</span>
                  )}
                </th>
              ))}
              {/* Conditionally render Actions header if edit or delete is enabled */}
              {(showEdit || showDelete) && (
                <th className="px-2 sm:px-4 py-1 sm:py-2 text-left font-semibold text-gray-700 whitespace-normal break-words">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : row[col.accessor];

                  return (
                    <td
                      key={colIndex}
                      className="px-2 sm:px-4 py-1 sm:py-2 text-gray-800 whitespace-normal break-words"
                    >
                      {col.render
                        ? col.render(value, row, rowIndex)
                        : (value as React.ReactNode)}
                    </td>
                  );
                })}
                {/* Conditionally render action buttons */}
                {(showEdit || showDelete) && (
                  <td className="px-2 sm:px-4 py-1 sm:py-2 space-x-2 whitespace-normal break-words">
                    {showEdit && onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(row)}
                        aria-label="Edit"
                        className="inline-flex items-center px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    )}
                    {showDelete && onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(row)}
                        aria-label="Delete"
                        className="inline-flex items-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;