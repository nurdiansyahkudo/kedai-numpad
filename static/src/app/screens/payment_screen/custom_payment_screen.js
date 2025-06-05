/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";

patch(PaymentScreen.prototype, {
    getNumpadButtons() {
        console.log("getNumpadButton called");
        
        const buttons = NumpadComp.getButtons(
            NumpadComp.DEFAULT_LAST_ROW,
            [
                { value: "10000", text: "10.000" },
                { value: "20000", text: "20.000" },
                { value: "50000", text: "50.000" },
                NumpadComp.BACKSPACE,
            ]
        );
        return buttons;
    },

    async onNumpadClick(button) {
        console.log("Clicked value:", button);
        
        const value = button?.value;
        const nominalValues = ["10000", "20000", "50000"];
        if (nominalValues.includes(value)) {
            const order = this.pos.get_order();
            const line = order.get_selected_paymentline();
            if (line) {
                const added = parseFloat(value);
                const newAmount = (line.amount || 0) + added;
                line.set_amount(newAmount);
                this.numberBuffer.set(newAmount.toString());
                this.updateSelectedPaymentline?.(newAmount);
            }
        } else {
            // fallback default behavior
            super.onNumpadClick?.(button);
        }
    }
});
