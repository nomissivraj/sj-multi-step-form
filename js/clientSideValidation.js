var validate = {};

(function (self) {
    self.init = function () {
        $('input').each(function () {
            $(this).on('blur', function () {
                validateInput($(this))
            });
        });

        $('textarea').each(function () {
            $(this).on('blur', function () {
                validateInput($(this))
            });
        });

        $('select').each(function () {
            $(this).on('blur', function () {
                validateInput($(this))
            });
        });
    }

    self.validateInput = function (el) {
        let target = el.attr('data-validation-target');

        if (el[0].checkValidity()) {
            $('[data-validation-output=' + target + ']').removeClass('invalid');
            $('#' + target + '-message').remove();
        } else {

            let container = $('[data-validation-output=' + target + ']');
            container.addClass('invalid');
            if (container[0]) {
                // Dynamic
                let textCont = document.createElement('span');
                textCont.setAttribute('id', target + '-message');
                textCont.setAttribute('class', 'validation-message validation-message--invalid');
                let message = el.attr('data-validation-message') === undefined ? 'Input invalid, please complete correctly' : el.attr('data-validation-message');
                let text = document.createTextNode(message);

                textCont.appendChild(text);
                if ($('[data-validation-output=' + target + ']' + ' .validation-message')[0] !== undefined) return;
                container[0].appendChild(textCont);
            }
        }
    }

    self.validateStep = function () {
        let inputs = [];
        $('.step-active input').each(function () {
            //console.log($(this)[0].checkValidity())
            inputs.push($(this));
        })

        $('.step-active select').each(function () {
            //console.log($(this)[0].checkValidity())
            inputs.push($(this));
        })
        console.log(inputs);

        for (let i = 0; i < inputs.length; i++) {
            //console.log(inputs[i])
            self.validateInput(inputs[i]);
        }
    }
})(validate);