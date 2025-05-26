/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";

// 1. Override tombol
patch(NumpadComp, {
    enhancedButtons() {
        const customRightColumn = [
            { value: "10000", text: "10.000" },
            { value: "20000", text: "20.000" },
            { value: "50000", text: "50.000" },
            NumpadComp.BACKSPACE,
        ];
        return NumpadComp.getButtons(NumpadComp.DEFAULT_LAST_ROW, customRightColumn);
    },
});

// 2. Override perilaku klik tombol
patch(NumpadComp.Numpad.prototype, {
    setup() {
        super.setup?.();

        const isNominalButton = (val) => ["10000", "20000", "50000"].includes(val);

        if (!this.props.onClick) {
            this.numberBuffer = this.env.services.number_buffer;
            this.pos = this.env.services.pos;

            this.onClick = (buttonValue) => {
                console.log("Clicked:", buttonValue);

                if (isNominalButton(buttonValue)) {
                    const paymentLine = this.pos.get_order().get_selected_paymentline();
                    if (paymentLine) {
                        paymentLine.set_amount(parseFloat(buttonValue));
                        this.numberBuffer.set(buttonValue);
                    }
                } else {
                    this.numberBuffer.sendKey(buttonValue);
                }
            };
        }
    },
});
