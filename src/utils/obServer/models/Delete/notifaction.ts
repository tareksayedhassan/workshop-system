import prisma from "@/src/utils/db";
import Models from "../EventEmitter ";

Models.on("ModelsDeleted", async (payload) => {
  try {
    const { userId, ModelId } = payload;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { name: true },
    });

    const fetchModel = await prisma.cars_Models.findUnique({
      where: { id: Number(ModelId) },
    });
    const modelName = fetchModel?.modelName || "اسم غير معروف";
    const engineCC = fetchModel?.engineCC || "غير معروف";

    const dateStr = new Date().toLocaleDateString("ar-EG");
    const timeStr = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    await prisma.notification.create({
      data: {
        message: `تم حذف الموديل "${modelName}" بمحرك ${engineCC} CC بواسطة: ${
          user?.name || "غير معروف"
        } - ${timeStr} ${dateStr}`,
        userId: Number(userId) || null,
        redirectUrl: `/dashboard/models`,
      },
    });
  } catch (error) {
    console.error("حدث خطأ أثناء إنشاء إشعار الحذف:", error);
  }
});
