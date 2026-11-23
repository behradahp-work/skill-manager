export const LOCAL_STORAGE_KEYS = {
  WORKSPACE: "skill-manager:workspace",
} as const;

export type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];
