#source: https://stackoverflow.com/questions/38170071/csv-to-json-convertion-with-python

import csv
import json

ROWTYPES = {'Neighbourhood': str,
            'ZHVI': int,
            'Side': str}

def jsonify_csv(csvfile, jsonfile):
    with open(csvfile) as f:
        reader = csv.DictReader(f)

        jsonfile = open(jsonfile, 'w')
        for row in reader:
            row_converted = {k: ROWTYPES[k](v) for k, v in row.items()}
            json.dump(row_converted, jsonfile)
            jsonfile.write('\n')
