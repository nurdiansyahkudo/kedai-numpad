/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { customEnhancedButtons } from "./custom_numpad";

patch(PaymentScreen.prototype, {
    getNumpadButtons() {
        const colorClassMap = {
            ".": "o_colorlist_item_color_transparent_6",
            Backspace: "o_colorlist_item_color_transparent_1",
            "+10000": "o_colorlist_item_color_transparent_10",
            "+20000": "o_colorlist_item_color_transparent_10",
            "+50000": "o_colorlist_item_color_transparent_10",
            "-": "o_colorlist_item_color_transparent_3",
        };

        return customEnhancedButtons().map((button) => ({
            ...button,
            class: `${colorClassMap[button.value] || ""}`,
        }));
    },
});
