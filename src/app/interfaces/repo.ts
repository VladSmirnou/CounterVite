export interface Repo {
    getItem(key: string): string | null;
    setItem<T>(key: string, value: T): void;
}
