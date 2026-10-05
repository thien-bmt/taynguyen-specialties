/**
 * ĐẶC SẢN TÂY NGUYÊN - MAIN JAVASCRIPT
 * Tự động tải sản phẩm từ JSON, tìm kiếm, lọc danh mục, giỏ hàng & kiểm tra form
 */

// Global State
let products = [];
let cart = JSON.parse(localStorage.getItem('tn_cart') || '[]');
let currentCategory = 'all';
let searchKeyword = '';

// Sample Fallback Data (Đảm bảo chạy mượt cả khi không có Web Server local)
const sampleProductsFallback = [
  {
    "id": "sp01",
    "name": "Cà Phê Buôn Ma Thuột Nguyên Chất",
    "category": "Cà phê & Đồ uống",
    "price": 180000,
    "unit": "Gói 500g",
    "origin": "Đắk Lắk",
    "image": "assets/images/sp01_caphe.svg",
    "stock": 150,
    "description": "Hạt cà phê Robusta rang xay nguyên chất 100% từ vùng đất đỏ bazan Buôn Ma Thuột, hương vị đậm đà, đắng thanh và thơm nồng quyến rũ.",
    "featured": true
  },
  {
    "id": "sp02",
    "name": "Thịt Bò Một Nắng Krông Pa",
    "category": "Thực phẩm & Chế biến",
    "price": 420000,
    "unit": "Gói 500g",
    "origin": "Gia Lai",
    "image": "assets/images/sp02_bo_mot_nang.svg",
    "stock": 80,
    "description": "Đặc sản thịt bò cỏ chăn thả tự nhiên vùng Krông Pa, ướp gia vị sả ớt Tây Nguyên phơi đúng 1 nắng vàng. Ăn kèm muối kiến vàng thơm ngậy.",
    "featured": true
  },
  {
    "id": "sp03",
    "name": "Sâm Ngọc Linh Kon Tum Thượng Hạng",
    "category": "Dược liệu quý",
    "price": 3500000,
    "unit": "Hộp 100g",
    "origin": "Kon Tum",
    "image": "assets/images/sp03_sam_ngoc_linh.svg",
    "stock": 25,
    "description": "Quốc bảo Việt Nam trồng trên đỉnh núi Ngọc Linh cao trên 2.000m, hàm lượng Saponin cao vượt trội, bồi bổ sức khỏe và tăng cường thể lực.",
    "featured": true
  },
  {
    "id": "sp04",
    "name": "Rượu Cần Tây Nguyên Gia Truyền",
    "category": "Cà phê & Đồ uống",
    "price": 250000,
    "unit": "Bình 5 Lít",
    "origin": "Đắk Lắk",
    "image": "assets/images/sp04_ruou_can.svg",
    "stock": 40,
    "description": "Rượu cần ủ từ nếp nương và men lá rừng truyền thống của người Ba Na, Ê Đê. Vị ngọt thơm dịu êm, không đau đầu, đậm đà tình thân buôn làng.",
    "featured": false
  },
  {
    "id": "sp05",
    "name": "Mật Ong Rừng Gia Lai Nguyên Chất",
    "category": "Nông sản & Hạt",
    "price": 320000,
    "unit": "Chai 1 Lít",
    "origin": "Gia Lai",
    "image": "assets/images/sp05_mat_ong.svg",
    "stock": 95,
    "description": "Mật ong khai thác tự nhiên từ rừng già Chư Mom Ray - Gia Lai. Mật sánh đặc, màu vàng óng, hương thơm hoa rừng tự nhiên và giàu dưỡng chất.",
    "featured": true
  },
  {
    "id": "sp06",
    "name": "Hồ Tiêu Chư Sê Hạt Đen",
    "category": "Nông sản & Hạt",
    "price": 150000,
    "unit": "Hũ 500g",
    "origin": "Gia Lai",
    "image": "assets/images/sp06_ho_tieu.svg",
    "stock": 200,
    "description": "Hạt tiêu đen Chư Sê hạt tròn đều, mẩy ruột, cay nồng và thơm cay đặc trưng của vùng đất bazan, là gia vị hảo hạng cho mọi căn bếp.",
    "featured": false
  },
  {
    "id": "sp07",
    "name": "Hạt Macca Sấy Nứt Vỏ Lâm Đồng",
    "category": "Nông sản & Hạt",
    "price": 210000,
    "unit": "Hũ 500g",
    "origin": "Lâm Đồng",
    "image": "assets/images/sp07_macca.svg",
    "stock": 120,
    "description": "Nữ hoàng các loại hạt trồng tại vùng cao nguyên Lâm Đồng. Hạt được sấy nứt vỏ tự nhiên, nhân giòn béo ngậy, bồi bổ trí não và tim mạch.",
    "featured": true
  },
  {
    "id": "sp08",
    "name": "Bơ 034 Sáp Dẻo Lâm Đồng",
    "category": "Nông sản & Hạt",
    "price": 85000,
    "unit": "Túi 1kg",
    "origin": "Lâm Đồng",
    "image": "assets/images/sp08_bo_034.svg",
    "stock": 60,
    "description": "Giống bơ 034 quả dài đặc sản Bảo Lộc Lâm Đồng, thịt quả dẻo quánh, màu vàng bơ hạt nhỏ, hương vị béo béo thơm lừng.",
    "featured": false
  },
  {
    "id": "sp09",
    "name": "Măng Khô Rừng Nương Kon Tum",
    "category": "Thực phẩm & Chế biến",
    "price": 280000,
    "unit": "Gói 500g",
    "origin": "Kon Tum",
    "image": "assets/images/sp09_mang_kho.svg",
    "stock": 70,
    "description": "Măng nứa rừng tươi hái trên vùng cao Kon Tum, luộc sạch phơi nắng tự nhiên không lưu huỳnh. Măng vàng ruộm, giòn ngọt nấu canh miến hay kho thịt đều xuất sắc.",
    "featured": false
  },
  {
    "id": "sp10",
    "name": "Cơm Lam Gà Nướng Đắk Nông",
    "category": "Thực phẩm & Chế biến",
    "price": 230000,
    "unit": "Mẹt 1 Con + 3 Ống",
    "origin": "Đắk Nông",
    "image": "assets/images/sp10_com_lam_ga_nuong.svg",
    "stock": 35,
    "description": "Set gà đồi nướng than hoa ướp mắc khén sả ớt thơm phức kết hợp cơm lam nếp nương nướng ống tre dẻo thơm trọn vị núi rừng Tây Nguyên.",
    "featured": true
  }
];

