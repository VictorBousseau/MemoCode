# =================================================
# Module 21 : Consommation d'APIs - SOLUTION
# =================================================

import pandas as pd
import json

# Exercice 1 : Requête GET basique
api_data = [
    {"id": 1, "name": "Product A", "price": 29.99},
    {"id": 2, "name": "Product B", "price": 49.99},
    {"id": 3, "name": "Product C", "price": 19.99}
]

df = pd.DataFrame(api_data)
print("Données API:\n", df)


# Exercice 2 : API avec paramètres
# import requests
# params = {'page': 1, 'limit': 10}
# response = requests.get('https://api.example.com/data', params=params)


# Exercice 3 : Pagination
# all_data = []
# for page in range(1, 4):
#     response = requests.get(f'https://api.example.com/data?page={page}')
#     all_data.extend(response.json())
# df_all = pd.DataFrame(all_data)


# Exercice 4 : JSON imbriqué
nested_data = {
    "users": [
        {"name": "Alice", "address": {"city": "Paris", "zip": "75001"}},
        {"name": "Bob", "address": {"city": "Lyon", "zip": "69001"}}
    ]
}

df_flat = pd.json_normalize(nested_data['users'])
print("JSON aplati:\n", df_flat)
