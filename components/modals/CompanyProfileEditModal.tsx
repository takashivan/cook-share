"use client";

import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useUpdateCompany } from "@/hooks/api/companyuser/companies/useUpdateCompany";
import {
  CompaniesPartialUpdatePayload,
  CompaniesDetailData,
} from "@/api/__generated__/base/data-contracts";

const formSchema = z.object({
  name: z.string().min(1, "会社名は必須です"),
  address: z.string().min(1, "住所は必須です"),
  phone: z.string().min(1, "電話番号は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  website: z
    .string()
    .url("有効なURLを入力してください")
    .optional()
    .or(z.literal("")),
  description: z.string().optional(),
  // logo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CompanyProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompaniesDetailData;
}

export function CompanyProfileEditModal({
  isOpen,
  onClose,
  company,
}: CompanyProfileEditModalProps) {
  // const [isUploading, setIsUploading] = useState(false);
  const { trigger, isMutating} = useUpdateCompany({
    companyId: company.id,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name,
      address: company.address,
      phone: company.phone,
      email: company.company_email,
      website: company.website || "",
      description: company.description || "",
      // logo: company.logo_url || "",
    },
  });

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   try {
  //     setIsUploading(true);
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("画像のアップロードに失敗しました");
  //     }

  //     const data = await response.json();
  //     form.setValue("logo", data.url);
  //     toast({
  //       title: "画像をアップロードしました",
  //       description: "ロゴ画像が更新されました",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "エラー",
  //       description: "画像のアップロードに失敗しました",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: CompaniesPartialUpdatePayload = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        website: data.website || "",
        description: data.description || "",
        company_email: data.email,
      };

      await trigger(payload);
      toast({
        title: "更新完了",
        description: "会社情報が更新されました",
      });
      onClose();
    } catch (error) {
      toast({
        title: "エラー",
        description: "会社情報の更新に失敗しました",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            会社情報の編集
          </DialogTitle>
          <DialogDescription>
            会社の基本情報を編集できます。変更は即時に反映されます。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                  {form.watch("logo") ? (
                    <>
                      <Image
                        src={form.watch("logo") || ""}
                        alt="Company logo"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => form.setValue("logo", "")}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Building className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({
                      field,
                    }: {
                      field: ControllerRenderProps<FormValues, "logo">;
                    }) => (
                      <FormItem>
                        <FormLabel>ロゴ画像</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={isUploading}
                              className="hidden"
                              id="logo-upload"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById("logo-upload")?.click()
                              }
                              disabled={isUploading}>
                              <Upload className="h-4 w-4 mr-2" />
                              {isUploading
                                ? "アップロード中..."
                                : "画像をアップロード"}
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          JPG, PNG形式の画像をアップロードできます
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div> */}

              <FormField
                control={form.control}
                name="name"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "name">;
                }) => (
                  <FormItem>
                    <FormLabel>会社名</FormLabel>
                    <FormControl>
                      <Input placeholder="株式会社〇〇" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "address">;
                }) => (
                  <FormItem>
                    <FormLabel>住所</FormLabel>
                    <FormControl>
                      <Input placeholder="東京都渋谷区..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<FormValues, "phone">;
                  }) => (
                    <FormItem>
                      <FormLabel>電話番号</FormLabel>
                      <FormControl>
                        <Input placeholder="03-1234-5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<FormValues, "email">;
                  }) => (
                    <FormItem>
                      <FormLabel>メールアドレス(請求書などの送付先)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="info@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="website"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "website">;
                }) => (
                  <FormItem>
                    <FormLabel>Webサイト</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      オプション: 会社のWebサイトのURLを入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormValues, "description">;
                }) => (
                  <FormItem>
                    <FormLabel>会社概要</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="会社の特徴や強みを入力してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      オプション: 会社の特徴や強みを入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                キャンセル
              </Button>
              <Button type="submit" disabled={isMutating}>
                {isMutating ? "更新中..." : "更新する"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
