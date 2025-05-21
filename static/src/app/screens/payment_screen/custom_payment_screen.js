/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { customEnhancedButtons } from "../../generic_components/numpad/custom_numpad";

patch(PaymentScreen.prototype, {
    getNumpadButtons() {
        const colorClassMap = {
            [this.env.services.localization.decimalPoint]: "o_colorlist_item_color_transparent_6",
            Backspace: "o_colorlist_item_color_transparent_1",
            "+10000": "o_colorlist_item_color_transparent_10",
            "+20000": "o_colorlist_item_color_transparent_10",
            "+50000": "o_colorlist_item_color_transparent_10",
            "-": "o_colorlist_item_color_transparent_3",
        };

        return customEnhancedButtons().map((button) => ({
            ...button,
            class: `${colorClassMap[button.value] || ""}`,
        }));
    },

    // Override / extend method click tombol numpad
    async _onNumpadButtonClick(buttonValue) {
        console.log("Clicked numpad button:", buttonValue);

        // Tangani tombol custom dulu
        if (buttonValue === "+10000" || buttonValue === "+20000" || buttonValue === "+50000") {
            // Contoh: tambahkan nominal ke amount due
            this.state.amount += parseInt(buttonValue.replace("+", ""));
            this.render();  // Render ulang tampilan pembayaran
            return;
        }
        if (buttonValue === "-") {
            // Toggle minus/plus misalnya
            this.state.amount = -this.state.amount;
            this.render();
            return;
        }

        // Kalau bukan tombol custom, panggil method asli agar tombol default tetap jalan
        return this._super(buttonValue);
    },
});
