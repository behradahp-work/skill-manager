//---------- Constants ----------
import type { SKILL_RATINGS } from "../constants/workspace";

export type SkillRating = (typeof SKILL_RATINGS)[number];

export interface Skill {
  id: string;
  name: string;
  rating: SkillRating;
}

export interface Topic {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Workspace {
  version: 1;
  topics: Topic[];
}
