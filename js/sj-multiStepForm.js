$(window).on('load', () => {
    sjMultiStepForm.init();
});


var sjMultiStepForm = {};
((self) => {
    let currentStep = 0,
        steps,
        className = '.sj-step',
        progress = '.sj-step-progress',
        stepControls = 'data-formstep-control';

    self.init = (opts) => {
        if (opts) {
            className = opts.className ? opts.stepClass: null;
        }
        
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
            console.log('title',title);
            $('#sj-step-title').html(title);
        } else $('#sj-step-title').html('');
        console.log(steps[currentStep])
    }

    self.stepProgress = () => {
        let curStep = currentStep+1
        let string = "Step " + curStep + " of " +steps.length;
        $(progress).html(string);
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

