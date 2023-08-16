from flask import Flask, abort, request, jsonify
from flask_cors import CORS
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage
import os
import requests
import ast

# TO DO: валидировать все входящие данные
# TO DO: в генерации вопросов иногда проскакивает второй "пустой" вопрос. Пример:
#   ['1. Ваша компания использует автоматизированные системы или программы для выполнения повторяющихся задач в работе с базами данных, дизайном, управлением проектами, 
#   разработкой программного обеспечения, системным анализом или тестированием? (Да/Нет)', '', '2. Ваши сотрудники тратят большую часть рабочего времени на рутинные задачи, 
#   которые могут быть автоматизированы с помощью искусственного интеллекта? (Да/Нет)']

app = Flask(__name__)
CORS(app)

os.environ["OPENAI_API_KEY"] = "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"
chat = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7)

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

report_prompt_template = """{context}. Мы внедряем AI для автоматизации этой компании. Для сокращения расходов замененные сотрудники будут уволены. 
Рассчитай сколько человек можно заменить и какую сумму в год можно сэкономить.
Думай пошагово, процент должен быть предположен из надёжных статистических источников, ответь в формате Предположения:... Выводы:... Расчеты: предварительный расчет с цифрами. 
Должны содержаться цифры.
"""

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
    if len(questions) == 2:
        print(questions)
        return jsonify(first_question=questions[0], second_question=questions[1])
    else:
        abort(400, 'Ошибка ответа Chatgpt')

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

@app.route('/report_creation', methods=['POST'])
def report_creation():
    data = request.json

    company_information = data.get('companyData')
    profession_information = data.get('professionData')
    first_question = data.get('questinonOneValue')
    first_question_answer = data.get('asnwerOneValue')
    second_question = data.get('questinonTwoValue')
    second_question_answer = data.get('answerTwoValue')

    # TO DO: понять что делать со средней зарплатой, сейчас это хардкод
    context = f"""
    Company {company_information['companyName']} is doing business in {company_information['companySphere']} industry. They have {company_information['sliderEmployeeValue']} 
    employees. Average monthly salary is {70000}. Here is some context in question/answer format: Question one about company: {first_question} Answer: {first_question_answer}.
    Question two about company: {second_question} Answer: {second_question_answer}.
    """

    report_prompt = PromptTemplate(
        input_variables=["context"],
        template=report_prompt_template
    )

    report_prompt_format = report_prompt.format(
        context=context,
    )

    report_bot_definition = f"You are a professional evil and cynical business consultant that specialize in AI transformation of companies";

    report_result = chat([SystemMessage(content=report_bot_definition),
        HumanMessage(content=report_prompt_format)])
    
    print(report_result.content)
    return jsonify(report=report_result.content)


if __name__ == '__main__':
    app.run(debug=True)
