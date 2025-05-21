/** @odoo-module **/

import { getButtons, BACKSPACE , Numpad} from "@point_of_sale/app/generic_components/numpad/numpad";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";

// Fungsi override
export function customEnhancedButtons() {
    return getButtons([
        { value: "-", text: "+/-" },
        { value: "0" },
        { value: "." }, // Jika localization tidak dipakai
    ], [
        { value: "+10000" },
        { value: "+20000" },
        { value: "+50000" },
        BACKSPACE,
    ]);
}

patch(Numpad.prototype, {
    setup() {
        // Pakai default props onClick atau service number_buffer
        if (!this.props.onClick) {
            this.numberBuffer = useService("number_buffer");
            this.onClick = (buttonValue) => {
                console.log("Numpad button clicked (default):", buttonValue);
                this.numberBuffer.sendKey(buttonValue);
            };
        } else {
            // Jika onClick props diberikan, pakai itu
            this.onClick = (buttonValue) => {
                console.log("Numpad button clicked (prop):", buttonValue);
                this.props.onClick(buttonValue);
            };
        }
    },
});