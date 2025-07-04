/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";
import { useState } from "@odoo/owl";

patch(PaymentScreen.prototype, {
    setup() {
        super.setup();
        this.state = useState({ showNumpad: true });
    },

    async addNewPaymentLine(paymentMethod) {
        this.state.showNumpad = paymentMethod.name !== "QRIS";

        return await super.addNewPaymentLine(paymentMethod);
    },

    getNumpadButtons() {
        console.log("getNumpadButton called");
        
        const colorClassMap = {
            "10000": "o_colorlist_item_color_transparent_10",
            "20000": "o_colorlist_item_color_transparent_10",
            "50000": "o_colorlist_item_color_transparent_10",
            "Backspace": "o_colorlist_item_color_transparent_1",
            ".": "o_colorlist_item_color_transparent_6",
            "-": "o_colorlist_item_color_transparent_3",
        };

        const customRightColumn = [
            { value: "10000", text: "10.000" },
            { value: "20000", text: "20.000" },
            { value: "50000", text: "50.000" },
            NumpadComp.BACKSPACE,
        ];

        const buttons = NumpadComp.getButtons(NumpadComp.DEFAULT_LAST_ROW, customRightColumn);

        return buttons.map((button) => ({
            ...button,
            class: `${colorClassMap[button.value] || ""}`,
        }));
    },
});
