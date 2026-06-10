// 发布商品页面JavaScript

let uploadedImages = [];

function initPublishForm() {
    if (!isLoggedIn()) {
        showToast('请先登录', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return;
    }

    initCategorySelect();
    initImageUpload();
    initTitleCount();
    initFormSubmit();
}

function initCategorySelect() {
    const categorySelect = document.getElementById('category');
    const categories = JSON.parse(localStorage.getItem('xianyu_categories') || '[]');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = `${category.icon} ${category.name}`;
        categorySelect.appendChild(option);
    });
}

function initImageUpload() {
    const imageInput = document.getElementById('images');
    const imagePreview = document.getElementById('imagePreview');

    imageInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);

        if (uploadedImages.length + files.length > 9) {
            showToast('最多只能上传9张图片', 'warning');
            return;
        }

        files.forEach(file => {
            if (!file.type.startsWith('image/')) {
                showToast('请选择图片文件', 'warning');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                showToast('图片大小不能超过5MB', 'warning');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImages.push(e.target.result);
                renderImagePreview();
            };
            reader.readAsDataURL(file);
        });
    });
}

function renderImagePreview() {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = uploadedImages.map((img, index) => `
        <div class="preview-item">
            <img src="${img}" alt="预览">
            <button class="remove-btn" onclick="removeImage(${index})">×</button>
        </div>
    `).join('');
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    renderImagePreview();
}

function initTitleCount() {
    const titleInput = document.getElementById('title');
    const titleCount = document.getElementById('titleCount');

    titleInput.addEventListener('input', () => {
        titleCount.textContent = titleInput.value.length;
    });
}

function initFormSubmit() {
    const form = document.getElementById('publishForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 清除错误
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const originalPrice = parseFloat(document.getElementById('originalPrice').value) || null;
        const category = document.getElementById('category').value;
        const condition = document.getElementById('condition').value;
        const tags = document.getElementById('tags').value.trim();
        const freeShipping = document.getElementById('freeShipping').checked;

        let isValid = true;

        if (!title) {
            document.getElementById('titleError').textContent = '请输入标题';
            isValid = false;
        }

        if (!description) {
            document.getElementById('descriptionError').textContent = '请输入描述';
            isValid = false;
        }

        if (!price || price <= 0) {
            document.getElementById('priceError').textContent = '请输入正确的价格';
            isValid = false;
        }

        if (!category) {
            document.getElementById('categoryError').textContent = '请选择分类';
            isValid = false;
        }

        if (!condition) {
            document.getElementById('conditionError').textContent = '请选择成色';
            isValid = false;
        }

        if (!isValid) return;

        const currentUser = getCurrentUser();
        const goodsList = JSON.parse(localStorage.getItem('xianyu_goods') || '[]');

        const newGoods = {
            id: Date.now(),
            title: title,
            categoryId: parseInt(category),
            userId: currentUser.id,
            price: price,
            originalPrice: originalPrice,
            images: uploadedImages.length > 0 ? uploadedImages : ['images/goods/placeholder.svg'],
            description: description,
            condition: condition,
            location: currentUser.location || '未填写',
            views: 0,
            likes: 0,
            wantCount: 0,
            isFreeShipping: freeShipping,
            tags: tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [],
            status: '在售',
            createTime: new Date().toISOString()
        };

        goodsList.push(newGoods);
        localStorage.setItem('xianyu_goods', JSON.stringify(goodsList));

        showToast('发布成功！', 'success');

        setTimeout(() => {
            window.location.href = `goods-detail.html?id=${newGoods.id}`;
        }, 1000);
    });
}

function previewGoods() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value;

    if (!title && !description && !price) {
        showToast('请先填写商品信息', 'warning');
        return;
    }

    showToast('预览功能开发中...', 'info');
}

document.addEventListener('DOMContentLoaded', () => {
    initPublishForm();
});
