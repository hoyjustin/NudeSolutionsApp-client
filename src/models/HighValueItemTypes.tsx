export type HighValueItemResponse = {
    id: string;
    name: string,
    value: number,
};

export type CategoryGroupResponse = {
    categoryId: string,
    name: string,
    totalValue: number,
    items: HighValueItemResponse[]
};

export type HighValueItemRequest = {
    name: string,
    value: number,
    category: ItemCategory
};

export enum ItemCategory {
    None = "None",
    Electronics = "Electronics",
    Clothing = "Clothing",
    Kitchen = "Kitchen"
};