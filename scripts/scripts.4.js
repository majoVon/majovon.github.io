//ETAPA 4

class ArrayRandom {
  array = [];
  OddArray = [];

  //Gera array com números aleatórios e realiza o push no array de números ímpares
  generateRandomNumbers() {
    //Limpa dados do array e do html antes de gerar novos números
    this.array = [];
    this.OddArray = [];
    this.clearDivsResultsOnHtml();
    //
    const min = Math.ceil(1);
    const max = Math.floor(1000);

    for (let i = 0; i < 100; i++) {
      this.array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    this.oddArray = this.array.filter((r, i) => {
      if (i % 2 != 0) return true;
    });
    this.showNumbers();
  }
  //Exibe resultados na tela
  showNumbers() {
    console.log(this.oddArray);
    const array = getElement_ById("result-array");
    const oddArray = getElement_ById("odd-array");

    for (let res of this.oddArray) {
      oddArray.innerHTML += `${res}, `;
    }
    for (let i of this.array) {
      console.log(i);
      array.innerHTML += `${i}, `;
    }
  }
  //Limpa divs no HTML
  clearDivsResultsOnHtml() {
    const array = getElement_ById("result-array");
    const oddArray = getElement_ById("odd-array");
    array.innerHTML = "";
    oddArray.innerHTML = "";
  }
}

function getElement_ById(element) {
  return document.getElementById(element);
}

const array = new ArrayRandom();
