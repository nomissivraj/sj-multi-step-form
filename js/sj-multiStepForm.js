$(window).on('load', () => {
    let opts = {
        stepMode: 'timeline'
    }
    sjMultiStepForm.init(opts);
});


var sjMultiStepForm = {};
((self) => {
    let currentStep = 0,
        steps,
        className = '.sj-step',
        progress = '.sj-step-progress',
        stepControls = 'data-formstep-control',
        stepMode = 'number';

    self.init = (opts) => {
        // If options exist overwrite default otherwise do nothing (null)
        opts.stepMode ? stepMode = opts.stepMode: null;
        opts.className ? className = opts.className: null;
        
        self.showCurrentStep(currentStep);
        self.initControls(stepControls);
        self.stepProgress();
        self.controlVisibility();

    }

    self.showCurrentStep = (currentStep) => {
        // First hide all steps
        steps = $(className);
        steps.each((index, el) => {
            self.hide(el);
        });
        // Show current step
        self.show(currentStep);
    }
    
    self.initControls = (stepControls) => {
        $('['+stepControls+']').each((e, el) => {
            el.addEventListener('click', () => {
                let direction = el.getAttribute(stepControls);
                if (direction == 'next') {
                    self.next(el);
                    
                }
                if (direction == 'previous') {
                    self.prev(el);
                }
            });
        });
    }

    self.controlVisibility = () => {
        
        let next = $('['+stepControls+'=next]')[0],
            prev = $('['+stepControls+'=previous]')[0],
            submit = $('['+stepControls+'=submit]')[0];
        if (currentStep === 0) {
            prev.style.display = 'none';
            //prev.setAttribute('disabled', true)
        } else prev.style.display = 'inline' //prev.removeAttribute('disabled');
        
        if (currentStep === steps.length -1) {
            //next.setAttribute('disabled', true)
            next.style.display = 'none';
            submit.style.display = 'inline';
        } else {
            submit.style.display = 'none';
            next.style.display = 'inline' //next.removeAttribute('disabled');
        }
        if (steps[currentStep].getAttribute('data-form-step-title')) {
            let title = steps[currentStep].getAttribute('data-form-step-title');
            $('#sj-step-title').css('display','inline');
            $('#sj-step-title').html(title);
        } else {
            $('#sj-step-title').html('');
            $('#sj-step-title').css('display','none');
        }
        //console.log(steps[currentStep])
    }

    self.stepProgress = () => {
        let curStep = currentStep+1
        let string = "Step " + curStep + " of " +steps.length;
        console.log(stepMode)
        if (stepMode == 'number') {
            $(progress).html(string);
        } else if (stepMode == 'timeline') {
            let contWidth = $(progress).width();
            console.log('container width:',contWidth)
            let elWidth = 50;
            let totalElWidth = elWidth * steps.length;
            let availWidth = contWidth - totalElWidth;
    
            let padding = availWidth / (steps.length * 2);
                    
            console.log('Available space (cont width - el width):',availWidth, 'padding:',padding);
            for (let i = 0; i < steps.length; i++) {
                // Make DOM elements
                let div = document.createElement('div');
                let text = document.createTextNode(i+1);
                
                // Style DOM elements
                div.setAttribute('style', 'background: grey; color: #fff; display: inline-block; width: '+elWidth+'px;  margin-left:'+padding+'px; margin-right:'+padding+'px; text-align: center;')
                
                // Append DOM elements
                div.appendChild(text);
                $(progress).append(div)
            }
        }
       
    }

    self.next = (el) => {
        if (currentStep == steps.length -1) return;
        currentStep++;
        self.controlVisibility();
        self.showCurrentStep(currentStep);
        self.stepProgress();
    }

    self.prev = (el) => {
        if (currentStep == 0) return;
        currentStep--;
        self.controlVisibility();
        self.showCurrentStep(currentStep);
        self.stepProgress();
    }

    self.hide = (el) => {
        el.style.display = "none";
    }

    self.show = (el) => {
        steps[el].style.display = "block";
    }

})(sjMultiStepForm);

