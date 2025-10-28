import MaintenanceTable from "../EventEmitter ";
import prisma from "@/src/utils/db";
MaintenanceTable.on("createMaintenanceTable", async (payload) => {
  try {
    const {name , modelId} = payload;

    await prisma.maintenanceTable.create({
        data:{
            name
            modelId,

        }
    });
  } catch (error) {}
});
