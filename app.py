from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    company_name = request.form['company_name']
    company_sphere = request.form['company_sphere']
    number_of_employees = request.form['number_of_employees']
    median_salary = request.form['median_salary']
    full_name = f"""
        Название компании: {company_name} 
        Область деятельности: {company_sphere}
        Количество сотрудников: {number_of_employees}
        Средняя зарплата: {median_salary}"""
    return jsonify(full_name=full_name)

if __name__ == '__main__':
    app.run(debug=True)