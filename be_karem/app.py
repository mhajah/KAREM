from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/run', methods=['POST'])
def run_code():
    try:
        data = request.json
        code = data.get('code', '')

        # Zapisujemy kod do pliku
        with open("script.py", "w") as f:
            f.write(code)

        # Uruchamiamy kod w subprocessie
        result = subprocess.run(["python3", "script.py"], capture_output=True, text=True)
        
        return jsonify({
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5175)
