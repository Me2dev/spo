document.addEventListener('DOMContentLoaded', () => {
    const calcRes = document.querySelector('.calculating__result span'),
        calcArea = document.querySelector('.calculating__field'),
        genders = document.querySelector('#gender').querySelectorAll('.calculating__choose-item'),
        ratios = document.querySelectorAll('[data-ratio]');

    let calcHeight,
        calcWeight,
        calcAge,
        calcSex,
        calcRatio;

    if (localStorage.getItem('sex')) {
        calcSex = localStorage.getItem('sex');
        genders.forEach(gender => gender.classList.remove('calculating__choose-item_active'));
        genders.forEach(gender => gender.getAttribute('id') == localStorage.getItem('sex') ? gender.classList.add('calculating__choose-item_active') : '');
    } else {
        calcSex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        calcRatio = +localStorage.getItem('ratio');
        ratios.forEach(ratio => ratio.classList.remove('calculating__choose-item_active'));
        ratios.forEach(ratio => ratio.getAttribute('data-ratio') == +localStorage.getItem('ratio') ? ratio.classList.add('calculating__choose-item_active') : '');
    } else {
        calcRatio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calc() {
        let res;
        if (!calcHeight || !calcWeight || !calcAge || !calcSex || !calcRatio) {
            calcRes.textContent = '____';
            return;
        }
        if (calcSex == 'female') {
            res = Math.round((447.6 + (9.2 * calcWeight) + (3.1 * calcHeight) - (4.3 * calcAge)) * calcRatio);
            return calcRes.textContent = +res < 0 ? '____' : +res;
        } else if (calcSex == 'male') {
            res = Math.round((88.36 + (13.4 * calcWeight) + (4.8 * calcHeight) - (5.7 * calcAge)) * calcRatio);
            return calcRes.textContent = +res < 0 ? '____' : +res;
        }
    }

    function calcParams() {

        calcArea.addEventListener('click', (e) => {
            if (e.target.getAttribute('id') == 'male') {
                calcSex = 'male';
                genders.forEach(gender => gender.classList.remove('calculating__choose-item_active'));
                e.target.classList.add('calculating__choose-item_active');
                localStorage.setItem('sex', 'male');
            } else if (e.target.getAttribute('id') == 'female') {
                calcSex = 'female';
                genders.forEach(gender => gender.classList.remove('calculating__choose-item_active'));
                e.target.classList.add('calculating__choose-item_active');
                localStorage.setItem('sex', 'female');
            } else if (e.target.hasAttribute('data-ratio')) {
                calcRatio = +e.target.getAttribute('data-ratio');
                ratios.forEach(ratio => ratio.classList.remove('calculating__choose-item_active'));
                e.target.classList.add('calculating__choose-item_active');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            }

            calc();
        });
    }

    function calcStats() {
        const inputs = calcArea.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {

                if (input.value.match(/\D/g) || !input.value) {
                    e.target.style.border = '1px solid red';
                } else {
                    e.target.style.border = 'none';
                }

                switch (e.target.getAttribute('id')) {
                    case 'height':
                        calcHeight = +e.target.value;
                        break;
                    case 'weight':
                        calcWeight = +e.target.value;
                        break;
                    case 'age':
                        calcAge = +e.target.value;
                        break;
                }
                calc();
            });
        });

    }

    calc();
    calcParams();
    calcStats();
});