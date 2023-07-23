function submitData() {
    // Название компании
    const companyName = document.getElementById('company_name').value;

    // Область деятельности компании
    const companySphere = document.getElementById('company_sphere');
    const selectedSpherepOptions = Array.from(companySphere.selectedOptions).map(option => option.value);
    
    // Количество сотрудников
    const numberOfEmployees = document.getElementById('sliderEmployee').value;

    // Медианная зарплата
    const medianSalary = document.getElementById('sliderSalary').value;

    fetch('/process_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `company_name=${encodeURIComponent(companyName)}&company_sphere=${encodeURIComponent(selectedSpherepOptions)}&number_of_employees=${encodeURIComponent(numberOfEmployees)}&median_salary=${encodeURIComponent(medianSalary)}`
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('output').textContent = `Полученные данные: ${data.full_name}`;
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

// Получаем элементы и передаем их в функцию для обработки
const sliderEmployee = document.getElementById("sliderEmployee");
const sliderValueEmployee = document.getElementById("sliderValueEmployee");
handleSliderChange(sliderEmployee, sliderValueEmployee);

const sliderSalary = document.getElementById("sliderSalary");
const sliderValueSalary = document.getElementById("sliderValueSalary");
handleSliderChange(sliderSalary, sliderValueSalary);