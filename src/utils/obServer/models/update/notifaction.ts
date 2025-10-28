import prisma from "@/src/utils/db";
import Models from "../EventEmitter ";

Models.on("ModelUpdated", async (payload) => {
  try {
    const { modelName, engineCC, userId } = payload;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { name: true },
    });

    const dateStr = new Date().toLocaleDateString("ar-EG");
    const timeStr = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    await prisma.notification.create({
      data: {
        message: `🔧 تم تحديث بيانات الموديل "${modelName}
المحرك: ${engineCC} CC
بواسطة: ${user?.name || "غير معروف"} - ${timeStr} ${dateStr}`,
        userId: Number(userId) || null,
        redirectUrl: `/dashboard/models`,
      },
    });
  } catch (error) {
    console.error("حدث خطأ أثناء إنشاء إشعار التحديث:", error);
  }
});
