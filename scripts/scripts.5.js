class Financing {
  rate = 0;
  financingValue = 0;
  valueMonth = 0;
  totalPaid = 0;
  pendingValue = 0;
  totalMonts = 0;

  //Realiza calculo do financiamento
  calcFinancing() {
    while (this.pendingValue > 0) {
      const rate = this.calcRate();
      this.totalMonts++;

      if (this.pendingValue + rate > this.valueMonth) {
        this.showListResult(rate);
        this.pendingValue = this.pendingValue + rate - this.valueMonth;
        this.totalPaid += this.valueMonth + rate;
      } else this.calcFinalInstallment(rate);
    }

    this.showResumFinancing();
  }

  //Calcula parcela mensal caso o valor pendente seja menor queo valor mensal
  calcFinalInstallment(rate) {
    this.valueMonth = this.pendingValue + rate;
    this.totalPaid += this.valueMonth;
    this.showListResult(rate);
    this.pendingValue = 0;
  }

  //Calcula taxa
  calcRate() {
    const rate = this.pendingValue * (this.rate / 100);
    if (rate < this.valueMonth) return rate;

    alert(
      "O valor do júros é maior que o valor pago mensalmente. Não é possível realizar este financimento"
    );
    return null;
  }

  //Exibe resultado na tela
  showListResult(rate) {
    const list = getElements_ById("list");
    const li = document.createElement("li");
    li.innerHTML += `Mês ${this.totalMonts}: R$${this.pendingValue.toFixed(
      2
    )} + ${this.rate}% = R$${(this.pendingValue + rate).toFixed(
      2
    )} - R$${this.valueMonth.toFixed(2)} = R$${(
      this.pendingValue +
      rate -
      this.valueMonth
    ).toFixed(2)}`;

    list.appendChild(li);
  }

  showResumFinancing() {
    const element = getElements_ById("resum");
    //   const p = createElement("p");

    element.innerHTML = `
    <p> <span>Valor do emprestimo<span>: R$${this.financingValue.toFixed(
      2
    )} </p>
    <p> <span>Valor total pago<span>: ${this.totalPaid.toFixed(2)} </p>
    <p> <span>Total de meses<span>: ${this.totalMonts} </p>
    <p> <span>Valor do jurus<span>: ${(
      this.totalPaid - this.financingValue
    ).toFixed(2)} </p>
    `;
  }

  clearDivs() {
    const element = getElements_ById("resum");
    const list = getElements_ById("list");

    element.innerHTML = "";
    list.innerHTML = "";
  }

  clearFields() {
    this.clearDivs();
    this.totalPaid = 0;
    this.totalMonts = 0;
  }

  //Valida valores do input
  validateValues() {
    const rate = Number(getElements_ById("input-value-rate").value);
    const financingvalue = Number(getElements_ById("input-value").value);
    const valueMonth = Number(getElements_ById("input-value-month").value);

    if (!rate || !financingvalue || !valueMonth) {
      alert("Preencha todos os dados para continuar!");
      return;
    }
    this.clearFields();
    this.rate = rate;
    this.financingValue = financingvalue;
    this.valueMonth = valueMonth;
    this.pendingValue = financingvalue;

    if (this.calcRate()) this.calcFinancing();
  }
}

function getElements_ById(element) {
  return document.getElementById(element);
}

const financing = new Financing();
