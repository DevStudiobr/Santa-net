// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCzYNZNSqCZkvtzqC8-JIIKExtGVKJC6tc",
    authDomain: "marketsrc-cb564.firebaseapp.com",
    databaseURL: "https://marketsrc-cb564-default-rtdb.firebaseio.com",
    projectId: "marketsrc-cb564",
    storageBucket: "marketsrc-cb564.appspot.com",
    messagingSenderId: "929727087008",
    appId: "1:929727087008:web:d6bd0c309c54da5b1f64c5",
    measurementId: "G-70G8YMLKE3"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Adiciona um novo produto
document.getElementById('produto-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const whatsapp = document.getElementById('whatsapp').value;
    const nomeProduto = document.getElementById('nome-produto').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').value; // URL da imagem

    // Salva no Firebase
    const produtoRef = database.ref('produtos').push();
    produtoRef.set({
        whatsapp: whatsapp,
        nome: nomeProduto,
        preco: preco,
        imagem: imagem || '' // Usa a imagem se fornecida, caso contrário, deixa vazio
    });

    // Limpa o formulário
    this.reset();
    carregarProdutos(); // Atualiza a lista de produtos
});

// Carrega produtos do Firebase
function carregarProdutos() {
    const produtosRef = database.ref('produtos');
    produtosRef.on('value', (snapshot) => {
        const produtos = snapshot.val();
        const lista = document.getElementById('produtos-lista');
        lista.innerHTML = ''; // Limpa a lista atual

        for (let id in produtos) {
            const produto = produtos[id];
            const item = document.createElement('div');
            item.classList.add('produto-item'); // Adiciona uma classe para estilização
            item.innerHTML = `
                <strong>${produto.nome}</strong> - R$${produto.preco} <br>
                WhatsApp: <a href="https://wa.me/${produto.whatsapp}" target="_blank">${produto.whatsapp}</a><br>
                ${produto.imagem ? `<img src="${produto.imagem}" alt="${produto.nome}" style="width:100px;height:auto;">` : ''}
            `;
            lista.appendChild(item);
        }
    });
}

// Chama a função para carregar os produtos quando a página é carregada
carregarProdutos();