// Formatting Currency (VND)
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Toast Notification
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Resolve correct path based on HTML location
function resolvePath(relativePath) {
  const isInsideHtmlDir = window.location.pathname.includes('/html/') || window.location.href.includes('/html/');
  if (isInsideHtmlDir && !relativePath.startsWith('../')) {
    return '../' + relativePath;
  }
  return relativePath;
}

// Load Products
async function loadProducts() {
  let loaded = false;
  const pathsToTry = [resolvePath('data/products.json'), 'data/products.json', '../data/products.json'];

  for (const path of pathsToTry) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        products = await response.json();
        loaded = true;
        break;
      }
    } catch (e) {
      // try next path
    }
  }

  if (!loaded) {
    products = sampleProductsFallback;
  }

  renderProducts();
  renderFeaturedProducts();
  updateCartBadge();
}

// Helper: Build HTML string for a single product card
function buildProductCardHTML(p) {
  const imageSrc = resolvePath(p.image);
  return `
    <div class="product-card" onclick="openProductDetail('${p.id}')" style="cursor: pointer;" title="Nhấn để xem chi tiết sản phẩm">
      <div class="product-img-wrapper">
        <img src="${imageSrc}" alt="${p.name}" class="product-img" onerror="this.src='${resolvePath('assets/images/sp01_caphe.svg')}'"/>
        <span class="origin-badge">${p.origin}</span>
        ${p.featured ? '<span class="featured-badge">Nổi bật</span>' : ''}
      </div>
      <div class="product-content">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-meta">
          <div>
            <div class="product-price">${formatCurrency(p.price)}</div>
            <div class="product-unit">/ ${p.unit}</div>
          </div>
          <div class="product-stock">Kho: ${p.stock}</div>
        </div>
        <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${p.id}');">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  `;
}

