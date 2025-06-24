/** @odoo-module **/

import { registry } from "@web/core/registry";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useState, onWillUpdateProps } from "@odoo/owl";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";

export class CustomPaymentScreen extends PaymentScreen {
    setup() {
        super.setup();
        this.pos = usePos();
        this.state = useState({ numpadVisible: true });

        onWillUpdateProps(() => {
            this.updateNumpadVisible();
        });
    }

    updateNumpadVisible() {
        const line = this.selectedPaymentLine;
        if (!line || !line.payment_method) {
            this.state.numpadVisible = true;
            return;
        }
        this.state.numpadVisible = (line.payment_method.name !== "QRIS");
    }

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
    }
}

registry.category("pos_screens").add("PaymentScreen", CustomPaymentScreen);
