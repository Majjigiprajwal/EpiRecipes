import json
from config import get_opensearch_client, OPENSEARCH_INDEX
from opensearchpy.helpers import bulk
from opensearchpy import exceptions


def create_index_with_mapping(client):
    mapping = {
        "mappings": {
            "properties": {
                "title": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "desc": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "date": {
                    "type": "date"
                },
                "ingredients": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "directions": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "categories": {
                    "type": "keyword"
                },
                "calories": {
                    "type": "float"
                },
                "fat": {
                    "type": "float"
                },
                "protein": {
                    "type": "float"
                },
                "sodium": {
                    "type": "float"
                },
                "rating": {
                    "type": "float"
                }
            }
        }
    }


    try:
        if not client.indices.exists(index=OPENSEARCH_INDEX,body=mapping):
            client.indices.create(index=OPENSEARCH_INDEX)
            print(f"Index '{OPENSEARCH_INDEX}' created with mapping.")
        else:
            print(f"Index '{OPENSEARCH_INDEX}' already exists. Skipping creation.")
    except exceptions.ConnectionError as e:
        print(f"Connection error while creating the index: {str(e)}")
    except exceptions.RequestError as e:
        print(f"Request error during index creation: {str(e)}")
    except Exception as e:
        print(f"An error occurred while creating the index: {str(e)}")

def ingest_data_bulk(json_file):
   

    client = get_opensearch_client()
    create_index_with_mapping(client)

    try:
        with open(json_file, 'r') as f:
            recipes = json.load(f)

       
        actions = [
            {
                "_index": OPENSEARCH_INDEX,
                "_id": i + 1,
                "_source": recipe
            }
            for i, recipe in enumerate(recipes)
        ]

       
        success, failed = bulk(client, actions)
        print(f"Successfully ingested {success} documents.")
        
        if failed:
            print(f"Failed to ingest {failed} documents.")

    except FileNotFoundError:
        print(f"Error: The file '{json_file}' was not found.")
    except json.JSONDecodeError:
        print(f"Error: Failed to parse JSON from the file '{json_file}'. Ensure the file format is correct.")
    except exceptions.ConnectionError as e:
        print(f"Connection error during data ingestion: {str(e)}")
    except exceptions.RequestError as e:
        print(f"Request error during data ingestion: {str(e)}")
    except Exception as e:
        print(f"An unexpected error occurred during data ingestion: {str(e)}")

if __name__ == "__main__":
    ingest_data_bulk('data/epirecipes.json')
   


