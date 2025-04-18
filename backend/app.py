from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

app = Flask(__name__)
CORS(app)

@app.route('/match-materials', methods=['POST'])
def match_materials():
    data = request.get_json()
    search_query = data['query']
    materials = data['materials']

    material_names = [mat['name'] + ' ' + mat.get('description', '') for mat in materials]
    vectorizer = TfidfVectorizer(stop_words=None, lowercase=True).fit_transform([search_query] + material_names)

    similarity = cosine_similarity(vectorizer[0:1], vectorizer[1:]).flatten()

    results = []
    for idx, score in enumerate(similarity):
        results.append({**materials[idx], 'match_score': round(score * 100, 2)})

    sorted_results = sorted(results, key=lambda x: x['match_score'], reverse=True)
    return jsonify(sorted_results)


if __name__ == '__main__':
    app.run(debug=True)
