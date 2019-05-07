import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';

import categories from '../../utils/fields/categorymenu';

class CategoryMenu extends Component {
  mapCategories = () => {
    return ['All Posts', ...categories].map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ));
  };

  onChange = e => {
    const category = e.target.value;
    if (category !== this.props.category) {
      const url = category === 'All Posts' ? '/' : `/r/${category}`;
      this.props.history.push(url);
    }
  };

  render() {
    return (
      <Form.Control
        as="select"
        className="mb-3"
        onChange={this.onChange}
        value={
          this.props.category.substring(0, 1).toUpperCase() +
          this.props.category.substring(1)
        }
      >
        {this.mapCategories()}
      </Form.Control>
    );
  }
}

export default withRouter(CategoryMenu);
