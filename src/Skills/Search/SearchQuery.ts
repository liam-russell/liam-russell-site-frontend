import { Skill, SkillCategory } from "../../api";

export interface SearchQuery {
    loading: boolean;
    skills: Skill[];
    selectedCategories: string[];
    searchQuery: string;
    allCategories: SkillCategory[];
}