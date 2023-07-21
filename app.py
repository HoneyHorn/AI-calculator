from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    full_name = f"{first_name} {last_name}"
    return jsonify(full_name=full_name)

if __name__ == '__main__':
    app.run(debug=True)