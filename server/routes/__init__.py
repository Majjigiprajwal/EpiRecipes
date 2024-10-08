

from flask import Blueprint
from .search import search_blueprint  
from .auto_suggestion import suggestions_blueprint  

def register_routes(app):
    app.register_blueprint(search_blueprint, url_prefix='/search')  
    app.register_blueprint(suggestions_blueprint, url_prefix='/suggestions')  
