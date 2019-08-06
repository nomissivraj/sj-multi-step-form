var validate = {};

(function (self) {
    let stepValid = true;

    self.init = function () {
        $('input').each(function () {
            let type = $(this).attr('type');
            //console.log(type, $(this))

            switch (type) {
                case 'radio':
                case 'checkbox':
                    $(this).on('click', function () {
                        self.input($(this))
                    });
                    break;
                default:
                    $(this).on('blur', function () {
                        self.input($(this))
                    });
                    $(this).on('input', function () {
                        self.input($(this))
                    });
                    $(this).on('change', function () {
                        self.input($(this))
                    });
                    break;
            }

        });

        $('textarea').each(function () {
            $(this).on('blur', function () {
                self.input($(this))
            });
            $(this).on('input', function () {
                self.input($(this))
            });
        });

        $('select').each(function () {
            $(this).on('blur', function () {
                self.input($(this))
            });
            $(this).on('change', function () {
                self.input($(this))
            });
        });
    }
    
    self.input = function (el)  {
        let target = el.attr('data-validation-target');
        
        //If valid
        if (el[0].checkValidity()) {
            $('[data-validation-output=' + target + ']').removeClass('invalid');
            $('#' + target + '-message').remove();
        } else {
            // Else if invalid
            let container = $('[data-validation-output=' + target + ']');
            container.addClass('invalid');
            stepValid = false;
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

    self.step = function () {
        stepValid = true;
        let inputs = [];
        $('.step-active input').each(function () {
            inputs.push($(this));
        })

        $('.step-active textarea').each(function () {
            inputs.push($(this));
        })

        $('.step-active select').each(function () {
            inputs.push($(this));
        })
        //console.log(inputs);
        
        for (let i = 0; i < inputs.length; i++) {
            self.input(inputs[i]);
        }
        return stepValid;
    }

    self.form = function () {
        let inputs = [];
        $('form input').each(function () {
            inputs.push($(this));
        })

        $('form textarea').each(function () {
            inputs.push($(this));
        })

        $('form select').each(function () {
            inputs.push($(this));
        })
        //console.log(inputs);

        for (let i = 0; i < inputs.length; i++) {
            self.input(inputs[i]);
        }
    }
})(validate);