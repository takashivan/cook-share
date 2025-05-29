"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { operatorApi } from "@/lib/api/operator";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

type FormValues = z.infer<typeof formSchema>;

export default function StaffList() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: operators,
    isLoading,
    mutate,
  } = useSWR("/api/operator/operator", operatorApi.getOperators);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await operatorApi.createOperator(data);
      toast({
        title: "スタッフを追加しました",
        description: "新しいスタッフが追加されました",
      });
      setIsOpen(false);
      form.reset();
      mutate();
    } catch (error) {
      toast({
        title: "エラー",
        description: "スタッフの追加に失敗しました",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!operators) {
    return <div>No operators found</div>;
  }

  const staff = operators.map((operator) => ({
    id: operator.id,
    name: operator.name,
    email: operator.email,
    role: operator.role,
    status: operator.is_active ? "アクティブ" : "非アクティブ",
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            運営スタッフ管理
          </h2>
          <p className="text-muted-foreground">運営スタッフの一覧と管理</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                スタッフを追加
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>スタッフを追加</DialogTitle>
                <DialogDescription>
                  新しい運営スタッフを追加します。入力された情報は即時に反映されます。
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>名前</FormLabel>
                        <FormControl>
                          <Input placeholder="山田 太郎" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input placeholder="yamada@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>パスワード</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}>
                      キャンセル
                    </Button>
                    <Button type="submit">追加する</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="スタッフを検索..."
            className="w-full pl-8"
          />
        </div>
      </div>

      {/* Desktop View */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>役割</TableHead>
                <TableHead>最終ログイン</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32&text=${person.name.charAt(
                            0
                          )}`}
                          alt={person.name}
                        />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {person.name}
                    </div>
                  </TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {person.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        person.status === "アクティブ"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {person.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">メニューを開く</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link
                            href={`/operator/staff/${person.id}`}
                            className="w-full">
                            詳細を表示
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>編集</DropdownMenuItem>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}>
                              {person.status === "アクティブ"
                                ? "アカウントを停止"
                                : "アカウントを有効化"}
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {person.status === "アクティブ"
                                  ? "アカウント停止の確認"
                                  : "アカウント有効化の確認"}
                              </DialogTitle>
                              <DialogDescription>
                                {person.status === "アクティブ"
                                  ? `${person.name}のアカウントを停止しますか？停止中は管理画面にログインできなくなります。`
                                  : `${person.name}のアカウントを有効化しますか？`}
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">キャンセル</Button>
                              <Button
                                variant={
                                  person.status === "アクティブ"
                                    ? "destructive"
                                    : "default"
                                }>
                                {person.status === "アクティブ"
                                  ? "停止する"
                                  : "有効化する"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {staff.map((person) => (
          <Card key={person.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=${person.name.charAt(
                        0
                      )}`}
                      alt={person.name}
                    />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {person.email}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">メニューを開く</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link
                        href={`/operator/staff/${person.id}`}
                        className="w-full">
                        詳細を表示
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>編集</DropdownMenuItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          {person.status === "アクティブ"
                            ? "アカウントを停止"
                            : "アカウントを有効化"}
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {person.status === "アクティブ"
                              ? "アカウント停止の確認"
                              : "アカウント有効化の確認"}
                          </DialogTitle>
                          <DialogDescription>
                            {person.status === "アクティブ"
                              ? `${person.name}のアカウントを停止しますか？停止中は管理画面にログインできなくなります。`
                              : `${person.name}のアカウントを有効化しますか？`}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">キャンセル</Button>
                          <Button
                            variant={
                              person.status === "アクティブ"
                                ? "destructive"
                                : "default"
                            }>
                            {person.status === "アクティブ"
                              ? "停止する"
                              : "有効化する"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">役割</p>
                  <Badge variant="outline" className="font-normal mt-1">
                    {person.role}
                  </Badge>
                </div>
                <div></div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">ステータス</p>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      person.status === "アクティブ"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {person.status}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link href={`/operator/staff/${person.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    詳細を表示
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
