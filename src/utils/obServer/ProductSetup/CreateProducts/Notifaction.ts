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
    cateId,
    userId,
  } = payload;

  try {
    const product = await prisma.product.create({
      data: {
        productCode,
        name,
        price_scoda,
        price_odie,
        price_flox,
        price_syeat,
        Status,
        cateId,
      },
    });

    const category = await prisma.cars_brand.findUnique({
      where: { id: cateId },
      select: { cate_name: true },
    });

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
التصنيف: ${category?.cate_name || "غير محدد"}
بواسطة: ${user?.name || "غير معروف"} - ${timeStr} ${dateStr}`,
        userId: userId || null,
        redirectUrl: `/dashboard/products/${product.id}`,
      },
    });
  } catch (error) {
    console.error("Error in ProductCreated observer:", error);
  }
});
