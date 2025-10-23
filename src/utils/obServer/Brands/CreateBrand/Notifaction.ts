import prisma from "@/src/utils/db";
import Brand from "../EventEmitter ";

Brand.on("BrandCreated", async (payload) => {
  const { name, note, addedById } = payload;

  try {
    const user = await prisma.user.findUnique({
      where: { id: addedById },
      select: { name: true },
    });

    const dateStr = new Date().toLocaleDateString("ar-EG");
    const timeStr = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    await prisma.notification.create({
      data: {
        message: `تم إنشاء ماركة جديدة في إعداد الأصناف
الاسم: ${name}

ملاحظات: ${note || "لا توجد ملاحظات"}
بواسطة: ${user?.name || "غير معروف"} - ${timeStr} ${dateStr}`,
        userId: addedById || null,
        redirectUrl: `/dashboard/brands`,
      },
    });
  } catch (error) {
    console.error("Error in BrandCreated observer:", error);
  }
});
