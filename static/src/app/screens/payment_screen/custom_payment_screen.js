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

    // Override handleNumpadButtonClick supaya tombol custom bisa langsung tambah amount payment line
    handleNumpadButtonClick(button) {
        const selectedPaymentLine = this.currentOrder.get_selected_paymentline();
        if (!selectedPaymentLine) {
            return;
        }

        const value = button.value;

        if (value === "+10000" || value === "+20000" || value === "+50000") {
            // Ambil current amount, tambahkan nominal tombol
            const currentAmount = selectedPaymentLine.amount || 0;
            const increment = parseInt(value.replace("+", ""), 10);
            const newAmount = currentAmount + increment;
            selectedPaymentLine.set_amount(newAmount);
            // Reset buffer supaya value langsung berubah
            this.numberBuffer.reset();
            this.numberBuffer.set(newAmount.toString());
        } else {
            // Panggil original method utk tombol lain (backspace, -, dll)
            this._super(button);
        }
    },
});
