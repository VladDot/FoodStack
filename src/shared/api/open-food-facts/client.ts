import axios from "axios";

export const offClient = axios.create({
    baseURL: "https://world.openfoodfacts.org",
    headers: {
        "User-Agent": "FoodStack - WebApp - Version 1.0",
    },
});
