import { Component, ComponentProps } from '../../utils/component';

interface CardProps extends ComponentProps {
  title: string;
  content?: string;
  footer?: Component;
}

export class Card extends Component {
  protected props: CardProps;

  constructor(props: CardProps) {
    super(props);
    this.props = props;
    this.template = `<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
  <div class="card-content">{{ content }}</div>
  <div class="card-footer mt-4"></div>
</div>`;
  }

  protected initEvents(): void {
    // Si hay un componente footer, lo renderizamos dentro del card
    if (this.props.footer && this.element) {
      const footerContainer = this.element.querySelector('.card-footer');
      if (footerContainer) {
        footerContainer.appendChild(this.props.footer.render());
      }
    }
  }
}