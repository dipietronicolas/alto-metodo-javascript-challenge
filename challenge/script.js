/**
 * Multiplicar un numero sin usar *
 */

const input01 = document.querySelector('#number01');
const input02 = document.querySelector('#number02');
const result = document.querySelector('.result');


const multiply = () => {
  const num01 = Number(input01.value);
  const num02 = Number(input02.value);
  let multiply_result = 0;

  for (let i = 0; i < num02; i++) {
    multiply_result += num01;
  }
  result.innerHTML = `${num01} * ${num02} = ${multiply_result}`;
  result.classList.add('result-decoration');
}

/**
 * Fetch a la api de los dias no laborables
 */

const getURL = (year) => {
  return `http://nolaborables.com.ar/api/v2/feriados/${year}?incluir=opcional`;
}

const getNoWorkingDays = async () => {
  const selectedYear = document.querySelector('#options').value;
  const URL = getURL(selectedYear);
  const inamoviblesDetail = document.querySelector('.inamovibles-detail');

  try {
    const data = await fetch(URL);
    const result = await data.json();
    
    const inamovibles = result.filter(day => day.tipo === 'inamovible');
    const nolaborableCount = result.filter(day => day.tipo === 'nolaborable').length;
    const trasladableCount = result.filter(day => day.tipo === 'trasladable').length;
    document.querySelector('#trasladables').innerHTML = `Feriados trasladables: ${trasladableCount} dias trasladables`;
    document.querySelector('#nolaborables').innerHTML = `Feriados no laborales: ${nolaborableCount} dias no laborables`;
    document.querySelector('#inamovibles').innerHTML = `Feriados inamovibles: ${inamovibles.length} dias inamovibles`;
    
    inamoviblesDetail.innerHTML = '';
    for(let day of inamovibles) {
      inamoviblesDetail.innerHTML += `<br>
        motivo: ${day.motivo}<br>
        dia: ${day.dia < 10 ? "0" + String(day.dia) : day.dia}/${day.mes < 10 ? "0" + String(day.mes) : day.mes}/${selectedYear}<br>
      `;
    }
  } catch (error) {
    inamoviblesDetail.innerHTML = `Error: ${error}`;
  }

  
}
