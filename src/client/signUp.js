import React from 'react'
import {Form, Button , Input, InputNumber} from 'antd'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

class SignUp extends React.Component{
  constructor (props) {
    super(props);
    this.state = {user: undefined}
  }
handleSubmit = values => {
    Axios.post('/api/users', values).then((response) => {
      console.log(response)
      this.props.history.push('/login')
    })
}
  render () {
    return(
      <div>
        <Form.Provider>
          <Form
            layout="inline"
            onFinish={this.handleSubmit}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email'
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  required: true,
                  type: 'number',

                },
              ]}
            >
              <InputNumber/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Kaydet</Button>
            </Form.Item>
          </Form>
        </Form.Provider>
      </div>
    )
  }
}

export default withRouter(SignUp)
