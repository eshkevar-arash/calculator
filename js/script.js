// گرفتن تمامی دکمه‌ها و ورودی
const buttons = document.querySelectorAll('.input');
const resultInput = document.querySelector('.input-result');

// متغیر برای ذخیره محاسبات
let currentInput = '0'; // مقدار ورودی فعلی
let operator = null; // عملگر فعلی
let previousInput = ''; // ورودی قبلی (برای انجام عملیات‌ها)
let result = null; // نتیجه نهایی

// تابع برای بروزرسانی ورودی
function updateDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value; // برای جلوگیری از اضافه شدن صفر در ابتدا
    } else {
        currentInput += value; // اضافه کردن عدد جدید به ورودی
    }
    resultInput.value = currentInput;
}

// تابع برای اعمال عملگرها
function applyOperator(op) {
    if (operator !== null) {
        calculate(); // اگر عملگر قبلی وجود دارد، محاسبه می‌کنیم
    }
    operator = op;
    previousInput = currentInput; // ذخیره ورودی قبلی
    currentInput = '0'; // تنظیم ورودی فعلی برای انجام عملیات
}

// تابع برای محاسبه نتیجه
function calculate() {
    if (operator === null) return; // اگر هیچ عملگری وجود نداشت
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                resultInput.value = 'Error'; // جلوگیری از تقسیم بر صفر
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    // نمایش نتیجه
    resultInput.value = result;
    currentInput = result.toString(); // به‌روزرسانی ورودی با نتیجه
    operator = null; // تنظیم مجدد عملگر
}

// تابع برای پاک کردن ورودی
function clearInput() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    result = null;
    resultInput.value = currentInput;
}

// تابع برای پاک کردن یک عدد
function clearOne() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    resultInput.value = currentInput;
}

// تابع برای نمایش علامت منفی
function toggleSign() {
    if (currentInput[0] === '-') {
        currentInput = currentInput.slice(1); // حذف علامت منفی
    } else {
        currentInput = '-' + currentInput; // اضافه کردن علامت منفی
    }
    resultInput.value = currentInput;
}

// افزودن event listeners به تمامی دکمه‌ها
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.value;

        if (value === 'c') {
            clearOne(); // پاک کردن یک عدد
        } else if (value === 'clear') {
            clearInput(); // پاک کردن تمام ورودی
        } else if (value === '=') {
            calculate(); // محاسبه نتیجه
        } else if (value === '+/-') {
            toggleSign(); // تغییر علامت عدد
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            applyOperator(value); // اعمال عملگر
        } else {
            updateDisplay(value); // به‌روزرسانی ورودی
        }
    });
});
