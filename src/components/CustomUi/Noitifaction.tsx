"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { createPortal } from "react-dom";

import Link from "next/link";
import { useNoitifactions } from "@/src/Hooks/ReactQuery/users/useNoitifactions";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError: error } = useNoitifactions();

  const notifications = data?.getNoitafactions || [];

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative" dir="rtl">
      <button
        onClick={toggleDropdown}
        className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/20 z-[9999998]"
              onClick={closeDropdown}
            ></div>

            <div className="fixed top-16 right-4 w-96 bg-white shadow-2xl rounded-xl border border-gray-100 z-[9999999] overflow-hidden">
              <div className="p-4 font-semibold border-b border-gray-200 bg-gray-50 text-gray-800 text-right">
                الإشعارات
              </div>

              <ul className="max-h-80 overflow-auto divide-y divide-gray-100">
                {isLoading && (
                  <li className="p-4 text-gray-500 text-sm text-center">
                    جاري التحميل...
                  </li>
                )}

                {error && (
                  <li className="p-4 text-red-500 text-sm text-center">
                    حدث خطأ أثناء تحميل الإشعارات
                  </li>
                )}

                {!isLoading &&
                  !error &&
                  notifications.length > 0 &&
                  notifications.map((notif: any) => (
                    <Link
                      key={notif.id}
                      href={`/dashboard/${notif.redirectUrl} ` || "#"}
                    >
                      <li className="p-4 hover:bg-gray-100 transition cursor-pointer text-right">
                        <p
                          className="text-gray-800 text-sm font-medium leading-relaxed"
                          style={{ direction: "rtl", unicodeBidi: "plaintext" }}
                        >
                          {notif.message}
                        </p>
                        <div className="mt-1 text-xs text-gray-500">
                          {formatDate(notif.createdAt)}
                        </div>
                      </li>
                    </Link>
                  ))}

                {!isLoading && !error && notifications.length === 0 && (
                  <li className="p-4 text-gray-500 text-sm text-center">
                    لا يوجد إشعارات
                  </li>
                )}
              </ul>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
