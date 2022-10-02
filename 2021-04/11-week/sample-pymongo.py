import urllib
from pymongo import MongoClient

username = urllib.parse.quote_plus('whatwant')
password = urllib.parse.quote_plus('sell98')

client = MongoClient('192.168.100.113', port=30270, username=username, password=password)

print(client.list_database_names())