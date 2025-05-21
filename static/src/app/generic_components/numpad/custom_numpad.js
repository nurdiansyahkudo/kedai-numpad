/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { enhancedButtons } from "@point_of_sale/app/generic_components/numpad/numpad";

patch(enhancedButtons, {
    // Patch the function to override the default buttons
    setup() {},
    __call__: function () {
        return [
            { value: "1" },
            { value: "2" },
            { value: "3" },
            { value: "4" },
            { value: "5" },
            { value: "6" },
            { value: "7" },
            { value: "8" },
            { value: "9" },
            { value: "0" },
            { value: this.env.services.localization.decimalPoint },
            { value: "Backspace", icon: "Delete" },
            { value: "+10000" },
            { value: "+20000" },
            { value: "+50000" },
        ];
    },
});
