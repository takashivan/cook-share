"use client";

import { useEffect, useState } from "react";
import {
  Search,
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
import { Card, CardContent } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { createOperator, deleteOperator, fetchOperators } from "@/lib/redux/slices/operatorSlice";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const formSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

type FormValues = z.infer<typeof formSchema>;

export default function StaffList() {
  const dispatch = useDispatch<AppDispatch>();

  const operators = useSelector((state: RootState) => state.operator.operators.data);
  const isLoading = useSelector((state: RootState) => state.operator.operators.loading);
  const error = useSelector((state: RootState) => state.operator.operators.error);

  const [isOpen, setIsOpen] = useState(false);

  // ソート状態管理
  const [sortKey, setSortKey] = useState<"name" | "email" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // 検索クエリ状態管理
  const [searchQuery, setSearchQuery] = useState("");

  // ソート関数
  const handleSort = (key: "name" | "email") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ソートアイコン
  const renderSortIcon = (key: "name" | "email") => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  // フィルタリングされたデータ
  const filteredOperators = operators.filter((operator) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      operator.name.toLowerCase().includes(query) ||
      operator.email.toLowerCase().includes(query)
    );
  });

  // ソート済みデータ
  const sortedOperators = [...filteredOperators].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  useEffect(() => {
    dispatch(fetchOperators());
  }, [dispatch]);

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
      await dispatch(createOperator(data)).unwrap();
      toast({
        title: "スタッフを追加しました",
        description: "新しいスタッフが追加されました",
      });
      setIsOpen(false);
      form.reset();
      dispatch(fetchOperators());
    } catch (error) {
      toast({
        title: "エラー",
        description: "スタッフの追加に失敗しました",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (operatorId: string) => {
    try {
      await dispatch(deleteOperator(operatorId)).unwrap();
      toast({
        title: "スタッフを削除しました",
        description: "スタッフが正常に削除されました",
      });
      dispatch(fetchOperators());
    } catch (error) {
      toast({
        title: "エラー",
        description: "スタッフの削除に失敗しました",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">エラーが発生しました: {error}</div>
      </div>
    );
  }

  if (!operators) {
    return <div>No operators found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">運営スタッフ一覧</h2>
          <p className="text-muted-foreground">運営スタッフの一覧と管理</p>
        </div>

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

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="名前・メールアドレスで検索..."
            className="w-full pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    style={{ minWidth: "10em", width: "10em" }}
                    onClick={() => handleSort("name")}
                    className="cursor-pointer"
                  >
                    名前 {renderSortIcon("name")}
                  </TableHead>
                  <TableHead
                    style={{ minWidth: "16em", width: "16em" }}
                    onClick={() => handleSort("email")}
                    className="cursor-pointer"
                  >
                    メールアドレス {renderSortIcon("email")}
                  </TableHead>
                  <TableHead style={{ minWidth: "5em", width: "5em" }}>
                    操作
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOperators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell>{operator.name}</TableCell>
                    <TableCell>{operator.email}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline">
                            削除
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>スタッフの削除</AlertDialogTitle>
                            <AlertDialogDescription>
                              本当にこのスタッフを削除しますか？
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              キャンセル
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(operator.id)}
                              className="bg-red-600 hover:bg-red-700">
                              削除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
