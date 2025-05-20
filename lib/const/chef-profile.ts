export const SKILLS = [
  { id: "fish-cutting", label: "魚が捌ける" },
  { id: "japanese-cuisine", label: "和食" },
  { id: "western-cuisine", label: "洋食" },
  { id: "chinese-cuisine", label: "中華" },
  { id: "italian-cuisine", label: "イタリアン" },
  { id: "french-cuisine", label: "フレンチ" },
  { id: "dessert", label: "デザート" },
  { id: "bread", label: "パン" },
] as const;
export type Skill = typeof SKILLS[number];

export const CERTIFICATIONS = [
  { id: "cooking-license", label: "調理師免許" },
  { id: "fugu-license", label: "ふぐ調理師免許" },
  { id: "other", label: "その他" },
] as const;
export type Certificate = typeof CERTIFICATIONS[number];

export const EXPERIENCE_LEVELS = [
  { id: "exp-inexperienced", label: "未経験", value: "inexperienced" },
  { id: "exp-0-1", label: "1年未満", value: "0-1" },
  { id: "exp-1-3", label: "1-3年", value: "1-3" },
  { id: "exp-3-5", label: "3-5年", value: "3-5" },
  { id: "exp-5-10", label: "5-10年", value: "5-10" },
  { id: "exp-10", label: "10年以上", value: "10+" },
] as const;
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
