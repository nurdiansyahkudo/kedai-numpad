{
    "name": "POS Payment Numpad ",
    "version": "1.0",
    "summary": "Numpad in Payment page POS Kedai Babeh",
    "author": "PT Lintang Utama Infotek",
    "license": "LGPL-3",
    "depends": ["point_of_sale"],
    'assets': {
        "point_of_sale._assets_pos": [
            "custom_pos_numpad/static/src/js/custom_numpad.js",
            "custom_pos_numpad/static/src/js/custom_payment_screen.js",
        ],
    },
    "installable": True,
    "application": False,
}
