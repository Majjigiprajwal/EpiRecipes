from flask import Blueprint, request, jsonify
from config import get_opensearch_client, OPENSEARCH_INDEX


suggestions_blueprint = Blueprint('suggestions', __name__)

@suggestions_blueprint.route('/', methods=['GET'])
def suggestions():
    keyword = request.args.get('recipe', '').strip() 
    client = get_opensearch_client()

    print(f"Received keyword: {keyword}")

    
    if not keyword:
        return jsonify([])  
    
    
    body = {
        "size": 5,
        "query": {
            "bool": {
                "should": [
                    {"wildcard": {"title": f"{keyword}*"}},
                    {"wildcard": {"ingredients": f"{keyword}*"}}
                ]
            }
        },
        "_source": ["title"]
    }
    
    try:
     
        response = client.search(index=OPENSEARCH_INDEX, body=body)

        suggestions = [hit['_source']['title'] for hit in response['hits']['hits']]

        return jsonify(suggestions)
    except Exception as e:
        print(f"Error fetching suggestions: {str(e)}")

        return jsonify({"error": "Error fetching suggestions", "details": str(e)}), 500

