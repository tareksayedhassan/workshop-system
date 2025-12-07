import prisma from "@/src/utils/db";
import Models from "../EventEmitter ";

Models.on("ModelsRun", async (payload) => {
  try {
    const { modelName, engineCC, carId, userId } = payload;

    // جلب بيانات المستخدم
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { name: true },
    });

    // جلب اسم السيارة المرتبطة بالموديل
    const car = await prisma.cars_brand.findUnique({
      where: { id: Number(carId) },
      select: { cate_name: true },
    });

    // التاريخ والوقت
    const dateStr = new Date().toLocaleDateString("ar-EG");
    const timeStr = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // إنشاء النوتيفيكيشن
    await prisma.notification.create({
      data: {
        message: `تم إضافة موديل جديد "${modelName}" للسيارة "${
          car?.cate_name || "غير معروفة"
        }"
المحرك: ${engineCC} CC
بواسطة: ${user?.name || "غير معروف"} - ${timeStr} ${dateStr}`,
        userId: Number(userId) || null,
        redirectUrl: `/dashboard/models`,
      },
    });
  } catch (error) {
    console.error("حدث خطأ أثناء إنشاء الإشعار:", error);
  }
});
