import tippy, { type ExtendedProps, hideOnPopperBlur, hideOthersOnOpen, hideOnEsc } from './tippy-plugins';
import 'tippy.js/dist/tippy.css';

export default function(node: HTMLElement, options?: Partial<ExtendedProps>) {
  const plugins = [hideOnPopperBlur, hideOthersOnOpen, hideOnEsc];
  const _options = { ...options, plugins };

  // const instance = tippy(node, options);
  const instance = tippy(node, _options);

  return {
    update(newOptions: Partial<ExtendedProps>) {
      const _newOptions = { ...newOptions, plugins };

      // instance.setProps(newOptions);
      instance.setProps(_newOptions);
    },
    destroy() {
      instance.destroy();
    },
  };
}

