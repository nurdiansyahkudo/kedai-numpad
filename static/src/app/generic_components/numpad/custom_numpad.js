/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { Numpad, getButtons, DEFAULT_LAST_ROW, BACKSPACE } from "@point_of_sale/app/generic_components/numpad/numpad";

patch(Numpad.prototype, {
    setup() {
        super.setup?.(); // if base has setup

        if (!this.props.onClick) {
            this.numberBuffer = this.env.services.number_buffer;
            this.onClick = (buttonValue) => {
                console.log("Clicked numpad button:", buttonValue);  // ✅ Log here
                this.numberBuffer.sendKey(buttonValue);
            };
        } else {
            this.onClick = this.props.onClick;
        }
    },
});

// patch enhancedButtons separately
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
