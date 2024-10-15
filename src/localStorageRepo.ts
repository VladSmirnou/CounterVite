export interface Repo {
    getItem(key: string): string | null;
    setItem<T>(key: string, value: T): void;
}

export class LocalStorageRepo implements Repo {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
