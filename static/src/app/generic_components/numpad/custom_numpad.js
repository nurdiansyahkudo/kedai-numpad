/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";

// Override logika klik tombol
patch(NumpadComp.Numpad.prototype, {
    setup() {
        super.setup?.();
        const isNominalButton = (val) => ["10000", "20000", "50000"].includes(val);
        this.numberBuffer = useService("number_buffer");
        const pos = useService("pos");
        const paymentScreen = this.__owl__.parent.component;

        // Simpan fungsi asli jika ada
        const originalOnClick = this.onClick?.bind(this);

        this.onClick = (buttonValue) => {
            console.log("Clicked:", buttonValue);

            if (paymentScreen && isNominalButton(buttonValue)) {
                const order = pos.get_order?.();
                const paymentLine = order?.get_selected_paymentline?.();

                if (paymentLine) {
                    const currentAmount = paymentLine.amount || 0;
                    const increment = parseFloat(buttonValue);
                    const newAmount = currentAmount + increment;

                    paymentLine.set_amount(newAmount);
                    this.numberBuffer.set(newAmount.toString());

                    if (typeof paymentScreen.updateSelectedPaymentline === "function") {
                        paymentScreen.updateSelectedPaymentline(newAmount);
                    }
                }
            } else {
                // Jalankan fungsi default onClick milik Odoo
                originalOnClick?.(buttonValue);
            }
        };
    },
});
