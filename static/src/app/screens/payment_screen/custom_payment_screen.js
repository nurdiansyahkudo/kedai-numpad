/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";
import { useService } from "@web/core/utils/hooks";

// --- 1. Patch tombol khusus PaymentScreen ---
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

// --- 2. Patch logika klik tombol khusus hanya untuk PaymentScreen ---
patch(NumpadComp.Numpad.prototype, {
    setup() {
        super.setup?.();
        this.numberBuffer = useService("number_buffer");
        const pos = useService("pos");

        const isNominalButton = (val) => ["10000", "20000", "50000"].includes(val);

        this.onClick = (buttonValue) => {
            const screenComponent = this.__owl__.parent.component;

            // Hanya aktif jika di PaymentScreen
            if (screenComponent instanceof PaymentScreen && isNominalButton(buttonValue)) {
                const order = pos.get_order?.();
                const paymentLine = order?.get_selected_paymentline?.();
                if (paymentLine) {
                    const currentAmount = paymentLine.amount || 0;
                    const increment = parseFloat(buttonValue);
                    const newAmount = currentAmount + increment;
                    paymentLine.set_amount(newAmount);
                    this.numberBuffer.set(newAmount.toString());

                    if (typeof screenComponent.updateSelectedPaymentline === "function") {
                        screenComponent.updateSelectedPaymentline(newAmount);
                    }
                }
            } else {
                this.numberBuffer.sendKey(buttonValue);
            }
        };
    },
});
