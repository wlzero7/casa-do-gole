const menuBtn=document.getElementById('menuBtn');
const navMenu=document.getElementById('navMenu');
const cartBtn=document.getElementById('cartBtn');
const closeCart=document.getElementById('closeCart');
const cartPanel=document.getElementById('cartPanel');
const cartItems=document.getElementById('cartItems');
const cartCount=document.getElementById('cartCount');
const cartTotal=document.getElementById('cartTotal');
const addButtons=document.querySelectorAll('.add-carrinho');
const filtros=document.querySelectorAll('.filtro');
const cards=document.querySelectorAll('.produto-card');
let carrinho=[];
menuBtn.addEventListener('click',()=>navMenu.classList.toggle('active'));
document.querySelectorAll('.nav-menu a').forEach(link=>link.addEventListener('click',()=>navMenu.classList.remove('active')));
cartBtn.addEventListener('click',()=>cartPanel.classList.add('active'));
closeCart.addEventListener('click',()=>cartPanel.classList.remove('active'));
function moedaParaNumero(valor){return Number(valor.replace('R$','').replace('.','').replace(',','.').trim())}
function numeroParaMoeda(valor){return valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function atualizarCarrinho(){
  cartCount.textContent=carrinho.length;
  if(carrinho.length===0){cartItems.innerHTML='<p class="cart-empty">Seu carrinho está vazio.</p>';cartTotal.textContent='R$ 0,00';return;}
  cartItems.innerHTML=carrinho.map((item,index)=>`<div class="cart-item"><div><strong>${item.nome}</strong><br><span>${item.preco}</span></div><button onclick="removerItem(${index})" aria-label="Remover item">×</button></div>`).join('');
  const total=carrinho.reduce((soma,item)=>soma+moedaParaNumero(item.preco),0);
  cartTotal.textContent=numeroParaMoeda(total);
}
function removerItem(index){carrinho.splice(index,1);atualizarCarrinho()}
window.removerItem=removerItem;
addButtons.forEach(btn=>btn.addEventListener('click',()=>{carrinho.push({nome:btn.dataset.produto,preco:btn.dataset.preco});atualizarCarrinho();cartPanel.classList.add('active')}));
filtros.forEach(btn=>btn.addEventListener('click',()=>{filtros.forEach(b=>b.classList.remove('ativo'));btn.classList.add('ativo');const filtro=btn.dataset.filtro;cards.forEach(card=>{card.style.display=(filtro==='Todos'||card.dataset.categoria===filtro)?'block':'none'})}));
document.querySelector('.contato-form').addEventListener('submit',e=>{e.preventDefault();alert('Mensagem enviada com sucesso!');e.target.reset()});
document.querySelector('.finalizar').addEventListener('click',()=>{if(carrinho.length===0){alert('Seu carrinho está vazio.');return;}alert('Pedido registrado! Em um site real, aqui iria para o pagamento.');});
const revealElements=document.querySelectorAll('.reveal,.produto-card');
revealElements.forEach(el=>el.classList.add('reveal'));
function revealOnScroll(){const h=window.innerHeight;revealElements.forEach(el=>{if(el.getBoundingClientRect().top<h-80)el.classList.add('active')})}
window.addEventListener('scroll',revealOnScroll);window.addEventListener('load',revealOnScroll);
