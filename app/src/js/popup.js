import tippy from 'tippy.js';
import { hideAll } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/dist/svg-arrow.css';

const preset = {
    theme: 'super',
    trigger: 'mouseenter focuse click',
    placement: 'bottom',
    interactive: true,
    inertia: true,
    animation: 'perspective',
    offset: [0, 16],
    zIndex: 3,
}

let globalPopup = (preset) => {
    let items = document.querySelectorAll('[popup-template]');
    let targets = [...items].filter(el => !el._tippy);

    tippy(targets, {
        ...preset,
        hideOnClick: 'toggle',
        content(reference) {
            const id = reference.getAttribute('popup-template');
            const template = document.getElementById(id);
            return template;
        },
        onMount(instance) {
            const clickTarget = instance.reference;
            const hasAction = clickTarget.hasAttribute('update-on-mount');
            if (hasAction) {
                document.dispatchEvent(new CustomEvent('tippy:update'));
            }
        },
        onClickOutside(instance, event) {
            let button = event.target.closest('[popup-toggle-it]');
            if (instance.state.isShown && button && button.getAttribute('popup-toggle-it') == instance.props.content.id) {
                return;
            } else {
                instance.hide();
            }
        },
    });
};

let globalPopupTop = (preset) => {
    let items = document.querySelectorAll('[popup-template-top]');
    let targets = [...items].filter(el => !el._tippy);

    tippy(targets, {
        ...preset,
        placement: 'top',
        hideOnClick: 'toggle',
        content(reference) {
            const id = reference.getAttribute('popup-template-top');
            const template = document.getElementById(id);
            return template;
        },
        onMount(instance) {
            const clickTarget = instance.reference;
            const hasAction = clickTarget.hasAttribute('update-on-mount');
            if (hasAction) {
                document.dispatchEvent(new CustomEvent('tippy:update'));
            }
        },
        onClickOutside(instance, event) {
            let button = event.target.closest('[popup-toggle-it]');
            if (instance.state.isShown && button && button.getAttribute('popup-toggle-it') == instance.props.content.id) {
                return;
            } else {
                instance.hide();
            }
        },
    });
};

let headerDDPopup = (preset) => {
    let items = document.querySelectorAll('[popup-template-dd]');
    let targets = [...items].filter(el => !el._tippy);

    tippy(targets, {
        ...preset,
        placement: 'bottom-end',
        hideOnClick: 'toggle',
        content(reference) {
            const id = reference.getAttribute('popup-template-dd');
            const template = document.getElementById(id);
            return template;
        },
        onMount(instance) {
            const clickTarget = instance.reference;
            const hasAction = clickTarget.hasAttribute('update-on-mount');
            if (hasAction) {
                document.dispatchEvent(new CustomEvent('tippy:update'));
            }
        },
    });
};

let tableCellPopup = (preset) => {
    let items = document.querySelectorAll('[popup-template-tc]');
    let targets = [...items].filter(el => !el._tippy);

    tippy(targets, {
        ...preset,
        trigger: 'mouseenter focus click',
        appendTo: () => document.body,
        placement: 'bottom-end',
        maxWidth: 260,
        offset: [0, 0],
        zIndex: 10,
        popperOptions: {
            modifiers: [{
                name: 'arrow',
                options: {
                    padding: 10,
                },
            }],
        },
        content(reference) {
            const id = reference.getAttribute('popup-template-tc');
            const template = document.getElementById(id);
            return template;
        },
    });
};

document.addEventListener('scroll', event => {
    hideAll();
})

window.addEventListener('scroll', event => {
    if (event.target && event.target !== window && event.target !== document && event.target.hasAttribute('popup-hide-on-scroll')) {
        hideAll();
    }
}, true)

function togglePopup(id, type = 'popup-template') {
    let target = document.querySelector(`[${type}="${id}"]`);

    if (target._tippy.state.isShown) {
        target._tippy.hide();
    } else {
        target._tippy.show();
    }
}
tippy.togglePopup = togglePopup;

window.tippy = tippy;
window.globalPopup = globalPopup;

export { tippy, globalPopup }
