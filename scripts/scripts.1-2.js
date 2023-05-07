//ETPAS 1 E 2

/* Classe para trabalhar com o arquivo */
class File {
  file;
  data = [];

  //Seta nome do arquivo enviado no Html
  setNameFileOnHtml(files) {
    if (files) {
      this.file = files;
      this.editMsgLabel(null, files);
    }
  }

  //Após confirmação do usuário, pega os dados do arquivo
  getDatasFile() {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (event) => this.convertToJson(event);
      reader.readAsText(this?.file[0]);
    } else alert("Escola um arquivo para continuar");
  }

  //Converte dados para Json
  async convertToJson(csv) {
    let lines = [];
    //Divide dados por linhas e cria um array de string
    const linesArray = csv?.target?.result?.split("\n");

    //Remove '/r' das strings e adiciona ao array lines
    linesArray.forEach((e) => {
      const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ",").trim();
      lines.push(row);
    });
    //Headers (antigas coulas do csv)
    const headers = lines[0].split(",");

    //For que irá montar o json juntando as linhas + colunas
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      this.data.push(obj);
    }

    console.log(this.data);

    this.clearInputFile();
  }

  //Limpa o input file
  clearInputFile() {
    getElement_ById("fileCsv").value = "";
    this.file = null;
    this.data = [];
    this.editMsgLabel("Escoler arqivo", null);
    scroolTo("teste-2");
  }

  editMsgLabel(msg, file) {
    const label = getElement_ById("label-input-file");
    if (file) label.innerText = this.file[0].name;
    else label.innerText = msg;
  }
}

/* Classe para realizar pesquisa e exibir o resultado */
class Search {
  data_ = file.data;
  searchValue = null;

  //Realiza validações e chama método para pesquisa
  search() {
    this.searchValue = getElement_ById("input-search").value;
    if (this.searchValue.length > 3 && this.verifyIfDataExists())
      this.searchByData();
    if (this.searchValue.length == 0) this.showResult([]);
  }

  verifyIfDataExists() {
    if (this.data_.length == 0) {
      alert("Adicione um arquivo na etapa anterior para continuar!");
      scroolTo("etapa-1");
      this.clearInput();
      return false;
    }

    return true;
  }

  //Realiza pesquisa e limpa o input
  searchByData() {
    let result = [];
    for (const data of this.data_) {
      if (data?.cidade.includes(this.searchValue)) result.push(data);
    }

    this.showResult(result);
  }

  clearInput() {
    getElement_ById("input-search").value = "";
    this.searchValue = null;
  }

  //Mostra resultado da pesquisa na tela
  showResult(result) {
    console.log(result);
    const element = document.getElementById("result");
    element.innerHTML = "";

    for (const res of result) {
      const p = document.createElement("p");
      p.innerHTML = `${res?.nome}, ${res?.idade} anos - ${res?.cidade}`;
      element.appendChild(p);
    }
  }
}

function scroolTo(e) {
  const element = document.getElementById(e);
  if (element) element.scrollIntoView();
}

function getElement_ById(e) {
  return document.getElementById(e);
}

const file = new File();
const search = new Search();
