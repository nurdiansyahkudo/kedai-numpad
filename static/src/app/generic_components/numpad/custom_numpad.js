/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";

// override enhancedButtons
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
