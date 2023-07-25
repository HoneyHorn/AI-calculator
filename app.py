from flask import Flask, render_template, request, jsonify
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage
import os
import requests

app = Flask(__name__, static_url_path='/static')

os.environ["OPENAI_API_KEY"] = "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"
chat = ChatOpenAI(model_name="gpt-4", temperature=0.7)

ask_questions_template = """
    Company {company_name} is doing business in {company_sphere} industry. They have {number_of_employees} employees: breakdown.
    You need to help them to estimate how many people can be replaced with AI.
    Generate a list of 2 questions that are important to ask them to give a correct estimate, separated by a new line"""

calc_prompt_template = """{context}. Мы внедряем AI для автоматизации этой компании. Для сокращения расходов замененные сотрудники будут уволены. Рассчитай сколько человек можно заменить и какую сумму в год можно секономить.
  Думай пошагово, ответь в формате Assumptions:... Thoughts:...Calculations: your preliminary calculation with numbers. You must include numbers."""

prompt = PromptTemplate(
    input_variables=["company_name", "company_sphere", "number_of_employees"],
    template=ask_questions_template
)

calc_prompt = PromptTemplate(
    input_variables=["context"],
    template=calc_prompt_template
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    # company_name = request.form['company_name']
    # company_sphere = request.form['company_sphere']
    # number_of_employees = request.form['number_of_employees']
    # median_salary = request.form['median_salary']
    # prompt_sentiment = request.form['prompt_sentiment']
    company_name = data['company_name']
    company_sphere = data['company_sphere'] # TO DO сделать ввод для поля  wizard
    number_of_employees = data['number_of_employees'] # Количество сотрудников / процент от общего / средняя зп
    median_salary = data['median_salary']
    prompt_sentiment = data['prompt_sentiment']

    bot_definition = f"You are a professional {prompt_sentiment} business consultant that specialize in AI transformation of companies";

    get_questions_list = prompt.format(company_name=company_name, company_sphere=company_sphere, number_of_employees=number_of_employees)

    result = chat([SystemMessage(content=bot_definition),
      HumanMessage(content=get_questions_list)])

    questions = result.content.split('\n')

    return jsonify(questions=questions)

if __name__ == '__main__':
    app.run(debug=True)

    # TO DO вопросы на отдельных окнах с возможностью пропустить
    # Попросить ответы с заранее известным форматом

