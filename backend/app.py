from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage
import os
import requests
import ast

# TO DO: валидировать все входящие данные

app = Flask(__name__)
CORS(app)

os.environ["OPENAI_API_KEY"] = "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"
chat = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7)



calc_prompt_template = """{context}. Мы внедряем AI для автоматизации этой компании. Для сокращения расходов замененные сотрудники будут уволены. Рассчитай сколько человек можно заменить и какую сумму в год можно секономить.
  Думай пошагово, ответь в формате Assumptions:... Thoughts:...Calculations: your preliminary calculation with numbers. You must include numbers."""

profession_prompt_template = """
Company {company_name} works in {company_sphere}. It has {employee_value} employees. It {company_descripton}. Please provide an aproximate breakdown of employees
in the company by occupation in percentage of total employees. Think step by step. The format of the response is required as json, following the 
'profession_name': 'percentage' template. The total sum of percentages should be equal to 100. The name of professions should be in Russian.
"""

ask_questions_template = """
Company {company_name} works in {company_sphere}. It {company_descripton}. They have {employee_value} employees: {breakdown}, where occupations and percentage of total number of 
employees are indicated.You need to help them to estimate how many people can be replaced with AI.
Generate a list of 2 questions that are important to ask them to give a correct estimate, separated by a new line. Questions should be in Russian and can be answered Yes or No.
"""


calc_prompt = PromptTemplate(
    input_variables=["context"],
    template=calc_prompt_template
)

@app.route('/questions_generate', methods=['POST'])
def questions_generate():
    data = request.json
    company_information = data.get('companyData')
    profession_information = data.get('professionData')

    questions_prompt = PromptTemplate(
        input_variables=["company_name", "company_sphere", "company_descripton","employee_value", "breakdown"],
        template=ask_questions_template
    )

    questions_prompt_format = questions_prompt.format(
        company_name=company_information['companyName'],
        company_sphere=company_information['companySphere'],
        company_descripton=company_information['companyDescription'],
        employee_value=company_information['sliderEmployeeValue'],
        breakdown=profession_information,
    )

    questions_bot_definition = f"You are a professional business consultant that specialize in AI transformation of companies";

    questions = chat([SystemMessage(content=questions_bot_definition),
      HumanMessage(content=questions_prompt_format)])

    questions = questions.content.split('\n')
    print(questions)

    return jsonify(first_question=questions[0], second_question=questions[1])

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
