"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import {
  Search,
  Bell,
  User,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
  },
  {
    name: "Fasilitas Olahraga",
    path: "/admin/fasilitas_olahraga",
  },
  {
    name: "Data Lapangan",
    path: "/admin/data_lapangan",
  },
  {
    name: "Kategori",
    path: "/admin/kategori",
  },
  {
    name: "Peta Editor",
    path: "/admin/peta_editor",
  },
];

export function Header() {
  const router = useRouter();

  const [search, setSearch] =
    useState("");

  const [isNotifOpen, setIsNotifOpen] =
    useState(false);

  const [isUserOpen, setIsUserOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const filteredMenus =
    search.length > 0
      ? menuItems.filter((item) =>
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        )
      : [];

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
  try {
    const response = await fetch(
      "/api/notifications"
    );

    const data =
      await response.json();

    console.log(
      "NOTIFICATIONS:",
      data
    );

    setNotifications(
      Array.isArray(data)
        ? data
        : []
    );
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setIsNotifOpen(false);
        setIsUserOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <Input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Cari menu..."
            className="pl-10 bg-slate-50 border-slate-200 text-sm"
          />

          {filteredMenus.length >
            0 && (
            <div className="absolute mt-2 w-full bg-white border rounded-xl shadow-lg overflow-hidden z-50">
              {filteredMenus.map(
                (menu) => (
                  <button
                    key={menu.path}
                    onClick={() => {
                      router.push(
                        menu.path
                      );
                      setSearch("");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm"
                  >
                    {menu.name}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div
          ref={dropdownRef}
          className="flex items-center gap-3 ml-auto"
        >
          {/* Notification */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setIsNotifOpen(
                  !isNotifOpen
                )
              }
            >
              <Bell className="w-5 h-5 text-slate-600" />

              {notifications.length >
                0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  {
                    notifications.length
                  }
                </span>
              )}
            </Button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b">
                  <h3 className="font-semibold text-slate-900">
                    Notifikasi
                  </h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length >
                  0 ? (
                    notifications.map(
                      (notif) => (
                        <div
                          key={
                            notif.id
                          }
                          className="px-4 py-3 border-b hover:bg-slate-50"
                        >
                          <p className="text-sm text-slate-800">
                            {
                              notif.title
                            }
                          </p>

                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(
                              notif.createdAt
                            ).toLocaleString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <div className="p-6 text-center text-sm text-slate-500">
                      Belum ada
                      notifikasi
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setIsUserOpen(
                  !isUserOpen
                )
              }
            >
              <User className="w-5 h-5 text-slate-600" />
            </Button>

            {isUserOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b">
                  <p className="font-medium">
                    Administrator
                  </p>

                  <p className="text-xs text-slate-500">
                    Admin GIS
                  </p>
                </div>

          

               <button
  onClick={async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.clear();

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }}
  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm"
>
  Logout
</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}