// Open Product Detail Modal
function openProductDetail(productId) {
  ensureDetailModalExists();
  const p = products.find(item => item.id === productId) || sampleProductsFallback.find(item => item.id === productId);
  if (!p) return;

  const detailBody = document.getElementById('product-detail-body');
  const detailModal = document.getElementById('product-detail-modal');

  if (detailBody) {
    detailBody.innerHTML = `
      <div class="product-detail-layout">
        <div class="product-detail-img-wrapper">
          <img src="${resolvePath(p.image)}" alt="${p.name}" class="product-detail-img" onerror="this.src='${resolvePath('assets/images/sp01_caphe.svg')}'"/>
          <span class="origin-badge">Nguồn gốc: ${p.origin}</span>
        </div>
        <div class="product-detail-info">
          <div class="product-category">${p.category}</div>
          <h2 class="product-detail-title">${p.name}</h2>
          <div class="product-detail-price-box">
            <span class="product-price">${formatCurrency(p.price)}</span>
            <span class="product-unit">/ ${p.unit}</span>
          </div>
          <div class="product-stock" style="margin-bottom: 16px;">Tình trạng: <strong>Còn hàng trong kho (${p.stock} ${p.unit})</strong></div>
          
          <div class="product-detail-description">
            <h4>Mô Tả Chi Tiết Đặc Sản:</h4>
            <p>${p.description}</p>
          </div>

          <button class="submit-btn" onclick="addToCart('${p.id}');" style="margin-top: 20px;">
            Thêm Vào Giỏ Hàng
          </button>
        </div>
      </div>
    `;
  }

  if (detailModal) {
    detailModal.classList.add('active');
  }
}

// Ensure Product Detail Modal HTML Structure Exists
function ensureDetailModalExists() {
  let modal = document.getElementById('product-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'product-detail-modal';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 680px;">
        <button class="modal-close" id="close-detail-btn" onclick="closeProductDetailModal()">✕</button>
        <div id="product-detail-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

function closeProductDetailModal() {
  const detailModal = document.getElementById('product-detail-modal');
  if (detailModal) detailModal.classList.remove('active');
}

// Render Products Grid (Used in products.html)
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const resultsCount = document.getElementById('results-count');
  if (!grid) return;

  // Filter products by Category & Keyword
  const filtered = products.filter(p => {
    const matchesCategory = (currentCategory === 'all') || (p.category === currentCategory);
    const matchesSearch = p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                          p.origin.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (resultsCount) {
    resultsCount.textContent = `Hiển thị ${filtered.length} / ${products.length} sản phẩm`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>Không tìm thấy đặc sản phù hợp</h3>
        <p>Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục sản phẩm.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => buildProductCardHTML(p)).join('');
}

// Render Featured Products Grid (Used in index.html)
function renderFeaturedProducts() {
  const featuredGrid = document.getElementById('featured-grid');
  if (!featuredGrid) return;

  const featuredList = products.filter(p => p.featured);
  featuredGrid.innerHTML = featuredList.map(p => buildProductCardHTML(p)).join('');
}

// Category Filter Setup
function setupCategoryFilters() {
  const filterBtns = document.querySelectorAll('.category-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-category');
      renderProducts();
    });
  });
}

// Live Search Setup
function setupSearchInput() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value.trim();
      renderProducts();
    });
  }
}

// Cart Logic
function addToCart(productId) {
  const product = products.find(p => p.id === productId) || sampleProductsFallback.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartBadge();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalCount;
}

function saveCart() {
  localStorage.setItem('tn_cart', JSON.stringify(cart));
}

