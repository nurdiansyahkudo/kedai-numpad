import { patch } from "@web/core/utils/patch";
// import { Numpad } from "@point_of_sale/static/src/app/generic_components/numpad/numpad";
import { BACKSPACE, ZERO, DECIMAL, getButtons } from "@point_of_sale/static/src/app/generic_components/numpad/numpad";

// Custom override tombol kanan numpad
// Patch fungsi getButtons agar tombol kanan jadi +10000, +20000, +50000, backspace
patch(getButtons, {
    // override fungsi getButtons secara global
    [Symbol.for("patch")]: true,

    call(lastRow = [DECIMAL, ZERO, BACKSPACE], rightColumn = []) {
        return [
            { value: "1" },
            { value: "2" },
            { value: "3" },
            { value: "+10000" },
            { value: "4" },
            { value: "5" },
            { value: "6" },
            { value: "+20000" },
            { value: "7" },
            { value: "8" },
            { value: "9" },
            { value: "+50000" },
            ...lastRow,
            BACKSPACE,
        ];
    },
});