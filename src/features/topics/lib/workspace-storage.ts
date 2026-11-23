//---------- Constants ----------
import { LOCAL_STORAGE_KEYS } from "@/shared/constants/local-storage-keys";
import { SKILL_RATINGS } from "../constants/workspace";

//---------- Utilities ----------
import { database } from "@/shared/lib/local-storage-database";

//---------- Types ----------
import type { Skill, SkillRating, Topic, Workspace } from "../types/workspace";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isSkillRating(value: unknown): value is SkillRating {
  return SKILL_RATINGS.some((rating) => rating === value);
}

function isSkill(value: unknown): value is Skill {
  return isRecord(value) && typeof value.id === "string" &&
    typeof value.name === "string" && isSkillRating(value.rating);
}

function isTopic(value: unknown): value is Topic {
  return isRecord(value) && typeof value.id === "string" &&
    typeof value.name === "string" && Array.isArray(value.skills) &&
    value.skills.every(isSkill);
}

function isWorkspace(value: unknown): value is Workspace {
  return isRecord(value) && value.version === 1 &&
    Array.isArray(value.topics) && value.topics.every(isTopic);
}

export function readWorkspace(): Workspace {
  const stored = database.read(LOCAL_STORAGE_KEYS.WORKSPACE);
  if (stored === undefined) return { version: 1, topics: [] };
  if (!isWorkspace(stored)) throw new Error("Invalid workspace format.");
  return stored;
}

export function writeWorkspace(workspace: Workspace) {
  database.write(LOCAL_STORAGE_KEYS.WORKSPACE, workspace);
}
