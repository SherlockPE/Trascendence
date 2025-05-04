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
        ? 'text-white font-semibold'
        : 'text-gray-300 hover:text-white transition-colors';

      const underline = item.active
        ? `<span class="absolute left-0 -bottom-1 w-full h-0.5 bg-white"></span>`
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
      <nav class="w-full  text-white">
        <ul class="flex justify-center space-x-10 py-4">
          ${this.renderNavItems()}
        </ul>
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