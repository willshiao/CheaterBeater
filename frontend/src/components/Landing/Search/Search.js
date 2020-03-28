import React, { Component } from 'react';
import './Search.scss';
import { Input, Form } from 'antd';

class Search extends Component {
  state = {
    devpostUrl: ""
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <section className="Search">
        <Form onSubmit={this.handleSubmit}>
          <Input
            placeholder="Enter Devpost link..."
            name="devpostUrl"
          />
        </Form>
      </section>
    )
  }
}

export default Search;