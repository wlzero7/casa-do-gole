// Filtro de produtos
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                const products = document.querySelectorAll('.product-item');
                
                products.forEach(product => {
                    if (category === 'all' || product.getAttribute('data-category') === category) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });

        // Cart functionality
        let cartItems = [];
        
        function updateCart() {
            const cartItemsDiv = document.getElementById('cart-items');
            const totalAmount = document.getElementById('total-amount');
            const paymentAmount = document.getElementById('payment-amount');
            
            cartItemsDiv.innerHTML = '';
            let total = 0;
            
            cartItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove-item" data-index="${index}">&times;</button>
                `;
                cartItemsDiv.appendChild(itemDiv);
                
                total += parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            });
            
            totalAmount.textContent = total.toFixed(2);
            paymentAmount.textContent = total.toFixed(2);
        }

        // Add to cart button handler
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const product = button.parentElement;
                const title = product.querySelector('.product-title').textContent;
                const price = product.querySelector('.product-price').textContent;
                
                cartItems.push({ title, price });
                updateCart();
                
                // Show notification
                alert(`${title} adicionado ao carrinho!`);
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('login-modal');
            const loginLink = document.querySelector('a[href="login"]');
            const closeBtn = document.querySelector('.close-modal');
            const switchToLoginBtn = document.getElementById('switch-to-login');
            
            // Open modal when clicking login link
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'block';
            });
            
            // Close modal when clicking X
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // Switch between signup and login forms
            switchToLoginBtn.addEventListener('click', () => {
                const modalHeader = document.querySelector('.modal-header h2');
                const authForm = document.getElementById('signup-form');
                const switchText = document.querySelector('.auth-switch p');
                const switchButton = document.getElementById('switch-to-login');
                
                if (modalHeader.textContent === 'Criar Conta') {
                    modalHeader.textContent = 'Login';
                    authForm.innerHTML = `
                        <input type="email" placeholder="Email" required>
                        <input type="password" placeholder="Senha" required>
                        <button type="submit" class="auth-button">Entrar</button>
                    `;
                    switchText.textContent = 'Não tem uma conta?';
                    switchButton.textContent = 'Criar Conta';
                } else {
                    modalHeader.textContent = 'Criar Conta';
                    authForm.innerHTML = `
                        <input type="text" placeholder="Nome completo" required>
                        <input type="email" placeholder="Email" required>
                        <input type="password" placeholder="Senha" required>
                        <input type="password" placeholder="Confirmar senha" required>
                        <button type="submit" class="auth-button">Criar Conta</button>
                    `;
                    switchText.textContent = 'Já tem uma conta?';
                    switchButton.textContent = 'Faça Login';
                }
            });
            
            // Handle form submission
            document.getElementById('signup-form').addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Funcionalidade em desenvolvimento!');
            });

            // Cart modal handling
            const cartModal = document.getElementById('cart-modal');
            const cartLink = document.querySelector('a[href="carrinho"]');
            const closeCartBtn = document.getElementById('close-cart');
            
            cartLink.addEventListener('click', (e) => {
                e.preventDefault();
                cartModal.style.display = 'block';
                updateCart();
            });
            
            closeCartBtn.addEventListener('click', () => {
                cartModal.style.display = 'none';
            });
            
            // Remove item from cart
            document.getElementById('cart-items').addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-item')) {
                    const index = e.target.dataset.index;
                    cartItems.splice(index, 1);
                    updateCart();
                }
            });
            
            // Payment modal handling
            const paymentModal = document.getElementById('payment-modal');
            const checkoutBtn = document.getElementById('checkout-btn');
            const closePaymentBtn = document.getElementById('close-payment');
            
            checkoutBtn.addEventListener('click', () => {
                if (cartItems.length === 0) {
                    alert('Seu carrinho está vazio!');
                    return;
                }
                cartModal.style.display = 'none';
                paymentModal.style.display = 'block';
            });
            
            closePaymentBtn.addEventListener('click', () => {
                paymentModal.style.display = 'none';
            });
            
            // Payment form handling
            document.getElementById('payment-form').addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Pagamento processado com sucesso!');
                cartItems = [];
                updateCart();
                paymentModal.style.display = 'none';
            });

            // Close modals when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === cartModal) {
                    cartModal.style.display = 'none';
                }
                if (e.target === paymentModal) {
                    paymentModal.style.display = 'none';
                }
            });
        });
