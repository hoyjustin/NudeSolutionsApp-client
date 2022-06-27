import { HighValueItemRequest } from "../models/HighValueItemTypes";

export async function getAllHighValueItemsPerCategory() {
    const response = await fetch('/api/HighValueItem/GetHighValueItemsPerCategory');

    if (!response.ok) {
        throw Error(response.statusText);
    }
    return await response.json();
}

export async function createHighValueItem(data: HighValueItemRequest) {
    const response = await fetch(`/api/HighValueItem/CreateHighValueItem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw Error(response.statusText);
    }
    return await response.json();
}

export async function deleteHighValueItem(itemId: string) {
    const response = await fetch(`api/HighValueItem/DeleteHighValueItem/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
        throw Error(response.statusText);
    }
    return await response.json();
}