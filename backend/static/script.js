function submitData() {
    // Название компании
    const companyName = document.getElementById('company_name').value;

    const companyDescription = document.getElementById('company_description').value;

    // Область деятельности компании
    const companySphere = document.getElementById('company_sphere');
    const selectedSpherepOptions = Array.from(companySphere.selectedOptions).map(option => option.value);
    
    // Количество сотрудников
    const numberOfEmployees = document.getElementById('sliderEmployee').value;

    // Медианная зарплата
    const medianSalary = document.getElementById('sliderSalary').value;

    // Prompt sentiment
    const promptSentiment = document.getElementById('promptSentiment').value;

    fetch('/process_data', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company_name: companyName,
        company_description: companyDescription,
        company_sphere: selectedSpherepOptions,
        number_of_employees: numberOfEmployees,
        median_salary: medianSalary,
        prompt_sentiment: promptSentiment
      })
    })
    .then(response => response.json())
    .then(data => {
      let questionsDiv = document.getElementById('questions');
      questionsDiv.innerHTML = '';
      for (let i = 0; i < data.questions.length; i++) {
        let question = document.createElement('p');
        question.textContent = data.questions[i];
        questionsDiv.appendChild(question);

        let answer = document.createElement('input');
        answer.type = 'text';
        answer.id = 'answer' + i;
        questionsDiv.appendChild(answer);
      }
      
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}

// Функция для обработки изменения значения ползунка
function handleSliderChange(slider, sliderValue) {
    // Обработчик события изменения значения ползунка
    slider.addEventListener("input", function() {
        // При изменении значения ползунка обновляем значение в элементе span
        sliderValue.textContent = slider.value;
    });
}

function advancedSettings() {
    const additionalInputContainer = document.getElementById("advancedSettingsContainer");
    if (additionalInputContainer.style.display === "none") {
        additionalInputContainer.style.display = "block";
    } else {
        additionalInputContainer.style.display = "none";
    }
}

// Получаем элементы и передаем их в функцию для обработки
const sliderEmployee = document.getElementById("sliderEmployee");
const sliderValueEmployee = document.getElementById("sliderValueEmployee");
handleSliderChange(sliderEmployee, sliderValueEmployee);

const sliderSalary = document.getElementById("sliderSalary");
const sliderValueSalary = document.getElementById("sliderValueSalary");
handleSliderChange(sliderSalary, sliderValueSalary);