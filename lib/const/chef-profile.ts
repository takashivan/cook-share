export const SKILLS = [
  { id: "knife-technique", label: "包丁技術" },
  { id: "heat-control", label: "火加減調整" },
  { id: "deep-frying", label: "揚げ物技術" },
  { id: "stir-frying", label: "炒め物技術" },
  { id: "steaming", label: "蒸し料理" },
  { id: "simmering", label: "煮込み料理" },
  { id: "grilling", label: "グリル・焼き技術" },
  { id: "fish-cutting", label: "魚の捌き方" },
  { id: "meat-processing", label: "肉の処理技術" },
  { id: "pasta-cooking", label: "パスタ調理" },
  { id: "pizza-cooking", label: "ピザ調理" },
  { id: "sushi-technique", label: "寿司技術" },
  { id: "bread", label: "パン製造" },
  { id: "dessert", label: "デザート製作" },
] as const;
export type Skill = typeof SKILLS[number];

export const CERTIFICATIONS = [
  { id: "cooking-license", label: "調理師免許" },
  { id: "food-safety-manager", label: "食品衛生責任者" },
  { id: "food-hygiene-controller", label: "食品衛生管理者" },
  { id: "haccp-manager", label: "HACCP管理者" },
  { id: "nutritionist", label: "栄養士・管理栄養士" },
  { id: "fugu-license", label: "ふぐ調理師免許" },
  { id: "other", label: "その他" },
] as const;
export type Certificate = typeof CERTIFICATIONS[number];

export const EXPERIENCE_LEVELS = [
  { id: "exp-0-1", label: "1年未満", value: "0-1" },
  { id: "exp-1-3", label: "1-3年", value: "1-3" },
  { id: "exp-3-5", label: "3-5年", value: "3-5" },
  { id: "exp-5-10", label: "5-10年", value: "5-10" },
  { id: "exp-10", label: "10年以上", value: "10+" },
] as const;
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];

export const POSITION_LEVEL = [
  { id: "pos-1", label: "レベル1：見習い・アシスタント（コミ・見習い）", value: "1" },
  { id: "pos-2", label: "レベル2：一般調理師", value: "2" },
  { id: "pos-3", label: "レベル3：部門責任者（シェフドパルティ・部門責任者）", value: "3" },
  { id: "pos-4", label: "レベル4：幹部（シェフ・料理長/スーシェフ・副料理長）", value: "4" },
] as const;
export type PositionLevel = typeof POSITION_LEVEL[number];
