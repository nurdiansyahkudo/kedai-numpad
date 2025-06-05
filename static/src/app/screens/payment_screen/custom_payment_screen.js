/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { PaymentScreen } from "@point_of_sale/app/screens/payment/payment_screen";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";

patch(PaymentScreen.prototype, {
    setup() {
        super.setup();
        const numberBuffer = useService("number_buffer");
        const pos = useService("pos");

        const originalEnhancedButtons = NumpadComp.enhancedButtons;
        NumpadComp.enhancedButtons = function () {
            const customRightColumn = [
                { value: "10000", text: "10.000" },
                { value: "20000", text: "20.000" },
                { value: "50000", text: "50.000" },
                NumpadComp.BACKSPACE,
            ];

            const colorClassMap = {
                "10000": "o_colorlist_item_color_transparent_10",
                "20000": "o_colorlist_item_color_transparent_10",
                "50000": "o_colorlist_item_color_transparent_10",
                "Backspace": "o_colorlist_item_color_transparent_1",
                ".": "o_colorlist_item_color_transparent_6",
                "-": "o_colorlist_item_color_transparent_3",
            };

            const buttons = NumpadComp.getButtons(NumpadComp.DEFAULT_LAST_ROW, customRightColumn);

            return buttons.map((button) => ({
                ...button,
                class: `${colorClassMap[button.value] || ""}`,
            }));
        };

        const originalNumpadSetup = NumpadComp.Numpad.prototype.setup;
        NumpadComp.Numpad.prototype.setup = function () {
            originalNumpadSetup?.call(this);

            const isNominalButton = (val) => ["10000", "20000", "50000"].includes(val);
            const paymentScreen = this.__owl__.parent.component;

            this.onClick = (buttonValue) => {
                if (isNominalButton(buttonValue)) {
                    const order = pos.get_order?.();
                    const paymentLine = order?.get_selected_paymentline?.();

                    if (paymentLine) {
                        const currentAmount = paymentLine.amount || 0;
                        const increment = parseFloat(buttonValue);
                        const newAmount = currentAmount + increment;

                        paymentLine.set_amount(newAmount);
                        numberBuffer.set(newAmount.toString());

                        if (typeof paymentScreen.updateSelectedPaymentline === "function") {
                            paymentScreen.updateSelectedPaymentline(newAmount);
                        }
                    }
                } else {
                    numberBuffer.sendKey(buttonValue);
                }
            };
        };

        this.env.bus.on("will_unmount", null, () => {
            // Restore defaults if needed when leaving PaymentScreen
            NumpadComp.enhancedButtons = originalEnhancedButtons;
            NumpadComp.Numpad.prototype.setup = originalNumpadSetup;
        });
    },
});
