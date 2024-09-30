export class BoxMeat {

  codeProduct = ""
  peso = 0
  day = 0
  month = 0
  year = 0
  folio = ""

  constructor(code: string, kilosFrac: string, date: string) {
    this.codeProduct = code
    const currentYear = new Date().getFullYear() - 2000
    let inpYear = Number(date.slice(0, 2))
    if (currentYear > inpYear ){
      inpYear += 2000
    } else {
      inpYear += 1900
    }
    const dgramos = Number(kilosFrac.slice(2, 3))
    const kilos = Number(kilosFrac.slice(0, 2))
    let cgramos = Number(kilosFrac.slice(3, 4)) * 10 / 100

    if (dgramos > 5) cgramos += 0.10

    this.peso = kilos + cgramos
    this.year = inpYear
    this.month = Number(date.slice(2, 4))
    this.day = Number(date.slice(4, 6))
  }

  setFolio(fol: string) {
    this.folio = fol
  }
}

export function createBox(codeline: string) {
  const code = codeline.slice(2, 10)
  const kilosFrac = codeline.slice(10, 14)
  const fech = codeline.slice(18, 24)
  const box = new BoxMeat(code, kilosFrac, fech)
  box.setFolio(codeline.slice(14, 18))

  return box
}

