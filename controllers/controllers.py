# -*- coding: utf-8 -*-
# from odoo import http


# class KedaiNumpad(http.Controller):
#     @http.route('/kedai_numpad/kedai_numpad', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/kedai_numpad/kedai_numpad/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('kedai_numpad.listing', {
#             'root': '/kedai_numpad/kedai_numpad',
#             'objects': http.request.env['kedai_numpad.kedai_numpad'].search([]),
#         })

#     @http.route('/kedai_numpad/kedai_numpad/objects/<model("kedai_numpad.kedai_numpad"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('kedai_numpad.object', {
#             'object': obj
#         })

