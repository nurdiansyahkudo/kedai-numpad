/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { BACKSPACE, getButtons, DEFAULT_LAST_ROW } from "@point_of_sale/app/generic_components/numpad/numpad";
import { useService } from "@web/core/utils/hooks";
import { Numpad } from "@point_of_sale/app/generic_components/numpad/numpad";

// ✅ Patch tombol numpad hanya untuk PaymentScreen
patch(PaymentScreen.prototype, {
    getNumpadButtons() {
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
            BACKSPACE,
        ];

        return getButtons(DEFAULT_LAST_ROW, customRightColumn).map((button) => ({
            ...button,
            class: `${colorClassMap[button.value] || ""}`,
        }));
    },
});

// ✅ Patch logika klik tombol, hanya di PaymentScreen
patch(Numpad.prototype, {
    setup() {
        super.setup?.();
        const isNominalButton = (val) => ["10000", "20000", "50000"].includes(val);
        this.numberBuffer = useService("number_buffer");
        const pos = useService("pos");

        // Deteksi screen
        const parentComponent = this.__owl__?.parent?.component;
        const isPaymentScreen = parentComponent instanceof PaymentScreen;

        this.onClick = (buttonValue) => {
            console.log("Clicked:", buttonValue);

            if (isPaymentScreen && isNominalButton(buttonValue)) {
                const order = pos.get_order?.();
                const paymentLine = order?.get_selected_paymentline?.();

                if (paymentLine) {
                    const currentAmount = paymentLine.amount || 0;
                    const increment = parseFloat(buttonValue);
                    const newAmount = currentAmount + increment;

                    paymentLine.set_amount(newAmount);
                    this.numberBuffer.set(newAmount.toString());

                    if (typeof parentComponent.updateSelectedPaymentline === "function") {
                        parentComponent.updateSelectedPaymentline(newAmount);
                    }
                }
            } else {
                this.numberBuffer.sendKey(buttonValue);
            }
        };
    },
});
