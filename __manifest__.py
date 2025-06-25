{
    "name": "POS Payment Numpad ",
    "version": "1.0",
    "summary": "Numpad in Payment page POS Kedai Babeh",
    "author": "PT Lintang Utama Infotek",
    "license": "LGPL-3",
    "depends": ["point_of_sale"],
    'assets': {
        "point_of_sale._assets_pos": [
            "kedai_numpad/static/src/app/screens/payment_screen/custom_payment_screen.js",
            "kedai_numpad/static/src/app/screens/payment_screen/custom_payment_screen.xml",
            "kedai_numpad/static/src/app/generic_components/numpad/custom_numpad.js",
        ],
    },
    "installable": True,
    "application": False,
}
