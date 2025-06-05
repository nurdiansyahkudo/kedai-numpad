/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { Numpad } from "@point_of_sale/app/generic_components/numpad/numpad";
import * as NumpadComp from "@point_of_sale/app/generic_components/numpad/numpad";

// Step 1: Patch Numpad to support external onClick handler
patch(Numpad.prototype, {
    setup() {
        super.setup();
        this.originalOnClick = this.onClick;
        this.onClick = (buttonValue) => {
            if (this.props.onClick) {
                this.props.onClick(buttonValue);
            } else {
                this.originalOnClick(buttonValue);
            }
        };
    },
});

// Step 2: Patch PaymentScreen to add nominal buttons and custom onClick handler
patch(PaymentScreen.prototype, {
    getNumpadButtons() {
        const colorClassMap = {
            "10000": "o_colorlist_item_color_transparent_10",
            "20000": "o_colorlist_item_color_transparent_10",
            "50000": "o_colorlist_item_color_transparent_10",
            "Backspace": "o_colorlist_item_color_transparent_1",
            ".": "o_colorlist_item_color_transparent_6",
            "-": "o_colorlist_item_color_transparent_3",
        };

        const customRightColumn = [
            { value: "10000", text: "10.000" },
            { value: "20000", text: "20.000" },
            { value: "50000", text: "50.000" },
            NumpadComp.BACKSPACE,
        ];

        const buttons = NumpadComp.getButtons(NumpadComp.DEFAULT_LAST_ROW, customRightColumn);

        return buttons.map((button) => ({
            ...button,
            class: `${colorClassMap[button.value] || ""}`,
        }));
    },

    onNumpadClick(buttonValue) {
        console.log("Clicked button:", buttonValue);
        const isNominal = ["10000", "20000", "50000"].includes(buttonValue);
        const order = this.pos.get_order();

        if (isNominal) {
            const paymentLine = order?.get_selected_paymentline();
            if (paymentLine) {
                const currentAmount = paymentLine.amount || 0;
                const increment = parseFloat(buttonValue);
                const newAmount = currentAmount + increment;
                paymentLine.set_amount(newAmount);
                this.numberBuffer.set(newAmount.toString());
                if (typeof this.updateSelectedPaymentline === "function") {
                    this.updateSelectedPaymentline(newAmount);
                }
            }
        } else {
            this.numberBuffer.sendKey(buttonValue);
        }
    },

    // Step 3: Override render Numpad to use custom onClick
    render() {
        const vnode = super.render();
        if (vnode && vnode.children) {
            const numpadVNode = vnode.children.find(
                (v) => v.type && v.type.__name__ === "Numpad"
            );
            if (numpadVNode) {
                numpadVNode.props = {
                    ...numpadVNode.props,
                    onClick: this.onNumpadClick.bind(this),
                };
            }
        }
        return vnode;
    },
});
