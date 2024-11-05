class LocalStorageRepo {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
export const getLocalStorageRepo = () => {
    return new LocalStorageRepo();
};
