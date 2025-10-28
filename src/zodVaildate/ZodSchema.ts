import * as z from "zod";

export const ModelsSchema = z.object({
  carId: z.preprocess(
    (val) => Number(val),
    z.number().refine((val) => !isNaN(val), {
      message: "يجب اختيار السيارة",
    })
  ),
  engineCC: z.preprocess(
    (val) => Number(val),
    z.number().refine((val) => !isNaN(val), {
      message: "يجب اختيار سعة المحرك",
    })
  ),
  modelName: z.string().nonempty("يجب ادخال اسم الموديل"),
  userId: z.preprocess(
    (val) => Number(val),
    z.number().refine((val) => !isNaN(val), {
      message: "يجب اختيار المستخدم",
    })
  ),
});
