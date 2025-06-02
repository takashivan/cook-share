'use client';

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useGetRestaurantCuisines } from "@/hooks/api/all/restaurantCuisines/useGetRestaurantCuisines";
import { MultiSelect, MultiSelectButton, MultiSelectOption, MultiSelectOptions } from "../ui/multi-select";
import { Fragment } from "react";

export type SearchId = 'all' | number;

interface SearchFieldsProps {
  selectedAreaId?: SearchId;
  selectedCuisineIds?: SearchId[];
  keyword?: string;
  onAreaChangeAction: (area: SearchId) => void;
  onCuisineChangeAction: (cuisines: SearchId[]) => void;
  onKeywordChangeAction: (keyword: string) => void;
  onSearchAction: () => void;
}

export function SearchFields({
  selectedAreaId,
  selectedCuisineIds,
  keyword,
  onAreaChangeAction,
  onCuisineChangeAction,
  onKeywordChangeAction,
  onSearchAction,
}: SearchFieldsProps) {
  const { data: cuisines } = useGetRestaurantCuisines();

  const areasForSearch: Array<{
    id: SearchId;
    name: string;
  }> = [
    { id: 'all', name: "すべてのエリア" },
    { id: 1, name: "関東" },
    { id: 2, name: "関西" },
  ];
  
  const cuisinesSelectItems: Array<{
    id: SearchId;
    category: string;
  }> = [{
    id: 'all',
    category: "すべてのジャンル",
  }, ...(cuisines?.sort((a, b) => {
    // is_primaryがtrueのものを先に並べる
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    // それ以外はidの昇順で並べる
    return a.id - b.id;
  }) ?? [])];

  const handleAreaChange = (value: string) => {
    const selectedArea = areasForSearch.find((area) => area.id.toString() === value);
    if (selectedArea) {
      onAreaChangeAction(selectedArea.id);
    }
  };

  const handleCuisineChange = (value: SearchId[]) => {
    // 「すべてのジャンル」だけを選択した場合
    const isReAllSelected = value.every(id => id === 'all');
    // 新たに「すべてのジャンル」を選択した場合
    const isNewAllSelected = value.includes('all') && !selectedCuisineIds?.includes('all');

    if (value.length === 0 || isReAllSelected || isNewAllSelected) {
      // 何も選択されていない場合
      // 「すべてのジャンル」を選択する
      onCuisineChangeAction(['all']);
      return;
    }

    onCuisineChangeAction(value.filter((cuisineId) => cuisineId !== 'all'));
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onKeywordChangeAction) {
      onKeywordChangeAction(value);
    }
  };

  const handleSearch = () => {
    onSearchAction();
  };

  return (
    <section className="bg-gray-50 py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col md:flex-row gap-2">
            <Select
              value={selectedAreaId?.toString()}
              onValueChange={handleAreaChange}
            >
              <SelectTrigger className="flex items-center border rounded-md bg-white px-3 py-2 flex-1">
                <SelectValue placeholder="エリアを選択" />
              </SelectTrigger>
              <SelectContent>
                {areasForSearch.map((area) => (
                  <SelectItem key={area.id} value={area.id.toString()}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <MultiSelect value={selectedCuisineIds} onChange={handleCuisineChange} multiple className="flex-1">
              <MultiSelectButton className="flex items-center border rounded-md bg-white px-3 py-2 flex-1">
                {cuisinesSelectItems?.filter((cuisine) => selectedCuisineIds?.includes(cuisine.id)).map((cuisine, i) => (
                  <Fragment key={cuisine.id}>
                    {`${i > 0 ? ', ' : ''}${cuisine.category}`}
                  </Fragment>
                ))}
              </MultiSelectButton>
              <MultiSelectOptions>
                {cuisinesSelectItems?.map((cuisine) => (
                  <MultiSelectOption key={cuisine.id} value={cuisine.id}>
                    {cuisine.category}
                  </MultiSelectOption>
                ))}
              </MultiSelectOptions>
            </MultiSelect>

            <div className="relative flex items-center border rounded-md bg-white px-3 py-2 flex-1">
              <Input
                type="text"
                placeholder="キーワードを入力"
                className="border-0 p-0 h-auto focus-visible:ring-0"
                value={keyword}
                onChange={handleKeywordChange}
              />
              <Search className="h-4 w-4 text-gray-400 ml-auto" />
            </div>
          </div>

          <Button className="bg-black text-white hover:bg-black/90" onClick={handleSearch}>
            検索
          </Button>
        </div>
      </div>
    </section>
  )
}
