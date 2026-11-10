import React from "react";

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

export default SkeletonRow;
