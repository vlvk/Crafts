!function () {
    const keyboard = document.querySelector('.bg-image .keyboard');
    const mainDisplay = document.getElementsByClassName('mainDisplay')[0];
    const operators = keyboard.querySelectorAll('.operator');
    let firstNum = 0, secondNum = 0;
    let oper = '';
    let cleanflag = false;
    keyboard.addEventListener('click', e => {
        if (e.target.matches('button')) {
            const action = e.target.dataset.action;
            if (action !== undefined) {
                if (
                    action === 'add' ||
                    action === 'sub' ||
                    action === 'mult' ||
                    action === 'divi'
                ) {
                    cleanflag = true;
                    firstNum = parseFloat(mainDisplay.textContent);
                    oper = action;
                    for (i of operators) {
                        i.classList.remove('pressed');
                    }
                    e.target.classList.add('pressed');
                } else {
                    switch (action) {
                        case 'decimal':
                            mainDisplay.textContent += '.';
                            break;
                        case 'clear':
                            firstNum = 0;
                            secondNum = 0;
                            oper = '';
                            mainDisplay.textContent = '0';
                            break;
                        default:
                            // console.log('等号')
                            for (i of operators) {
                                i.classList.remove('pressed');
                            }
                            secondNum = parseFloat(mainDisplay.textContent);
                            let temp = calculate(firstNum, oper, secondNum);
                            if (temp !== false) {
                                mainDisplay.textContent = temp;
                                firstNum = temp;
                            } else {
                                firstNum = 0;
                                mainDisplay.textContent = '未知错误';
                            }
                            break;
                    }
                }
            } else {
                const displayNum = mainDisplay.textContent;
                if (displayNum === '0' || cleanflag === true ) {
                    mainDisplay.textContent = e.target.textContent;
                    cleanflag = false;
                } else {
                    mainDisplay.textContent = displayNum + e.target.textContent;
                }
            }
        }
    });
    const calculate = (firstNum, operator, secondNum) => {
        switch (operator) {
            case 'add':
                return firstNum + secondNum;
            case 'sub':
                return firstNum - secondNum;
            case 'mult':
                return firstNum * secondNum;
            case 'divi':
                return firstNum / secondNum;
            default:
                return false;
        }
    }
}()