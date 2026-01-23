"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
// حذفنا الـ createPortal لأنه يسبب صعوبة في التموضع الدقيق
import Link from "next/link";
import { useNoitifactions } from "@/src/Hooks/ReactQuery/users/useNoitifactions";
import useGetLang from "@/src/Hooks/useGetLang";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useNoitifactions();
  const { lang } = useGetLang();
  const notifications = data?.getNoitafactions || [];

  return (
    // الحاوية الأب يجب أن تكون relative لضبط مكان القائمة بناءً عليها
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition focus:outline-none"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {notifications.length > 0 && (
          <span
            className={`absolute -top-1 ${lang === "ar" ? "-left-1" : "-right-1"} bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full`}
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* القائمة المنسدلة - الآن absolute بالنسبة للزر */}
      {isOpen && (
        <>
          {/* خلفية شفافة لإغلاق القائمة عند الضغط في أي مكان */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className={`absolute mt-2 w-80 md:w-96 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden 
              ${lang === "ar" ? "left-0" : "right-0"}`}
            /* ملاحظة: في الـ absolute، إذا أردت القائمة تفتح باتجاه الداخل:
               - لو الأيقونة على اليمين (عربي) نستخدم left-0 لتتمدد القائمة لليسار.
               - لو الأيقونة على اليسار (إنجليزي) نستخدم right-0 لتتمدد لليمين.
            */
          >
            <div className="p-4 font-semibold border-b border-gray-200 bg-gray-50 text-gray-800 text-start">
              {lang === "ar" ? "الإشعارات" : "Notifications"}
            </div>

            <ul className="max-h-80 overflow-auto divide-y divide-gray-100">
              {notifications.length > 0 ? (
                notifications.map((notif: any) => (
                  <Link
                    key={notif.id}
                    href={`/dashboard/${notif.redirectUrl}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <li className="p-4 hover:bg-gray-50 transition text-start">
                      <p className="text-gray-800 text-sm">{notif.message}</p>
                    </li>
                  </Link>
                ))
              ) : (
                <li className="p-10 text-gray-400 text-sm text-center">
                  {lang === "ar" ? "لا توجد إشعارات" : "No notifications"}
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
