

  export function defoltConsts() {

    const defolt_pass = {
        length: 8,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: true,
        delimiter: false,
        delimiter_value: 4,
      }
    
    const rangeValueTable = {
      "0": {min: 4,
        max: 32,
        step: 1},
      "4": {min: 4,
        max: 19,
        step: 5},
      "5": {min: 5,
        max: 23,
        step: 6},
      "6": {min: 6,
        max: 27,
        step: 7},
      }

    return {
        defolt_pass,
        rangeValueTable
    }
}