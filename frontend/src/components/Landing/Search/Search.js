import React, { Component } from 'react';
import './Search.scss';
import content from '../../../content';
import { Input, Button, Form, Alert } from 'antd';
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
    isLoading: false,
    errorMessage: ""
  }

  handleFinish = values => {
    const { devpostUrl } = values;
    
    if (devpostUrl) {
      this.setState({ isLoading: true });

      axios.post(`${BASE_URL}/devpost`, {
        link: devpostUrl
      })
        .then(response => {
          console.log("GOT RESPONSE FROM POST REQUEST", response);
          const { data: { data, status, message } } = response;
          
          if (status === "fail") {
            Promise.reject();
            this.setState({ errorMessage: message });
          } else {
            this.setState({
              data,
              errorMessage: ""
            });
          };

          this.setState({ isLoading: false });
        })
        .catch(error => {
          console.error(error);
          this.setState({ isLoading: false });
        })
    }

  }

  handleErrorMessageClose = e => {
    this.setState({ errorMessage: "" });
  }

  render() {
    const { data, isLoading, errorMessage } = this.state;

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
            {isLoading && <img src={spinner} alt="Loading..." className="Search__spinner"/>}
            {errorMessage && !isLoading &&
              <div className="row justify-content-center">
                <div className="col-4">
                  <Alert
                    className="Search__alert"
                    message={errorMessage}
                    type="warning"
                    closable
                    onClose={this.handleErrorMessageClose}
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    )
  }
}

export default Search;