import React from 'react';
import DropdownMenu from 'react-dd-menu';

export default class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
        isMenuOpen: false
    };
    this.click = this.click.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close() {
    this.setState({ isMenuOpen: false });
  }

  click() {
    console.log('You clicked an item');
  }

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <button type="button" onClick={this.toggle}>Click me!</button>,
      align: 'right'
    };
    return (
      <DropdownMenu {...menuOptions}>
        <li><a href="#">Example 1</a></li>
        <li onClick={()=> this.props.pageChange('LANDING')}> To Landing </li> 
      </DropdownMenu>
    );
  }
}
