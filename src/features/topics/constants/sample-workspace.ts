//---------- Types ----------
import type { SkillRating, Topic } from "../types/workspace";

const examples: { name: string; skills: [string, SkillRating][] }[] = [
  { name: "Frontend Development", skills: [["React", 5], ["TypeScript", 4], ["CSS Grid", 4], ["Accessibility", 3], ["Testing", 2]] },
  { name: "Photography", skills: [["Composition", 4], ["Natural lighting", 3], ["Portraits", 2], ["Photo editing", 4]] },
  { name: "Cooking", skills: [["Knife skills", 5], ["Bread baking", 2], ["Sauces", 3], ["Meal planning", 4], ["Pastry", 1], ["Grilling", 3]] },
  { name: "Spanish", skills: [["Reading", 4], ["Conversation", 2], ["Listening", 3]] },
  { name: "Music", skills: [["Piano", 3], ["Sight-reading", 2], ["Rhythm", 4], ["Improvisation", 1]] },
  { name: "Gardening", skills: [] },
];

export const SAMPLE_TOPICS: Topic[] = examples.map(({ name, skills }, index) => ({
  id: `sample-topic-${index + 1}`,
  name,
  skills: skills.map(([skill, rating], skillIndex) => ({
    id: `sample-skill-${index + 1}-${skillIndex + 1}`,
    name: skill,
    rating,
  })),
}));
