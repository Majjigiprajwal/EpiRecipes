from opensearchpy import OpenSearch


OPENSEARCH_HOST = 'localhost'
OPENSEARCH_PORT = 9200
OPENSEARCH_INDEX = 'recipes'

def get_opensearch_client():
    client = OpenSearch(
        hosts=[{'host': OPENSEARCH_HOST, 'port': OPENSEARCH_PORT}],
        http_compress=True
    )
    return client
