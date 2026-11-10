import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useTheme } from "@/context/ThemeContext";

const DEFAULT_FONT_SIZE = 16;

const sizeOptions = [
  { value: 14, label: "Small", hint: "14px" },
  { value: 16, label: "Medium", hint: "16px" },
  { value: 18, label: "Large", hint: "18px" },
];

export default function GeneraSettings() {
  const { fontSize: ctxFontSize, changeFontSize } = useTheme();

  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  useEffect(() => {
    const savedFontSize = parseInt(localStorage.getItem("fontSize"), 10);

    if (!Number.isNaN(savedFontSize) && savedFontSize > 0) {
      setFontSize(savedFontSize);
    } else if (typeof ctxFontSize === "number") {
      setFontSize(ctxFontSize);
    }
  }, [ctxFontSize]);

  const handleSubmit = () => {
    const size = Number(fontSize);

    if (Number.isNaN(size) || size <= 0) return;

    changeFontSize(size);
    localStorage.setItem("fontSize", String(size));
  };

  const handleRestoreDefaults = () => {
    setFontSize(DEFAULT_FONT_SIZE);
    changeFontSize(DEFAULT_FONT_SIZE);
    localStorage.removeItem("fontSize");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="General settings"
        subtitle="Reading preferences for this workspace"
      />

      <div className="bg-paper dark:bg-g-850 rounded-xl p-6 border border-g-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-3.5 w-[2px] rounded-full bg-accent-600 dark:bg-accent-500"
          />
          <h2 className="text-sm font-medium text-g-900 dark:text-g-100">
            Base font size
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sizeOptions.map((option) => {
            const checked = fontSize === option.value;

            return (
              <label
                key={option.value}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                  checked
                    ? "border-accent-600 dark:border-accent-500 bg-accent-600/5 dark:bg-accent-500/10"
                    : "border-g-200 dark:border-white/10 bg-g-50 dark:bg-g-800 hover:bg-g-100 dark:hover:bg-g-700"
                }`}
              >
                <span>
                  <span className="block text-sm font-medium text-g-900 dark:text-g-100">
                    {option.label}
                  </span>
                  <span className="block text-xs text-g-600 dark:text-g-400 tabular-nums">
                    {option.hint}
                  </span>
                </span>

                <input
                  type="radio"
                  name="font-size"
                  checked={checked}
                  onChange={() => setFontSize(option.value)}
                  className="accent-accent-600"
                />
              </label>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-g-500 dark:text-g-500">
          Changes apply across the app as soon as you save
        </p>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-g-200 dark:border-white/10">
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-g-200 dark:border-white/10 bg-paper dark:bg-g-850 text-g-700 dark:text-g-300 hover:bg-g-100 dark:hover:bg-g-800 transition-colors"
          >
            Restore defaults
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-g-900 text-white hover:bg-g-800 dark:bg-g-50 dark:text-g-900 dark:hover:bg-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-g-50 dark:focus-visible:ring-offset-g-900"
          >
            Save settings
          </button>
        </div>
      </div>
    </div>
  );
}
