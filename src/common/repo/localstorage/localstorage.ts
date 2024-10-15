import { Repo } from '@/app/interfaces/repo';

export class LocalStorageRepo implements Repo {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
