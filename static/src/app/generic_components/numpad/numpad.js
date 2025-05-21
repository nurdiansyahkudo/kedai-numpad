import { patch } from "@web/core/utils/patch";
import { Numpad } from "@point_of_sale/static/src/app/generic_components/numpad/numpad";
import { BACKSPACE, ZERO, DECIMAL, getButtons } from "@point_of_sale/static/src/app/generic_components/numpad/numpad";

// Custom override tombol kanan numpad
patch(Numpad.prototype, {
    get buttons() {
        // Tombol kanan: +10000, +20000, +50000, backspace
        return getButtons([DECIMAL, ZERO, BACKSPACE], [
            { value: "+10000" },
            { value: "+20000" },
            { value: "+50000" },
            BACKSPACE,
        ]);
    }
});
