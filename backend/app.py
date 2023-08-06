from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage
import os
import requests
import ast

app = Flask(__name__)
CORS(app)

os.environ["OPENAI_API_KEY"] = "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"
chat = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7)

ask_questions_template = """
    Company {company_name} is doing business in {company_sphere} industry. They have {number_of_employees} employees: breakdown.
    You need to help them to estimate how many people can be replaced with AI.
    Generate a list of 2 questions that are important to ask them to give a correct estimate, separated by a new line
"""

calc_prompt_template = """{context}. Мы внедряем AI для автоматизации этой компании. Для сокращения расходов замененные сотрудники будут уволены. Рассчитай сколько человек можно заменить и какую сумму в год можно секономить.
  Думай пошагово, ответь в формате Assumptions:... Thoughts:...Calculations: your preliminary calculation with numbers. You must include numbers."""

profession_prompt_template = """
Company {company_name} works in {company_sphere}. It has {employee_value} employees. It {company_descripton}. Please provide an aproximate breakdown of employees
in the company by occupation in percentage of total employees. Think step by step. The format of the response is required as json, following the 
'profession_name': 'percentage' template. The total sum of percentages should be equal to 100. The name of professions should be in Russian.
"""

prompt = PromptTemplate(
    input_variables=["company_name", "company_sphere", "number_of_employees"],
    template=ask_questions_template
)

calc_prompt = PromptTemplate(
    input_variables=["context"],
    template=calc_prompt_template
)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/process_data', methods=['POST'])
# def process_data():
#     data = request.get_json()
#     company_name = data['company_name']
#     company_description = data['company_description']
#     company_sphere = data['company_sphere']
#     number_of_employees = data['number_of_employees'] # Количество сотрудников / процент от общего / средняя зп
#     median_salary = data['median_salary']
#     prompt_sentiment = data['prompt_sentiment']

#     bot_definition = f"You are a professional {prompt_sentiment} business consultant that specialize in AI transformation of companies";

#     get_questions_list = prompt.format(company_name=company_name, company_sphere=company_sphere, number_of_employees=number_of_employees)

#     result = chat([SystemMessage(content=bot_definition),
#       HumanMessage(content=get_questions_list)])

#     questions = result.content.split('\n')

#     return jsonify(questions=questions)
"""
request.method - метод HTTP запроса (например, GET или POST).
request.args - словарь с аргументами запроса, переданными в URL.
request.form - словарь с данными, отправленными в форме POST.
request.files - данные о файловых объектах, переданных с запросом.
request.headers - заголовки запроса.
request.json - если запрос содержит JSON-данные, они будут здесь.
request.data - сырые данные запроса.
request.cookies - куки, отправленные с запросом.
request.values - комбинированный словарь содержит значения из request.args и request.form.
"""
@app.route('/guess_profession', methods=['POST'])
def guess_profession():
    print(request.json)
    data = request.json

    profession_prompt = PromptTemplate(
        input_variables=["company_name", "company_sphere", "employee_value", "company_descripton"],
        template=profession_prompt_template
    )

    profession_prompt_format = profession_prompt.format(
        company_name=data['companyName'],
        company_sphere=data['companySphere'],
        employee_value=data['sliderEmployeeValue'],
        company_descripton=data['companyDescription'],
    )

    profession_bot_definition = f"Recruitment specialist in the company";

    profession_result = chat([SystemMessage(content=profession_bot_definition),
        HumanMessage(content=profession_prompt_format)])
    
    profession_result = ast.literal_eval(profession_result.content.replace('\n', '').replace('%', '')) # Преобразуем строку в словарь

    print(profession_result)

    return jsonify(profession_result)

@app.route('/', methods=['POST', 'GET'])
def index():
    print(1)

    return 'Hello world'


if __name__ == '__main__':
    app.run(debug=True)
