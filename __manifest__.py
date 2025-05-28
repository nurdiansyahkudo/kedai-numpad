{
    "name": "POS Payment Numpad ",
    "version": "1.0",
    "summary": "Numpad in Payment page POS Kedai Babeh",
    "author": "PT Lintang Utama Infotek",
    "license": "LGPL-3",
    "depends": ["point_of_sale"],
    'assets': {
        "point_of_sale._assets_pos": [
            "kedai_numpad/static/src/app/generic_components/numpad/custom_numpad.js",
            "kedai_numpad/static/src/app/screens/payment_screen/custom_payment_screen.js",
            ("replace", "point_of_sale/static/src/css/pos_receipts.css", "kedai_numpad/static/src/css/pos_receipts.css"),
        ],
    },
    "installable": True,
    "application": False,
}
