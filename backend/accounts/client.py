import requests

url = 'http://127.0.0.1:8000/api/my_models/'
data = {'foreign_key_field': 1}
headers =  { 'Content-Type': 'application/json',
'Accept': 'application/json' }
response = requests.post(url, json=data, headers=headers)
print(response.content)