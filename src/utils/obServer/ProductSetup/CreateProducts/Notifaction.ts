import prisma from "@/src/utils/db";
import ProductSetup from "../EventEmitter ";

ProductSetup.on("ProductCreated", async (payload) => {
  const {
    productCode,
    name,
    price_scoda,
    price_odie,
    price_flox,
    price_syeat,
    Status,
    userId,
  } = payload;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    const dateStr = new Date().toLocaleDateString("ar-EG");
    const timeStr = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    await prisma.notification.create({
      data: {
        message: `تم إنشاء منتج جديد في إعداد الأصناف
المنتج: ${name} (${productCode})
الأسعار:
- سكودا: ${price_scoda ?? 0} جنيه
- أودي: ${price_odie ?? 0} جنيه
- فولكس: ${price_flox ?? 0} جنيه
- سيات: ${price_syeat ?? 0} جنيه
الحالة: ${Status ? "مفعل" : "غير مفعل"}
بواسطة: ${user?.name || "غير معروف"} - ${timeStr} ${dateStr}`,
        userId: userId || null,
      },
    });
  } catch (error) {
    console.error("Error in ProductCreated observer:", error);
  }
});
