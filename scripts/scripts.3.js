//ETAPA 3

const products = [
  { nome: "Tv Sansung", preco: 2999, totalVendas: 12 },
  { nome: "Tv LG", preco: 3299, totalVendas: 22 },
  { nome: "Notebook Dell", preco: 4999, totalVendas: 15 },
  { nome: "Galaxy S10", preco: 1999, totalVendas: 28 },
  { nome: "IPhone X", preco: 2499, totalVendas: 8 },
  { nome: "Monitor LG Ultrawide", preco: 849, totalVendas: 17 },
  { nome: "Teclado Red Dragon", preco: 399, totalVendas: 12 },
];

class Table {
  data = [...products];
  crescentOderder = true;

  constructor() {
    this.orderByName();
  }

  //Cria e atualiza tabela no html
  createTable() {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    for (let i in this.data) {
      let tr = tbody.insertRow();
      let tdNome = tr.insertCell();
      let tdPreco = tr.insertCell();
      let tdTotalVendas = tr.insertCell();

      tdNome.innerText = this.data[i]?.nome;
      tdPreco.innerText = this.data[i]?.preco.toFixed(2);
      tdTotalVendas.innerText = this.data[i]?.totalVendas;
    }
  }

  //Ordena dados pela coluna
  order() {
    const elementSelect = document.getElementById("select").value;
    switch (elementSelect) {
      case "nome":
        this.orderByName();
        break;
      case "preco":
        this.orderByPreco();
        break;
      case "total-vendas":
        this.orderByVendas();
        break;
    }
  }

  //Pega ordem asc ou desc
  getOrder() {
    const order = document.querySelector(
      'input[name="input-radio"]:checked'
    ).value;

    this.crescentOderder = order == "true" ? true : false;
    this.order();
  }

  //Método para ordenar por nome
  orderByName() {
    this.data = this.data.sort((a, b) => {
      if (a.nome < b.nome) return -1;
      else return true;
    });
    if (!this.crescentOderder) this.invertOrder();
    this.createTable();
  }

  //Método para ordenar por preço
  orderByPreco() {
    this.data = this.data.sort((a, b) => {
      if (a.preco < b.preco) return -1;
      else return true;
    });
    if (!this.crescentOderder) this.invertOrder();
    this.createTable();
  }

  //Método para ordenar por vendas
  orderByVendas() {
    this.data = this.data.sort((a, b) => {
      if (a.totalVendas < b.totalVendas) return -1;
      else return true;
    });
    if (!this.crescentOderder) this.invertOrder();
    this.createTable();
  }

  //Iverte ordem em caso de ordenação decrescente
  invertOrder() {
    this.data.reverse();
  }
}

const table = new Table();
