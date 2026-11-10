"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronRight,
  ChevronDown,
  X,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Search,
} from "lucide-react";
import useDebounce from "@/hooks/useDebounce";

const DEFAULT_PAGE_SIZE = 10;

/* ================= HELPERS ================= */
const alignClass = (align) => {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
};

/* ================= SKELETON ROW ================= */
const SkeletonRow = ({ columnCount }) => {
  return (
    <tr className="border-b border-g-200 dark:border-white/10 animate-pulse">
      {Array.from({ length: columnCount }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 w-full rounded bg-g-100 dark:bg-g-800" />
        </td>
      ))}
    </tr>
  );
};

const pageButtonBase =
  "h-7 min-w-7 px-2 inline-flex items-center justify-center rounded-md border text-xs tabular-nums transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
const pageButtonIdle =
  "border-g-200 dark:border-white/10 bg-paper dark:bg-g-850 text-g-600 dark:text-g-300 hover:bg-g-100 dark:hover:bg-g-800";
const pageButtonActive =
  "border-g-900 bg-g-900 text-white dark:border-g-50 dark:bg-g-50 dark:text-g-900";

const GenericTable = ({
  title = "",
  columnsConfig,
  fetchData,
  initialSort = { key: "id", order: "asc" },
  refreshKey,
  filters = {}, // Add this new prop
  extraFilters, // New Prop: This will be a React component/element
}) => {
  /* ================= STATE ================= */
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);
  const [sortBy, setSortBy] = useState(initialSort.key);
  const [order, setOrder] = useState(initialSort.order);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filtered, setFiltered] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ================= DERIVED ================= */
  const visibleColumns = columnsConfig.filter((c) => c.enableHiding !== true);
  const hiddenColumns = columnsConfig.filter((c) => c.enableHiding === true);
  const enableExpansion = hiddenColumns.length > 0;

  /* ================= DATA FETCH ================= */

  useEffect(() => {
    let alive = true;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchData({
          page,
          limit,
          sort: sortBy,
          order: order.toUpperCase(),
          search: debouncedSearch || undefined,
          filters: filters, // Pass the filters object directly here
        });
        if (!alive) return;
        setData(res?.data || []);
        setFiltered(res?.filtered ?? res?.total ?? 0);
        setTotal(res?.total ?? 0);
      } finally {
        alive && setLoading(false);
      }
    };

    load();
    return () => (alive = false);
  }, [
    page,
    limit,
    sortBy,
    order,
    debouncedSearch,
    refreshKey,
    JSON.stringify(filters),
  ]);

  /* ================= SORT ================= */
  const handleSort = (key) => {
    setOrder(sortBy === key && order === "asc" ? "desc" : "asc");
    setSortBy(key);
  };

  /* ================= COLUMNS ================= */
  const columns = useMemo(() => {
    const expanderColumn = enableExpansion
      ? [
          {
            id: "expander",
            size: 48,
            header: "",
            meta: { align: "center" },
            cell: ({ row }) => (
              <button
                type="button"
                onClick={row.getToggleExpandedHandler()}
                aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
                className="flex items-center justify-center h-6 w-6 rounded-md border border-g-200 dark:border-white/10 bg-g-50 dark:bg-g-800 text-g-600 dark:text-g-400 hover:bg-g-100 dark:hover:bg-g-700 transition-colors"
              >
                {row.getIsExpanded() ? (
                  <ChevronDown size={14} strokeWidth={1.5} />
                ) : (
                  <ChevronRight size={14} strokeWidth={1.5} />
                )}
              </button>
            ),
          },
        ]
      : [];

    const mapped = visibleColumns.map((col) => {
      if (!col.sortable) return { ...col };

      const active = sortBy === col.accessorKey;
      const SortIcon = !active ? ArrowUpDown : order === "asc" ? ArrowUp : ArrowDown;

      return {
        ...col,
        header: (
          <span
            onClick={() => handleSort(col.accessorKey)}
            className="cursor-pointer select-none inline-flex items-center gap-1.5"
          >
            {col.header}
            <SortIcon
              size={12}
              strokeWidth={1.5}
              className={
                active
                  ? "text-accent-600 dark:text-accent-500"
                  : "text-g-400 dark:text-g-500"
              }
            />
          </span>
        ),
      };
    });

    return [...expanderColumn, ...mapped];
  }, [visibleColumns, sortBy, order, enableExpansion]);

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getRowId: (row) => row.uuid || row.id,
    getRowCanExpand: () => enableExpansion,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  useEffect(() => {
    setExpanded({});
  }, [page]);

  const totalPages = Math.ceil(filtered / limit) || 1;
  const visibleColumnCount = table.getAllLeafColumns().length;

  /* ================= UI ================= */
  return (
    <div className="bg-paper dark:bg-g-850 rounded-xl border border-g-200 dark:border-white/10 overflow-hidden">
      {title && (
        <div className="px-5 py-4 border-b border-g-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-3.5 w-[2px] rounded-full bg-accent-600 dark:bg-accent-500"
            />
            <h2 className="text-sm font-medium text-g-900 dark:text-g-100">
              {title}
            </h2>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3 border-b border-g-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-g-600 dark:text-g-400">
            <span>Rows</span>
            <select
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(Number(e.target.value));
              }}
              className="text-xs border border-g-200 dark:border-white/10 px-2 py-1.5 rounded-md bg-paper dark:bg-g-800 text-g-900 dark:text-g-100 focus:outline-none focus:ring-2 focus:ring-accent-600/50 transition-colors"
            >
              {[10, 20, 50].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          {/* This is where the Vendor Type dropdown will appear ONLY if passed */}
          {extraFilters}
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            strokeWidth={1.5}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-g-500"
          />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search"
            className="w-full text-sm border border-g-200 dark:border-white/10 pl-8 pr-8 py-1.5 rounded-md bg-paper dark:bg-g-800 text-g-900 dark:text-g-100 placeholder-g-500 focus:outline-none focus:ring-2 focus:ring-accent-600/50 focus:border-accent-600 transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-g-500 hover:text-g-900 dark:hover:text-g-100 transition-colors"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="relative w-full overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-g-50 dark:bg-g-900">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`
                      px-4 py-2.5 text-xs font-medium
                      text-g-600 dark:text-g-400
                      border-b border-g-200 dark:border-white/10
                      ${alignClass(header.column.columnDef.meta?.align)}
                    `}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: limit }).map((_, i) => (
                <SkeletonRow key={i} columnCount={visibleColumnCount} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumnCount}
                  className="px-4 py-10 text-center text-sm text-g-500 dark:text-g-400"
                >
                  No records found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <tr className="border-b border-g-200 dark:border-white/10 hover:bg-g-50 dark:hover:bg-g-800/60 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`
                          px-4 py-3
                          text-g-700 dark:text-g-300
                          ${alignClass(cell.column.columnDef.meta?.align)}
                        `}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>

                  {row.getIsExpanded() && (
                    <tr className="bg-g-50 dark:bg-g-900/60 border-b border-g-200 dark:border-white/10">
                      <td colSpan={visibleColumnCount}>
                        <div className="grid gap-1.5 p-4 text-sm text-g-700 dark:text-g-300">
                          {hiddenColumns.map((col) => (
                            <div key={col.accessorKey} className="flex">
                              <span className="w-40 flex-shrink-0 text-g-500 dark:text-g-500">
                                {col.header}
                              </span>
                              {flexRender(
                                col.cell ?? ((ctx) => ctx.getValue()),
                                {
                                  row,
                                  column: col,
                                  getValue: () => row.original[col.accessorKey],
                                },
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3 text-xs text-g-600 dark:text-g-400">
        {/* Info */}
        <span className="tabular-nums">
          Showing {(page - 1) * limit + 1} to {Math.min(page * limit, filtered)}{" "}
          of {filtered} records
          {search && ` (filtered from ${total})`}
        </span>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          {/* Prev */}
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`${pageButtonBase} ${pageButtonIdle}`}
          >
            &lt;
          </button>

          {/* First + left ellipsis */}
          {page > 3 && (
            <>
              <button
                type="button"
                onClick={() => setPage(1)}
                className={`${pageButtonBase} ${pageButtonIdle}`}
              >
                1
              </button>
              <span className="px-1.5 select-none text-g-500">…</span>
            </>
          )}

          {/* Middle pages */}
          {Array.from({ length: 5 }, (_, i) => {
            const pg = page - 2 + i;
            if (pg < 1 || pg > totalPages) return null;

            return (
              <button
                type="button"
                key={pg}
                onClick={() => setPage(pg)}
                className={`${pageButtonBase} ${
                  pg === page ? pageButtonActive : pageButtonIdle
                }`}
              >
                {pg}
              </button>
            );
          })}

          {/* Right ellipsis + last */}
          {page < totalPages - 2 && (
            <>
              <span className="px-1.5 select-none text-g-500">…</span>
              <button
                type="button"
                onClick={() => setPage(totalPages)}
                className={`${pageButtonBase} ${pageButtonIdle}`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`${pageButtonBase} ${pageButtonIdle}`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericTable;
