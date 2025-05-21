{
    "name": "POS Payment Numpad ",
    "version": "1.0",
    "summary": "Numpad in Payment page POS Kedai Babeh",
    "author": "PT Lintang Utama Infotek",
    "license": "LGPL-3",
    "depends": ["point_of_sale"],
    'assets': {
        'point_of_sale.assets': [
            'kedai_numpad/static/src/app/generic_components/numpad/numpad.js',
        ],
    },
    "installable": True,
    "application": False,
}
