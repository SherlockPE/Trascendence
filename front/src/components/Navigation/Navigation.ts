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
    this.template = `<nav class="bg-gray-800 text-white">
  <div class="container mx-auto px-4 py-2">
    <ul class="flex space-x-4">
      ${this.renderNavItems()}
    </ul>
  </div>
</nav>`;
  }

  private renderNavItems(): string {
    return this.props.items.map(item => {
      const activeClass = item.active ? 'text-blue-300' : 'text-gray-300 hover:text-white';
      return `<li><a href="${item.url}" class="${activeClass}">${item.text}</a></li>`;
    }).join('');
  }

  public update(newProps: Partial<NavigationProps> = {}): void {
    super.update(newProps);
    
    // Actualizar la plantilla con los nuevos items si se proporcionaron
    if (newProps.items) {
      this.template = `<nav class="bg-gray-800 text-white">
  <div class="container mx-auto px-4 py-2">
    <ul class="flex space-x-4">
      ${this.renderNavItems()}
    </ul>
  </div>
</nav>`;
    }
  }
}