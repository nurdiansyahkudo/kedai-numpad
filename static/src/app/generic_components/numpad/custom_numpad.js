/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
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

// Override logika klik tombol
patch(NumpadComp.Numpad.prototype, {
    setup() {
        super.setup?.();
        const isNominalButton = (val) => ["10000", "20000", "50000"].includes(val);
        this.numberBuffer = useService("number_buffer");
        const pos = useService("pos");
        const paymentScreen = this.__owl__.parent.component;

        this.onClick = (buttonValue) => {
            console.log("Clicked:", buttonValue);

            if (isNominalButton(buttonValue)) {
                const order = pos.get_order?.();
                const paymentLine = order?.get_selected_paymentline?.();

                if (paymentLine) {
                    const currentAmount = paymentLine.amount || 0;
                    const increment = parseFloat(buttonValue);
                    const newAmount = currentAmount + increment;

                    paymentLine.set_amount(newAmount);
                    this.numberBuffer.set(newAmount.toString());

                    if (typeof paymentScreen.updateSelectedPaymentline === "function") {
                        paymentScreen.updateSelectedPaymentline(newAmount);
                    }
                }
            } else {
                this.numberBuffer.sendKey(buttonValue);
            }
        };
    },
});
