export interface OFFNutriments {
    fat_100g?: number;
    proteins_100g?: number;
    "energy-kcal_100g"?: number;
    carbohydrates_100g?: number;
}
export interface OFFProduct {
    code: string;
    brands?: string;
    product_name?: string;
    image_front_url?: string;
    nutriments?: OFFNutriments;
}
export interface OFFSearchResponse {
    products: OFFProduct[];
}
export interface OFFBarcodeResponse {
    status: number;
    product?: OFFProduct;
}
