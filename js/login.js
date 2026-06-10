// 登录页面JavaScript

function initLoginForm() {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 清除错误
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        let isValid = true;

        if (!username) {
            showError(usernameInput, 'usernameError', '请输入用户名');
            isValid = false;
        }

        if (!password) {
            showError(passwordInput, 'passwordError', '请输入密码');
            isValid = false;
        }

        if (!isValid) return;

        // 验证用户
        const users = JSON.parse(localStorage.getItem('xianyu_users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            showError(usernameInput, 'usernameError', '用户名或密码错误');
            return;
        }

        // 登录成功
        setCurrentUser(user);
        showToast('登录成功！', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });

    usernameInput.addEventListener('input', () => {
        usernameInput.classList.remove('error');
        document.getElementById('usernameError').textContent = '';
    });

    passwordInput.addEventListener('input', () => {
        passwordInput.classList.remove('error');
        document.getElementById('passwordError').textContent = '';
    });
}

function showError(input, errorId, message) {
    input.classList.add('error');
    document.getElementById(errorId).textContent = message;
}

document.addEventListener('DOMContentLoaded', () => {
    if (isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    initLoginForm();
});
