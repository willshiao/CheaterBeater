import React, { Component } from 'react';
import './Search.scss';
import content from '../../../content';
import { Input, Button, Form } from 'antd';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../../shared/constants';
import axios from 'axios';
import spinner from '../../../assets/imgs/spinner.svg';
import { codeData } from '../../../mocks';

const { search } = content;
const { Item } = Form;

class Search extends Component {
  state = {
    data: null,
    isLoading: false
  }

  handleFinish = values => {
    const { devpostUrl } = values;
    
    if (devpostUrl) {
      this.setState({ data: codeData });

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

  }

  render() {
    const { data, isLoading } = this.state;

    if (data) {
      return (
        <Redirect push to={{
          pathname: '/results',
          state: { data }
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
            {!isLoading && <img src={spinner} alt="Loading..." className="Search__spinner"/>}
          </div>
        </div>
      </section>
    )
  }
}

export default Search;