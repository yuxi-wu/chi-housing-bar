import csv
import json

def jsonify_csv(csvfile, jsonfile):
    with open(csvfile) as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    with open(jsonfile, 'w') as f:
        json.dump(rows, f)
