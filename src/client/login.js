import React from 'react'
import { Comment, Icon, Tooltip, Avatar, Button, Input, notification, List, Form } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import Axios from 'axios'
import Sayfa from './sayfa'


class Login extends React.Component {
    constructor (props) {
        super(props)
        this.State=({ user: undefined })
    }

    handleSubmit = values => {
        Axios.post('/api/login', values).then((response) => {
            console.log(response)
            const id = response.data._id
            this.props.history.push(`/sayfa/${id}`)
        }).catch((response) => {
            notification.error({ message: 'hatalı giriş', description: 'Tekrar deneyin' })
            console.log(response)
        })
    }


    render () {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        }
        return (

            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.handleSubmit}

                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="link" htmlType="button"  >
                            <Link to={'/signUp'}> Sing Up </Link>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default withRouter(Login)
