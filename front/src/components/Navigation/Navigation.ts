import { Component, ComponentProps } from '../../utils/component';

interface NavigationProps extends ComponentProps {
  items: Array<{
    text: string;
    url: string;
    active?: boolean;
  }>;
}

export class Navigation extends Component {
  protected props: NavigationProps;

  constructor(props: NavigationProps) {
    super(props);
    this.props = props;
    this.template = this.renderTemplate();
  }

  private renderNavItems(): string {
    return this.props.items.map((item) => {
      const activeClass = item.active
        ? 'text-white text-sm font-medium'
        : 'text-gray-300 text-sm font-ligth hover:text-white transition-colors';

        const underline = item.active
        ? `<span class="absolute left-1/2 -bottom-3 w-full h-0.5 bg-white" style="width: calc(100% + 2rem); transform: translateX(-50%);"></span>`
        : '';

      return `
        <li class="relative">
          <a href="${item.url}" class="relative pb-1 ${activeClass}">
            ${item.text}
            ${underline}
          </a>
        </li>
      `;
    }).join('');
  }
  renderTemplate(): string {
    return `
<nav class="w-full text-white flex justify-center">
  <div class="relative inline-flex">
    <ul class="flex justify-center space-x-16 pt-4">
      ${this.renderNavItems()}
    </ul>
    <!-- Subrayado -->
    <div class="absolute left-1/2 -bottom-3 h-0.5 bg-white opacity-15" style="width: calc(100% + 4rem); transform: translateX(-50%);"></div>
  </div>
</nav>

    `;
  }
  public update(newProps: Partial<NavigationProps> = {}): void {
    super.update(newProps);
    if (newProps.items) {
      this.props = { ...this.props, ...newProps };
      this.template = this.renderTemplate();
    }
  }
}