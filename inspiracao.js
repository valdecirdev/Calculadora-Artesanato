const hexToDecimal = hex => parseInt(hex, 16);
var linhas = [ANCHOR, DMC, MAXI];
var marca = 0;
var marcas = ['Anchor', 'DMC', 'Maxi'];

function redefinirLinhas() {
  linhas = [ANCHOR, DMC, MAXI];
}

redefinirLinhas();

function distancia(r1,g1,b1,r2,g2,b2) {
  return (Math.hypot(r1-r2, g1-g2, b1-b2));
}

function ordenarLinhas(cor) {
  linhas = linhas.map((marca) => marca
    .sort((a, b) =>  distancia(cor[0], cor[1], cor[2], a[1], a[2], a[3]) - distancia(cor[0], cor[1], cor[2], b[1], b[2], b[3])) 
  );
}

function showColor(red, green, blue) {
  const cor = [red, green, blue]
  colorir(document.querySelector("#swatch-original"), cor);
  ordenarLinhas(cor);
  for (let [i, marca] of marcas.entries()) {
    for (let [j, linha] of document.querySelectorAll('.lbl-'+ marca).entries()) {
      let label = linhas[i][j][0];
      if (i === 0 && DESCONTINUADAS.includes(label)) {
        label = label + " 💩";               
      } 
      linha.innerHTML = label; 
      linha.style.color = getContrastYIQ(cor);
    }
    for(let [j, linha] of document.querySelectorAll('.color-block.' + marca).entries()) { 
      colorir(linha, linhas[i][j].slice(1));
    }
  }
  [...document.querySelectorAll(".esconde")].map((e) => {
    e.classList.remove("esconde");
    e.classList.add("fade-in");
  });
}

function colorir(elemento, cor) {
  let color = "rgb(" + cor.toString() + ")";
  elemento.style.backgroundColor = color;
}

function converte() {
  let linha = document.getElementById("linha");
  linha.setCustomValidity("");
  let form = document.querySelector('.active form');
  let filtra = document.getElementById("filtra").checked; 
  if (!form.reportValidity()) return;
  redefinirLinhas();
  var rgb = converteRGB();
  if (form.id == "formHexa") {
    rgb = converteHexa();
  } 
  if (form.id == "formLinhas") {
    let linhasValidas = linhas[marca].map((l) => l[0].toString());
    console.log(linhasValidas);
    console.log(!linhasValidas.includes(linha.value));
    if (!linhasValidas.includes(linha.value)) {
      linha.setCustomValidity("Código de linha inválido");
      linha.reportValidity();
      return;
    }
    rgb = converteLinhas(linha.value);
  }
  linhas[0] = linhas[0].filter((l) => filtra || !DESCONTINUADAS.includes(l[0]));
  showColor(...rgb);
}

function converteRGB() {
  let red = document.getElementById("red").value;
  let green = document.getElementById("green").value;
  let blue = document.getElementById("blue").value;
  return [red, green, blue];
}

function converteHexa() {
  hexa = document.querySelector('#hexa').value.replace(/^#/, "");
  return hexa.match(/(.{1,2})/g).map(hexToDecimal);
}

function converteLinhas(linha) {
  rgb = linhas[marca].find((l) => l[0] == linha).slice(1);
  linhas[marca] = linhas[marca].filter((l) => l[0] != linha);
  return rgb;
}

function setMarca(id) {
  marca = id;
}

// função que retorna '#fff' ou '#000' conforme a luminância da cor
function getContrastYIQ(cor) {
  const r = parseInt(cor[0]);
  const g = parseInt(cor[1]);
  const b = parseInt(cor[2]);
  // fórmula padrão YIQ
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? '#1b1b1b' : '#fefaef';
}