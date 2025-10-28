import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useEditModel } from "@/src/Hooks/ReactQuery/Models/useEditModel";
import { useGetModelById } from "@/src/Hooks/ReactQuery/Models/useGetModelById";
import useGetuserId from "@/src/Hooks/Token/useGetUserId";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface EditModelProps {
  open: boolean;
  setopen: (open: boolean) => void;
  ModelId: number;
}

export function EditModel({
  open,
  setopen,

  ModelId,
}: EditModelProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [cc, setCC] = useState("");
  const { mutate } = useEditModel();
  const { data } = useGetModelById(ModelId);
  const { userId } = useGetuserId();
  useEffect(() => {
    setName(data?.data?.modelName);
    setCC(data?.data?.engineCC);
  }, [data]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        id: ModelId,
        modelName: name,
        engineCC: Number(cc),
        userId: Number(userId),
      },
      {
        onSuccess: () => toast.success(`${t("model updated successfully")}`),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
    setopen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="w-[50%] rounded-2xl border-0 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-semibold">
              {t("edit model")}
            </DialogTitle>
            <DialogDescription className="text-base opacity-70">
              {t("Edit the name or CC here. Click Save when finished")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-3">
              <Label htmlFor="name-1" className="text-sm font-medium">
                {t("name")}
              </Label>
              <Input
                id="name-1"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("Enter The Name")}
                className="h-11 rounded-xl border-2 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cc-1" className="text-sm font-medium">
                {t("cc")}
              </Label>
              <Input
                id="cc-1"
                name="cc"
                type="number"
                value={cc}
                onChange={(e) => setCC(e.target.value)}
                placeholder="Enter The CC"
                className="h-11 rounded-xl border-2 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 "
              />
            </div>
          </div>
          <DialogFooter className="gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-2 px-6 font-medium transition-all duration-200 hover:bg-gray-50"
              >
                {t("cancel")}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="h-11 rounded-xl px-6 font-medium shadow-md transition-all duration-200 hover:shadow-lg"
              onClick={(e) => handleSubmit(e)}
            >
              {t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
