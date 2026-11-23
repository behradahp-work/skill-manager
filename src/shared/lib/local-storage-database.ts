//---------- Types ----------
import type { LocalStorageKey } from "@/shared/constants/local-storage-keys";

type StorageAdapter = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export class LocalStorageDatabase {
  private readonly storageOverride?: StorageAdapter;

  constructor(storage?: StorageAdapter) {
    this.storageOverride = storage;
  }

  private get storage(): StorageAdapter {
    return this.storageOverride ?? window.localStorage;
  }

  /** Returns undefined for an absent key. Invalid JSON and storage errors propagate. */
  read(key: LocalStorageKey): unknown {
    const stored = this.storage.getItem(key);
    return stored === null ? undefined : JSON.parse(stored);
  }

  write(key: LocalStorageKey, value: unknown): void {
    const stored = JSON.stringify(value);
    if (stored === undefined) {
      throw new TypeError("The database value must be JSON-serializable.");
    }

    this.storage.setItem(key, stored);
  }

  remove(key: LocalStorageKey): void {
    this.storage.removeItem(key);
  }
}

export const database = new LocalStorageDatabase();
