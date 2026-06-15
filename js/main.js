inputImagem1.addEventListener("change", async function (evento) {
  const arquivo = evento.target.files[0];

  try {
    imagem1 = await lerImagem(arquivo, canvasImagem1, ctxImagem1);
    console.log("Imagem 1 carregada:", imagem1);
  } catch (erro) {
    alert(erro);
  }
});

inputImagem2.addEventListener("change", async function (evento) {
  const arquivo = evento.target.files[0];

  try {
    imagem2 = await lerImagem(arquivo, canvasImagem2, ctxImagem2);
    console.log("Imagem 2 carregada:", imagem2);
  } catch (erro) {
    alert(erro);
  }
});
