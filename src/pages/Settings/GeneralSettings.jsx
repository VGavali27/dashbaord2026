import React from "react";
import PageHeader from "@/components/PageHeader";
import {
  DEFAULT_FONT_FAMILY,
  FONT_FAMILIES,
  useTheme,
} from "@/context/ThemeContext";

const DEFAULT_FONT_SIZE = 16;

const sizeOptions = [
  { value: 14, label: "14px", hint: "Small" },
  { value: 15, label: "15px", hint: "Small +" },
  { value: 16, label: "16px", hint: "Medium" },
  { value: 17, label: "17px", hint: "Large -" },
  { value: 18, label: "18px", hint: "Large" },
];

const optionClass = (checked) =>
  `flex items-center justify-between gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
    checked
      ? "border-accent-600 dark:border-accent-500 bg-accent-600/5 dark:bg-accent-500/10"
      : "border-g-200 dark:border-white/10 bg-g-50 dark:bg-g-800 hover:bg-g-100 dark:hover:bg-g-700"
  }`;

export default function GeneraSettings() {
  const { fontSize, fontFamily, changeFontSize, changeFontFamily } = useTheme();

  const handleRestoreDefaults = () => {
    changeFontSize(DEFAULT_FONT_SIZE);
    changeFontFamily(DEFAULT_FONT_FAMILY);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="General settings"
        subtitle="Reading preferences for this workspace"
      />

      {/* Font family */}
      <div className="bg-paper dark:bg-g-850 rounded-xl p-6 border border-g-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-3.5 w-[2px] rounded-full bg-accent-600 dark:bg-accent-500"
          />
          <h2 className="text-sm font-medium text-g-900 dark:text-g-100">
            Font family
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FONT_FAMILIES.map((option) => {
            const checked = fontFamily === option.value;

            return (
              <label
                key={option.value}
                className={optionClass(checked)}
              >
                <span>
                  <span
                    className="block text-sm font-medium text-g-900 dark:text-g-100"
                    style={{ fontFamily: option.sample }}
                  >
                    {option.label}
                  </span>
                  <span className="block text-xs text-g-600 dark:text-g-400">
                    {option.hint}
                  </span>
                </span>

                <input
                  type="radio"
                  name="font-family"
                  value={option.value}
                  checked={checked}
                  onChange={() => changeFontFamily(option.value)}
                  className="accent-accent-600"
                />
              </label>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-g-500 dark:text-g-500">
          Applies across the whole workspace
        </p>
      </div>

      {/* Base font size */}
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

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {sizeOptions.map((option) => {
            const checked = fontSize === option.value;

            return (
              <label
                key={option.value}
                className={optionClass(checked)}
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
                  value={option.value}
                  checked={checked}
                  onChange={() => changeFontSize(option.value)}
                  className="accent-accent-600"
                />
              </label>
            );
          })}
        </div>

        {/* Live preview: shows the real rendered sizes and the chosen pair */}
        <div className="mt-4 rounded-lg border border-g-200 dark:border-white/10 bg-g-50 dark:bg-g-800 px-4 py-3 space-y-1.5">
          <p className="text-xs text-g-500 dark:text-g-500">Preview</p>
          <p
            style={{ fontSize: `${fontSize * 0.75}px` }}
            className="text-g-500 dark:text-g-400 leading-snug"
          >
            Label text
          </p>
          <p
            style={{ fontSize: `${fontSize * 0.875}px` }}
            className="text-g-900 dark:text-g-100 leading-snug"
          >
            Body text — the quick brown fox jumps over the lazy dog
          </p>
          <p
            style={{ fontSize: `${fontSize * 1.75}px` }}
            className="text-g-900 dark:text-g-50 font-medium leading-tight"
          >
            Page title
          </p>
          <p
            style={{ fontSize: `${fontSize * 0.75}px` }}
            className="font-mono text-g-500 dark:text-g-400 tabular-nums"
          >
            TASK-1042 · 23 today
          </p>
        </div>

        <p className="mt-3 text-xs text-g-500 dark:text-g-500">
          Changes apply instantly as you select
        </p>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-g-200 dark:border-white/10">
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-g-200 dark:border-white/10 bg-paper dark:bg-g-850 text-g-700 dark:text-g-300 hover:bg-g-100 dark:hover:bg-g-800 transition-colors"
          >
            Restore defaults
          </button>
        </div>
      </div>
    </div>
  );
}
