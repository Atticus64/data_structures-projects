
const abrevs = [
  "AS", 
  "BC",
  "BS", 
  "CC",
  "CL", 
  "CM",
  "CS", 
  "CH",
  "DF", 
  "DG",
  "GT", 
  "GR",
  "HG", 
  "JC",
  "MC", 
  "MN",
  "MS", 
  "NT",
  "NL", 
  "OC",
  "PL", 
  "QT",
  "QR", 
  "SP",
  "SL", 
  "SR",
  "TC", 
  "TS",
  "TL", 
  "VZ",
  "YN", 
  "ZS"
]

function isVowel(x) { 
    return ("aeiouAEIOU".indexOf(x) != -1); 
}

function isLetter(char){
    return ( (char >= 'A' &&  char <= 'Z') ||
             (char >= 'a' &&  char <= 'z') );
}


function isNumeric(value) {
    return /^\d+$/.test(value);
}

/**
 * 
 * @param {number} year 
 * @param {number} mon 
 * @param {number} day 
 */
function isValidDate(year, mon, day) {

  if (mon < 1 || mon > 12) return false

  if (day < 1 || day > 31) return false

  return true
}

/**
 * 
 * @param {string} curp 
 */
export function isValidCurp(curp) {

  if (curp.length < 18) {
    return  {
      error: 'La longitud no es la correcta',
      ok: false
    }
  } 

  const arrCurp = curp.split('')
  const [first, second, third, fourth] = arrCurp

  if (!isLetter(first) || !isVowel(second) || !isLetter(third) || !isLetter(fourth)) {
    return {
      error: 'No son letras los primeros caracteres',
      ok: false
    } 
  } 

  const dateRaw = arrCurp.slice(4, 10) 
  const year =  dateRaw.slice(0, 2).join('')
  const month = Number(dateRaw.slice(2, 4).join(''))
  const day =   Number(dateRaw.slice(4, 6).join(''))
  const dat = dateRaw.join('')

  if (!isNumeric(dat) || !isValidDate(year, month, day)) {
    return {
      error: 'La fecha no es válida',
      ok: false
    }
  }

  const sexo = arrCurp[10]

  if (sexo !== 'H' && sexo !== 'M') {
    return {
      error: 'El sexo no es H o M',
      ok: false
    }
  }

  const estado = arrCurp.slice(11, 13).join('')
  if (!abrevs.includes(estado)) {
    return {
      error: 'La abreviatura del estado no es correcta',
      ok: false
    }
  }

  return {
    error: null,
    ok: true
  }
}
