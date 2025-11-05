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
export const registerClient = z
  .object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
