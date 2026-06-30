export const roundValue = (value?: number | null) => {
    if (value === undefined || value === null || isNaN(value)) return 0;
    return Math.round(value * 10) / 10;
};
