export function setItem(key: string, data: any) {
    localStorage.setItem(key, toJsonString(data));
}

export function getItem(key: string): any | null {
    const item = localStorage.getItem(key);
    if (item) {
        try {
            return toJSON(item);
        } catch {
            localStorage.removeItem(key);
            return null;
        }
    }
}

export function removeItem(key: string) {
    return localStorage.removeItem(key);
}

export function toJsonString(data: object) {
    return JSON.stringify(data);
}

export function toJSON(data: string) {
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}

export function clearLocalStore() {
    return localStorage.clear();
}
