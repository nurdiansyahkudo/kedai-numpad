import { BACKSPACE, ZERO, DECIMAL, getButtons } from "@point_of_sale/static/src/app/generic_components/numpad/numpad";

export function enhancedButtons() {
    // Mengganti 10, 20, 50 menjadi 10000, 20000, 50000
    return getButtons([DECIMAL, ZERO, BACKSPACE], [
        { value: "+10000" },
        { value: "+20000" },
        { value: "+50000" },
        BACKSPACE,
    ]);
}