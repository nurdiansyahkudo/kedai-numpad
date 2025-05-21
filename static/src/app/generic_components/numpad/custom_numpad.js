/** @odoo-module **/

import { getButtons, BACKSPACE , DEFAULT_LAST_ROW} from "@point_of_sale/app/generic_components/numpad/numpad";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";

// Fungsi override
export function customEnhancedButtons() {
    return getButtons(DEFAULT_LAST_ROW, [
        { value: "+10000" },
        { value: "+20000" },
        { value: "+50000" },
        BACKSPACE,
    ]);
}