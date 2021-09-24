class ValidatorCPF {
    constructor(sentCPF) {
        this.sentCPF = sentCPF.replace(/\D+/g, '');
        
    }

    validCPF() {
        if(this.sentCPF.length !== 11) return false;
        if(this.sentCPF[0].repeat(this.sentCPF.length) === this.sentCPF) return false;
        this.generateNewCPF();
        return this.sentCPF === this.newCPF;
    }

    generateNewCPF() {
        let cpfnodigits = this.sentCPF.slice(0, -2);
        let dig1 = this.calculatorCPF(cpfnodigits);
        let dig2 = this.calculatorCPF(cpfnodigits + dig1);
        this.newCPF = cpfnodigits + dig1 + dig2;
    }

    calculatorCPF(cpfnodigits) {
        let tot = 0;
        let reverse = cpfnodigits.length + 1;
        for(let num of cpfnodigits) {
            tot += Number(num * reverse)
            reverse--
        }
        let dig = 11 - (tot % 11);
        return dig <= 9 ? String(dig) : '0';
    }
    
}

const validatorCPF = new ValidatorCPF('372.044.498-86')
console.log(validatorCPF.validCPF())