function renderCartDrawer() {
  const cartItemsContainer = document.getElementById('cart-items-list');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
        <p>Giỏ hàng của bạn đang trống</p>
      </div>
    `;
    if (cartTotalAmount) cartTotalAmount.textContent = formatCurrency(0);
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    const itemSubtotal = item.price * item.quantity;
    total += itemSubtotal;
    const itemImg = resolvePath(item.image);
    return `
      <div class="cart-item">
        <img src="${itemImg}" alt="${item.name}" class="cart-item-img"/>
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatCurrency(item.price)} x ${item.quantity}</div>
        </div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
          <button class="qty-btn" style="background:#ffcdd2; color:#b71c1c;" onclick="removeFromCart('${item.id}')">✕</button>
        </div>
      </div>
    `;
  }).join('');

  if (cartTotalAmount) cartTotalAmount.textContent = formatCurrency(total);
}

function changeQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    renderCartDrawer();
    updateCartBadge();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCartDrawer();
  updateCartBadge();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng');
}

// Modal Toggle Handlers
function setupModals() {
  ensureDetailModalExists();

  const cartModal = document.getElementById('cart-modal');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const checkoutBtn = document.getElementById('checkout-btn');

  const orderModal = document.getElementById('order-modal');
  const closeOrderBtn = document.getElementById('close-order-btn');

  const closeDetailBtn = document.getElementById('close-detail-btn');
  const detailModal = document.getElementById('product-detail-modal');

  if (closeDetailBtn && detailModal) {
    closeDetailBtn.addEventListener('click', () => {
      detailModal.classList.remove('active');
    });
  }

  if (openCartBtn && cartModal) {
    openCartBtn.addEventListener('click', () => {
      renderCartDrawer();
      cartModal.classList.add('active');
    });
  }

  if (closeCartBtn && cartModal) {
    closeCartBtn.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  }

  if (checkoutBtn && cartModal && orderModal) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Giỏ hàng trống! Vui lòng chọn sản phẩm đặc sản trước khi đặt hàng.');
        return;
      }
      cartModal.classList.remove('active');
      renderOrderFormSummary();
      orderModal.classList.add('active');
    });
  }

  if (closeOrderBtn && orderModal) {
    closeOrderBtn.addEventListener('click', () => {
      orderModal.classList.remove('active');
    });
  }
}

// Render Order Summary inside Order Form
function renderOrderFormSummary() {
  const orderSummaryContainer = document.getElementById('order-summary-box');
  if (!orderSummaryContainer) return;

  const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  orderSummaryContainer.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px; color: var(--primary-brown);">Danh sách sản phẩm (${cart.length}):</div>
    <ul style="list-style: none; padding-left: 0; font-size: 14px; margin-bottom: 12px;">
      ${cart.map(i => `
        <li style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>• ${i.name} x ${i.quantity}</span>
          <span style="font-weight: 600;">${formatCurrency(i.price * i.quantity)}</span>
        </li>
      `).join('')}
    </ul>
    <div style="border-top: 1px solid var(--border-color); padding-top: 8px; display: flex; justify-content: space-between; font-weight: 800; color: var(--accent-orange); font-size: 16px;">
      <span>Tổng thanh toán:</span>
      <span>${formatCurrency(total)}</span>
    </div>
  `;
}

// Form Validation Handlers
function setupOrderFormValidation() {
  const orderForm = document.getElementById('order-form');
  if (!orderForm) return;

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate FullName
    const nameInput = document.getElementById('order-name');
    const nameGroup = nameInput.closest('.form-group');
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameGroup.classList.add('error');
      isValid = false;
    } else {
      nameGroup.classList.remove('error');
    }

    // Validate Phone (VN Phone format: 10 digits starting with 03, 05, 07, 08, 09)
    const phoneInput = document.getElementById('order-phone');
    const phoneGroup = phoneInput.closest('.form-group');
    const phoneRegex = /(03|05|07|08|09)+[0-9]{8}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneGroup.classList.add('error');
      isValid = false;
    } else {
      phoneGroup.classList.remove('error');
    }

    // Validate Address
    const addressInput = document.getElementById('order-address');
    const addressGroup = addressInput.closest('.form-group');
    if (!addressInput.value.trim() || addressInput.value.trim().length < 5) {
      addressGroup.classList.add('error');
      isValid = false;
    } else {
      addressGroup.classList.remove('error');
    }

    if (isValid) {
      // Process simulated order success
      const orderModal = document.getElementById('order-modal');
      if (orderModal) orderModal.classList.remove('active');

      const customerName = nameInput.value.trim();
      alert(`ĐẶT HÀNG THÀNH CÔNG!\n\nCảm ơn quý khách ${customerName} đã ủng hộ Đặc Sản Tây Nguyên.\nĐơn hàng của quý khách đang được đóng gói và bàn giao cho đơn vị vận chuyển.`);

      // Reset cart and form
      cart = [];
      saveCart();
      updateCartBadge();
      orderForm.reset();
    }
  });
}

// Contact Form Validation
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      alert('Vui lòng điền đầy đủ các thông tin liên hệ!');
      return;
    }

    showToast('Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ liên hệ lại sớm nhất.');
    contactForm.reset();
  });
}

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  setupCategoryFilters();
  setupSearchInput();
  setupModals();
  setupOrderFormValidation();
  setupContactForm();
});
