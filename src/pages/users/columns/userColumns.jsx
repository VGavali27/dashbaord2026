import { Eye, Pencil } from "lucide-react";
import { formatDateTime } from "@/utils/dateUtils";
import { useNavigate } from "react-router-dom";

export const userColumns = ({ handleChangeStatus }) => {
  const navigate = useNavigate();
  return [
    {
      header: "ID",
      accessorKey: "id",
      size: 80,
      enableHiding: false,
      cell: ({ getValue }) => (
        <span className="font-mono text-xs text-g-500 dark:text-g-500 tabular-nums">
          {getValue()}
        </span>
      ),
    },

    {
      header: "Name",
      accessorKey: "user_name",
      size: 80,
      enableHiding: false,
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-g-900 dark:text-g-100">
            {`${row.original.first_name} ${row.original.last_name}`}
          </p>
          <p className="text-xs text-g-600 dark:text-g-400">
            {row.original.designation || "Employee"}
          </p>
        </div>
      ),
    },

    {
      header: "Email",
      accessorKey: "email",
      size: 80,
      enableHiding: false,
      cell: ({ getValue }) => (
        <span className="block max-w-[200px] text-g-600 dark:text-g-400">
          {getValue()}
        </span>
      ),
    },

    {
      header: "Phone",
      accessorKey: "phone",
      size: 80,
      enableHiding: false,
      cell: ({ getValue }) => (
        <span className="tabular-nums text-g-700 dark:text-g-300">
          {getValue()}
        </span>
      ),
    },

    {
      header: "Last login",
      accessorKey: "last_login_at",
      size: 80,
      enableHiding: false,
      cell: ({ getValue }) =>
        getValue() ? (
          <span className="tabular-nums text-g-600 dark:text-g-400">
            {formatDateTime(getValue())}
          </span>
        ) : (
          <span className="text-g-400 dark:text-g-500">—</span>
        ),
    },

    {
      header: "Status",
      accessorKey: "status",
      size: 80,
      enableHiding: false,

      cell: ({ row }) => {
        const user = row.original;
        const isActive = user.status === 1;

        return (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-pressed={isActive}
              aria-label={isActive ? "Deactivate user" : "Activate user"}
              onClick={() =>
                handleChangeStatus(user.uuid, isActive ? "active" : "inactive")
              }
              className={`relative w-9 h-5 flex items-center rounded-full border transition-[background-color,border-color] duration-200 ease-ui ${
                isActive
                  ? "bg-accent-600 dark:bg-accent-500 border-accent-700/30 dark:border-accent-500"
                  : "bg-g-200 dark:bg-g-700 border-g-300 dark:border-white/10"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full bg-paper dark:bg-g-950 transition-transform duration-200 ease-ui ${
                  isActive ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </button>

            <span
              className={`text-xs ${
                isActive
                  ? "text-g-900 dark:text-g-100"
                  : "text-g-500 dark:text-g-500"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        );
      },
    },

    {
      id: "actions",
      header: "Actions",
      meta: { align: "right" },
      enableHiding: false,

      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center gap-1 justify-end">
            <button
              type="button"
              onClick={() => console.log("View", user)}
              aria-label="View user"
              className="p-1.5 rounded-md text-g-500 dark:text-g-400 hover:bg-g-100 dark:hover:bg-g-800 hover:text-g-900 dark:hover:text-g-100 transition-colors"
            >
              <Eye size={16} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={() => navigate(`/users/edit/${user.uuid}`)}
              aria-label="Edit user"
              className="p-1.5 rounded-md text-g-500 dark:text-g-400 hover:bg-g-100 dark:hover:bg-g-800 hover:text-g-900 dark:hover:text-g-100 transition-colors"
            >
              <Pencil size={16} strokeWidth={1.5} />
            </button>
          </div>
        );
      },
    },
  ];
};
