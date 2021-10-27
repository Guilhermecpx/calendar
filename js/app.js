//
const mesesDias={
    jan:31,
    feb:28,
    mar:31,
    abr:30,
    mai:31,
    jun:30,
    jul:31,
    ago:31,
    set:30,
    out:31,
    nov:30,
    dec:31
}

const mesesNomes = [
    'jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dec'
]

//
function clearCalendar(){
    calendarDays.innerHTML = ''
}

var calendarDays = document.querySelector('.calendar-days')

//
function renderDay(num, marked=false){
    let day = document.createElement('span')
    
    day.innerText = num
    if(marked){
        day.setAttribute('class', 'calendar-day calendar-day-marked')
    }else{
        day.setAttribute('class', 'calendar-day')
    }
    calendarDays.appendChild(day)
}

//
function getDate(){
    let date = new Date()

    let dia = date.getDate()

    let mesNum = date.getMonth()
    let mes = mesesNomes[mesNum]
    let diasMes = mesesDias[mes]

    let ano = date.getFullYear()

    let diaSemanaNum = date.getDay()

    return{
        mesNum,
        dia,
        mes,
        diasMes,
        ano,
        diaSemanaNum
    }
}

//
function setDays(weekday, mounth, year){
    let date = new Date()
    for(let i=0;i<weekday;i++){
        renderDay('')
    }
    var bisexto = 0
    if(mounth == 1 && year%4==0){
        bisexto = 1
    }
    for(let dia=1;dia<=mesesDias[mesesNomes[mounth]]+bisexto;dia++){
        if(date.getDate()==dia && date.getFullYear()==year && date.getMonth() == mounth){
            renderDay(dia, true)
        }else{
            renderDay(dia)
        }
    }
}

//
function getDateMounth(mounth, year){
    let infoMes = new Date(year, mounth, 01, 10, 30, 15, 500)
    return infoMes.getDay()
}

//
function setMounthDays(mounth, year){
    clearCalendar()
    let currentMounth = mounth
    let currentYear = year

    let firstDay = getDateMounth(currentMounth, currentYear)
    console.log(mesesNomes[currentMounth])
    setDays(firstDay, currentMounth, currentYear)
}

//
function setCurrentDateDays(){
    let date = new Date()
    let mes = date.getMonth()
    let year = date.getFullYear()
    let displayAno = document.querySelector('.calendar-year')
    let displayMes = document.querySelector('.calendar-mounth')

    displayAno.value = year
    displayMes.value = mes
    updateCalendar()
}

function setDateOptions(){
    let date = new Date()

    let displayAno = document.querySelector('.calendar-year')
    let ano = date.getFullYear()+20
    for(let i =ano;i>=1930;i--){
        let opcaoAno = document.createElement('option')
        opcaoAno.setAttribute('value', i)
        opcaoAno.setAttribute('class', 'calendar-option')
        opcaoAno.textContent = i
        displayAno.addEventListener('change', updateCalendar)
        displayAno.appendChild(opcaoAno)
    }

    let displayMes = document.querySelector('.calendar-mounth')
    for(let c in mesesNomes){
        let opcaoMes = document.createElement('option')
        opcaoMes.setAttribute('value', c)
        opcaoMes.setAttribute('class', 'calendar-option')
        opcaoMes.textContent = mesesNomes[c].toUpperCase()
        displayMes.addEventListener('change', updateCalendar)
        displayMes.appendChild(opcaoMes)
    }
}

function updateCalendar(){
    let displayAno = document.querySelector('.calendar-year').value
    let displayMes = document.querySelector('.calendar-mounth').value

    setMounthDays(displayMes, displayAno)
}

setDateOptions()
setCurrentDateDays()
