"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function DateSelector({
  selectedDate,
  onDateChangeAction,
}: {
  selectedDate: Date | null;
  onDateChangeAction: (date: Date | null) => void;
}) {
  // 日付の選択肢を生成する
  const initialDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toLocaleDateString("ja-JP", {
        month: "2-digit",
        day: "2-digit",
      }),
      day: date.toLocaleDateString("ja-JP", { weekday: "short" }),
      fullDate: date,
    };
  });

  const [dates, setDates] = useState(initialDates);

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  // ChevronLeft・ChevronLeftをクリックした際、7日前・後の日付を表示する
  const handleDateChange = (direction: "left" | "right") => {
    const newDates = dates.map((item) => {
      const newDate = new Date(item.fullDate);
      if (direction === "left") {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      return {
        ...item,
        date: newDate.toLocaleDateString("ja-JP", {
          month: "2-digit",
          day: "2-digit",
        }),
        day: newDate.toLocaleDateString("ja-JP", { weekday: "short" }),
        fullDate: newDate,
      };
    });
    setDates(newDates);
  };

  // 「今日」ボタンをクリックした際、今日の日付を表示する
  const handleToday = () => {
    const today = new Date();
    setDates(initialDates);
    onDateChangeAction(today);
  };

  return (
    <section className="bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="mb-2 font-medium">日付で絞り込む</div>
        <div className="flex items-center">
          <button
            className="p-2 mr-4"
            onClick={handleToday}
          >
            <div className="text-sm">今日</div>
          </button>
          <div className="flex items-center overflow-x-auto whitespace-nowrap">
            <button className="p-2" onClick={() => handleDateChange("left")}>
              <ChevronLeft size={20} />
            </button>

            {dates.map((item) => (
              <button
                key={item.date}
                className={`flex flex-col items-center mx-2 ${
                  selectedDate != null && isSameDate(selectedDate, item.fullDate)
                    ? "font-bold" : ""
                }`}
                onClick={() => 
                  // すでに選択されている日付の場合はnullをセット
                  onDateChangeAction(selectedDate != null && isSameDate(selectedDate, item.fullDate) ? null : item.fullDate)
                }>
                <div className="text-sm">{item.date}</div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mt-1 ${
                    selectedDate != null && isSameDate(selectedDate, item.fullDate)
                      ? "bg-black text-white"
                      : "text-black"
                  }`}>
                  {item.day}
                </div>
              </button>
            ))}

            <button className="p-2" onClick={() => handleDateChange("right")}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
