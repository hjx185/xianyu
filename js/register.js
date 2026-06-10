// 注册页面JavaScript

function initRegisterForm() {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 清除错误
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

        const username = document.getElementById('username').value.trim();
        const nickname = document.getElementById('nickname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const location = document.getElementById('location').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        let isValid = true;

        // 验证用户名
        if (!username) {
            showError('username', 'usernameError', '请输入用户名');
            isValid = false;
        } else if (username.length < 4 || username.length > 16) {
            showError('username', 'usernameError', '用户名长度应为4-16位');
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            showError('username', 'usernameError', '用户名只能包含字母、数字和下划线');
            isValid = false;
        } else {
            const users = JSON.parse(localStorage.getItem('xianyu_users') || '[]');
            if (users.some(u => u.username === username)) {
                showError('username', 'usernameError', '该用户名已被注册');
                isValid = false;
            }
        }

        // 验证昵称
        if (!nickname) {
            showError('nickname', 'nicknameError', '请输入昵称');
            isValid = false;
        }

        // 验证手机号
        if (!phone) {
            showError('phone', 'phoneError', '请输入手机号');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone', 'phoneError', '请输入正确的手机号');
            isValid = false;
        }

        // 验证密码
        if (!password) {
            showError('password', 'passwordError', '请输入密码');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'passwordError', '密码长度至少6位');
            isValid = false;
        }

        // 验证确认密码
        if (!confirmPassword) {
            showError('confirmPassword', 'confirmPasswordError', '请再次输入密码');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPassword', 'confirmPasswordError', '两次输入的密码不一致');
            isValid = false;
        }

        if (!isValid) return;

        // 创建新用户
        const newUser = {
            id: Date.now(),
            username: username,
            password: password,
            nickname: nickname,
            phone: phone,
            location: location || '未填写',
            avatar: 'images/icons/avatar1.svg',
            bio: '这个人很懒，什么都没写~',
            level: 1,
            sellCount: 0,
            buyCount: 0,
            fans: 0,
            follow: 0,
            createTime: new Date().toISOString()
        };

        // 保存用户
        const users = JSON.parse(localStorage.getItem('xianyu_users') || '[]');
        users.push(newUser);
        localStorage.setItem('xianyu_users', JSON.stringify(users));

        // 自动登录
        setCurrentUser(newUser);
        showToast('注册成功！', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}

function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add('error');
    document.getElementById(errorId).textContent = message;
}

document.addEventListener('DOMContentLoaded', () => {
    if (isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    initRegisterForm();
});
