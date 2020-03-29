import React, { Component } from 'react';
import './Search.scss';
import content from '../../../content';
import { Input, Button, Form } from 'antd';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../../shared/constants';
import axios from 'axios';
import spinner from '../../../assets/imgs/spinner.svg';

const { search } = content;
const { Item } = Form;

class Search extends Component {
  state = {
    devpostUrl: ""
  }

  handleFinish = values => {
    const { devpostUrl } = values;
    
    this.setState({ devpostUrl });

    // axios.post(BASE_URL, {
    //   url: devpostUrl
    // })
    //   .then(response => {
    //     console.log("GOT RESPONSE FROM POST REQUEST", response);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   })
  }

  render() {
    const { devpostUrl } = this.state;

    if (devpostUrl) {
      return (
        <Redirect push to={{
          pathname: '/results',
          state: { devpostUrl }
        }}/>
      )
    }

    return (
      <section className="Search">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <h1 className="Search__title">{search.title}</h1>
          </div>
          <Form onFinish={this.handleFinish}>
            <div className="row justify-content-center">
              <div className="col-4">
                <Item name="devpostUrl">
                  <Input
                    size="large"
                    className="Search__input"
                    placeholder="Enter Devpost url"
                  />
                </Item>
              </div>
              <div className="col-1">
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="Search__submit"
                >
                  {search.submit}
                </Button>
              </div>
            </div>
          </Form>
          <div className="Search__loading">
            <img src={spinner} alt="Loading..." className="Search__spinner"/>
          </div>
        </div>
      </section>
    )
  }
}

export default Search;