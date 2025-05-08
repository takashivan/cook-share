"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchSkills } from "@/lib/redux/slices/operatorSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Skill } from "@/lib/api/skill";

export default function SkillsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { skills, loading, error } = useSelector((state: RootState) => ({
    skills: state.operator.skills,
    loading: state.operator.loading.skills,
    error: state.operator.error.skills,
  }));

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">スキル一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill: Skill) => (
          <Card key={skill.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-lg font-semibold">{skill.skill}</h2>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
