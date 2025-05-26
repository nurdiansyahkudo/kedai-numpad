/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { enhancedButtons } from "@point_of_sale/app/generic_components/numpad/numpad";

patch(PaymentScreen.prototype, {
    getNumpadButtons() {
        const colorClassMap = {
            "10000": "o_colorlist_item_color_transparent_10",
            "20000": "o_colorlist_item_color_transparent_10",
            "50000": "o_colorlist_item_color_transparent_10",
            "Backspace": "o_colorlist_item_color_transparent_1",
            ".": "o_colorlist_item_color_transparent_6", // localization.decimalPoint
            "-": "o_colorlist_item_color_transparent_3",
        };

        return enhancedButtons().map((button) => ({
            ...button,
            class: colorClassMap[button.value] || "",
        }));
    },
});
