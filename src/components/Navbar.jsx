import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Moon,
  Sun,
  Menu,
  LogOut,
  Settings as SettingsIcon,
  Search,
  ChevronsLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export function Navbar({
  onMobileToggle,
  onDesktopToggle,
  userName = "John Doe",
  userRole = "Product Manager",
}) {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function onKey(e) {
      const isShortcut =
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";

      if (isShortcut) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const iconButton =
    "p-2 rounded-lg text-g-600 dark:text-g-400 hover:bg-g-100 dark:hover:bg-g-800 hover:text-g-900 dark:hover:text-g-100 active:bg-g-200 dark:active:bg-g-700 transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-paper dark:bg-g-900 border-b border-g-200 dark:border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT */}
          <div className="flex items-center gap-1.5">
            <button
              className={`${iconButton} lg:hidden`}
              onClick={onMobileToggle}
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>

            <button
              className={`${iconButton} hidden lg:inline-flex`}
              onClick={onDesktopToggle}
              aria-label="Toggle sidebar"
            >
              <ChevronsLeft size={18} />
            </button>

            <div className="ml-2 flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-4 w-[3px] rounded-full bg-accent-600 dark:bg-accent-500"
              />
              <span className="text-[17px] font-semibold tracking-[-0.01em] text-g-900 dark:text-g-50">
                DashHub
              </span>
            </div>
          </div>

          {/* CENTER SEARCH */}
          <div className="flex-1 flex justify-center px-4">
            <div className="w-full max-w-lg hidden md:flex items-center bg-g-100 dark:bg-g-850 border border-g-200 dark:border-white/10 rounded-lg px-3 py-1.5 transition-colors">
              <Search size={16} className="text-g-500 dark:text-g-500" />

              <input
                ref={searchRef}
                placeholder="Search"
                className="bg-transparent ml-2 outline-none text-sm text-g-900 dark:text-g-100 placeholder-g-500 w-full"
              />

              <span className="ml-3 hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-g-200 dark:border-white/10 bg-paper dark:bg-g-800 font-mono text-[11px] leading-4 text-g-500 dark:text-g-400">
                  Ctrl
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-g-200 dark:border-white/10 bg-paper dark:bg-g-800 font-mono text-[11px] leading-4 text-g-500 dark:text-g-400">
                  K
                </kbd>
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1.5">
            {/* THEME */}
            <button
              onClick={toggleTheme}
              className={iconButton}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* NOTIFICATIONS */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotif((s) => !s)}
                className={`${iconButton} relative`}
                aria-label="Notifications"
                aria-expanded={showNotif}
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-600 dark:bg-accent-500" />
              </button>

              {showNotif && (
                <div className="animate-in absolute right-0 mt-2 w-80 bg-paper dark:bg-g-850 border border-g-200 dark:border-white/10 rounded-xl shadow-lg dark:shadow-none overflow-hidden">
                  <div className="px-4 py-3 text-sm font-medium text-g-900 dark:text-g-100 border-b border-g-200 dark:border-white/10">
                    Notifications
                  </div>
                  <div className="px-4 py-4 text-sm text-g-600 dark:text-g-400">
                    No new notifications
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile((s) => !s)}
                className="flex items-center gap-2.5 px-1.5 py-1 rounded-lg hover:bg-g-100 dark:hover:bg-g-800 transition-colors"
                aria-expanded={showProfile}
              >
                <span className="w-8 h-8 rounded-full bg-g-100 dark:bg-g-800 border border-g-200 dark:border-white/10 flex items-center justify-center text-xs font-medium text-g-700 dark:text-g-200">
                  {userName.charAt(0)}
                </span>

                <span className="hidden sm:block text-left">
                  <span className="block text-sm font-medium text-g-900 dark:text-g-100">
                    {userName}
                  </span>
                  <span className="block text-xs text-g-600 dark:text-g-400">
                    {userRole}
                  </span>
                </span>
              </button>

              {showProfile && (
                <div className="animate-in absolute right-0 mt-2 w-56 bg-paper dark:bg-g-850 border border-g-200 dark:border-white/10 rounded-xl shadow-lg dark:shadow-none overflow-hidden">
                  <div className="px-4 py-3 border-b border-g-200 dark:border-white/10">
                    <div className="text-sm font-medium text-g-900 dark:text-g-100">
                      {userName}
                    </div>
                    <div className="text-xs text-g-600 dark:text-g-400">
                      {userRole}
                    </div>
                  </div>

                  <button className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm text-g-700 dark:text-g-300 hover:bg-g-100 dark:hover:bg-g-800 transition-colors">
                    <SettingsIcon size={16} className="text-g-500" />
                    Profile settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm text-negative hover:bg-g-100 dark:hover:bg-g-800 border-t border-g-200 dark:border-white/10 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
