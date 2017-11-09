#source: https://stackoverflow.com/questions/38170071/csv-to-json-convertion-with-python

import csv
import json

def jsonify_csv(csvfile, jsonfile):
    with open(csvfile) as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    with open(jsonfile, 'w') as f:
        json.dump(rows, f)
