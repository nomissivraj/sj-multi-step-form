$(window).on('load', () => {
    sjMultiStepForm.init(opts);

    let steps = $('.sj-step');
        steps.each((index, el) => {
            $(this).hide();
        });
});

let opts = {
    stepClass: '.sj-step',
}

var sjMultiStepForm = {};
((self) => {
    let currentStep = 0,
        steps,
        className = '.sj-step',
        progress = '.sj-step-progress',
        stepControls = 'data-formstep-control';

    self.init = (opts) => {
        className = opts.stepClass;
        self.showCurrentStep(currentStep);
        self.initControls(stepControls);
        self.stepProgress();
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
                    self.next();
                }
                if (direction == 'previous') {
                    self.prev();
                }
            });
        });
    }

    self.stepProgress = () => {
        let curStep = currentStep+1
        let string = "Step " + curStep + " of " +steps.length;
        $(progress).html(string);
    }

    self.next = () => {
        if (currentStep == steps.length -1) return;
        currentStep++;
        self.showCurrentStep(currentStep);
        self.stepProgress();
    }

    self.prev = () => {
        if (currentStep == 0) return;
        currentStep--;
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

