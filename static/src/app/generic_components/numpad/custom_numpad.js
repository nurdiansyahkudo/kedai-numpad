/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { Numpad, getButtons, DEFAULT_LAST_ROW, BACKSPACE } from "@point_of_sale/app/generic_components/numpad/numpad";

patch(Numpad.prototype, {
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
                        this.numberBuffer.set(buttonValue); // update buffer UI
                    }
                } else {
                    this.numberBuffer.sendKey(buttonValue);
                }
            };
        }
    },
});

patch(Numpad, {
    enhancedButtons() {
        const customRightColumn = [
            { value: "10000", text: "10.000" },
            { value: "20000", text: "20.000" },
            { value: "50000", text: "50.000" },
            BACKSPACE,
        ];
        return getButtons(DEFAULT_LAST_ROW, customRightColumn);
    },
});
