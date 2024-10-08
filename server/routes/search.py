from flask import Blueprint, request, jsonify, json
from config import get_opensearch_client, OPENSEARCH_INDEX
import json

search_blueprint = Blueprint('search', __name__)


@search_blueprint.route('/', methods=['GET'])
def get_recipes():
    keyword = request.args.get('recipe', '').strip()
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 15))

    client = get_opensearch_client()

    if keyword:
        query = {
            "size": limit,
            "from": (page - 1) * limit,
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "query": keyword,
                                "fields": ["title", "ingredients"]
                            }
                        }
                    ]
                }
            }
        }
    else:
        query = {
            "size": limit,
            "from": (page - 1) * limit,
            "query": {
                "match_all": {}
            }
        }

    print("Final query sent to OpenSearch:", query)

    try:
        response = client.search(index=OPENSEARCH_INDEX, body=query)
        recipes = [{**hit['_source'], 'id': hit['_id']} for hit in response['hits']['hits']]
        total = response['hits']['total']['value']

        return jsonify({
            "total": total,
            "page": page,
            "limit": limit,
            "recipes": recipes
        })
    except Exception as e:
        print(f"Error fetching recipes: {str(e)}")
        return jsonify({"error": "Error fetching recipes", "details": str(e)}), 500


@search_blueprint.route('/filter', methods=['GET'])
def filter_recipes():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 15))

    filters = request.args.get('filters', None)
    if filters:
        filters = json.loads(filters)

    client = get_opensearch_client()

    query = {
        "size": limit,
        "from": (page - 1) * limit,
        "query": {
            "bool": {
                "must": []
            }
        }
    }

    if filters:
          if filters.get('categories'):
            normalized_categories = [cat.replace(' ', '-') for cat in filters['categories']]
            query["query"]["bool"]["must"].append({
               "terms": {
               "categories.keyword": normalized_categories  
                        }
               })

    if filters['rating'] > 0:
            query["query"]["bool"]["must"].append({
                "range": {
                    "rating": {
                        "gte": filters['rating']  
                    }
                }
            })

    for nutrient in ['calories', 'protein', 'fat']:
            min_value = filters['nutrients'][nutrient]['min']
            max_value = filters['nutrients'][nutrient]['max']
            if min_value or max_value:
                range_query = {
                    "range": {
                        nutrient: {}
                    }
                }
                if min_value:
                    range_query["range"][nutrient]["gte"] = min_value
                if max_value:
                    range_query["range"][nutrient]["lte"] = max_value

                query["query"]["bool"]["must"].append(range_query)

    try:
        response = client.search(index=OPENSEARCH_INDEX, body=query)
        recipes = [{**hit['_source'], 'id': hit['_id']} for hit in response['hits']['hits']]
        total = response['hits']['total']['value']

        return jsonify({
            "total": total,
            "page": page,
            "limit": limit,
            "recipes": recipes
        })
    except Exception as e:
        print(f"Error fetching recipes: {str(e)}")
        return jsonify({"error": "Error fetching recipes", "details": str(e)}), 500
    

@search_blueprint.route('/recipe/<recipe_id>', methods=['GET'])
def get_recipe_details(recipe_id):
    client = get_opensearch_client()
    try:
        response = client.get(index=OPENSEARCH_INDEX, id=recipe_id)
        recipe = response['_source']
        return jsonify({"recipe": recipe})
    except Exception as e:
        print(f"Error fetching recipe details: {str(e)}")
        return jsonify({"error": "Error fetching recipe details", "details": str(e)}), 500

