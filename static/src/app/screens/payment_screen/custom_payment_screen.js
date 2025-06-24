/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useService, useState, onWillUpdateProps } from "@web/core/utils/hooks";

// 1. Tambahkan tombol nominal di PaymentScreen
patch(PaymentScreen.prototype, {
    setup() {
        super.setup();

        this.state = useState({ numpadVisible: true });
        this.pos = usePos();

        onWillUpdateProps(() => {
            this.updateNumpadVisible();
        });
    },

    updateNumpadVisible() {
        const line = this.selectedPaymentLine;
        if (!line || !line.payment_method) {
            this.state.numpadVisible = true;
            return;
        }
        this.state.numpadVisible = (line.payment_method.name !== "QRIS");
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
