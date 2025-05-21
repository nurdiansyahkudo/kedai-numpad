/** @odoo-module **/

import { getButtons, BACKSPACE } from "@point_of_sale/static/src/app/generic_components/numpad/numpad";

// Fungsi override
export function customEnhancedButtons() {
    return getButtons([
        { value: "-", text: "+/-" },
        { value: "0" },
        { value: "." }, // Jika localization tidak dipakai
    ], [
        { value: "+10000" },
        { value: "+20000" },
        { value: "+50000" },
        BACKSPACE,
    ]);
}