/*pizzaJson = [
  {id:1, 
  name:'Mussarela', 
  img:'images/pizza.png', 
  price:20.19, 
  sizes:['100g', '530g', '860g'], 
  description:'Descrição da pizza em mais de uma linha muito legal bem interessante'}
  */
const c = (elem) => document.querySelector(elem);
const cs = (elem) => document.querySelectorAll(elem);
let modalKey = 0;
let modalQt = 1;
let modalSize = parseInt("");
let cart = [];

//LISTAGEM DAS PIZZAS
pizzaJson.forEach((item, index) => {
  let pizzaItem = c(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
  pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;

  c(".pizza-area").append(pizzaItem);

  pizzaItem.querySelector("a").addEventListener("click", (event) => {
    event.preventDefault();
    modalKey = index;
    modalQt = 1;

    c(".pizzaBig img").src = pizzaJson[modalKey].img;
    c(".pizzaInfo h1").innerHTML = pizzaJson[modalKey].name;
    c(".pizzaInfo--desc").innerHTML = pizzaJson[modalKey].description;
    c(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[modalKey].price.toFixed(2)}`;

    c(".pizzaInfo--size.selected").classList.remove("selected");

    cs(".pizzaInfo--size").forEach((sizes, i) => {
      if (i == 2) {
        sizes.classList.add("selected");
      }
      sizes.querySelector("span").innerHTML = pizzaJson[modalKey].sizes[i];
    });

    c(".pizzaInfo--qt").innerHTML = modalQt;

    c(".pizzaWindowArea").style.opacity = 0;
    c(".pizzaWindowArea").style.display = "flex";

    setTimeout(() => {
      c(".pizzaWindowArea").style.opacity = 1;
    }, 200);
  });
});

//EVENTOS DO MODAL
function closeModal() {
  c(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    c(".pizzaWindowArea").style.display = "none";
  }, 200);
}

cs(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item) => {
  item.addEventListener("click", closeModal);
});

c(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    modalQt--;
    c(".pizzaInfo--qt").innerHTML = modalQt;
  }
});

c(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  c(".pizzaInfo--qt").innerHTML = modalQt;
});

cs(".pizzaInfo--size").forEach((size) => {
  size.addEventListener("click", () => {
    c(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

c(".pizzaInfo--addButton").addEventListener("click", () => {
  //Qual a pizza?
  // console.log("Sabor: " + pizzaJson[modalKey].name);

  //Qual o tamanho?
  modalSize = c(".pizzaInfo--size.selected").getAttribute("data-key");
  // console.log("Tamanho: " + modalSize);

  //Quantas pizzas?
  // console.log("Quantidade: " + modalQt);

  //criando um identificador para separar os tamanhos de pizza para o mesmo sabor
  let identifier = pizzaJson[modalKey].id + "@" + modalSize;

  /*antes de adicionar um item no carrinho precisamos verificar se já existe algum item igual, caso sim, precisamos alterar apenas a quantidade desse item, sendo assim:
  "findIndex" retorna 'item' caso ele seja igual ao identifier e '-1' caso não encontre o 'item'
  */
  let identifierKey = cart.findIndex((item) => {
    return item.identifier == identifier;
  });

  /*se não encontrar o item (identifier > -1), adicionamos ele, caso tenha encontrado, alteramos apenas a quantidade
   */
  if (identifierKey > -1) {
    cart[identifierKey].qt += modalQt;
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size: modalSize,
      qt: modalQt,
    });
  }

  console.log(cart);

  closeModal();
});
