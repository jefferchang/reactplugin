require.config({
    paths: {
        "react-bootstrap": "./../bower_components/react-bootstrap/react-bootstrap",
        "react": "./../bower_components/react/react",
        "react-dom": "./../bower_components/react/react-dom",
        "jquery": "./../bower_components/jquery/dist/jquery"
    }
});
define('listModule', ['react-bootstrap', 'react', 'react-dom', 'jquery'], function (ReactBootstrap, React, ReactDom, $) {
        var Table = ReactBootstrap.Table;
        var Modal = ReactBootstrap.Modal;
        var Button = ReactBootstrap.Button;
        var ButtonToolbar =ReactBootstrap.ButtonToolbar;
        var Input =ReactBootstrap.Input;
        const EditModal = React.createClass({
            getInitialState() {
                return {
                    style: null
                };
            },
            handelCommit:function(e){
                this.props;
            },
            validationState:function(name){
                var obj=eval("this.refs."+name);
                var  length = obj.getValue().length;
                var style = 'danger';
                if (length > 3) style = 'success';
                else if (length >= 2) style = 'warning';
                return { style };
            },
            handleChange:function(e){
                var id =e.target.id;
               var style=  this.validationState(id);
                this.setState(style);
                if("name"==id){
                    this.props.user.name= e.target.value;
                }else if("comment"==id){
                    this.props.user.comment= e.target.value;
                }else if("age" == id){
                    this.props.user.age= e.target.value;
                }
            },
            render() {
                return (
                    <Modal  {...this.props} bsSize="large" backdrop="static" aria-labelledby="contained-modal-title-lg">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">修改用户</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form  className="form-horizontal" onSubmit={this.handleSubmit}>
                                <Input
                                    type="text"
                                    ref="name"
                                    id="name"
                                    labelClassName="col-xs-2"
                                    wrapperClassName="col-xs-10"
                                    label="姓名："
                                    bsStyle={this.state.style}
                                    placeholder="Your name"
                                    value={this.props.user.name}
                                    onChange={this.handleChange}
                                    />
                                {' '}
                                <Input
                                    type="text"
                                    id="comment"
                                    ref="comment"
                                    labelClassName="col-xs-2"
                                    wrapperClassName="col-xs-10"
                                    label="说明："
                                    bsStyle={this.state.style}
                                    placeholder="Say something..."
                                    value={this.props.user.comment}
                                    onChange={this.handleChange}
                                    />
                                <Input
                                    type="text"
                                    id="age"
                                    ref="age"
                                    labelClassName="col-xs-2"
                                    wrapperClassName="col-xs-10"
                                    label="备注："
                                    bsStyle={this.state.style}
                                    placeholder="Say something..."
                                    value={this.props.user.age}
                                    onChange={this.handleChange}
                                    />
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonToolbar>
                                <Button bsStyle="primary" onClick={this.handelCommit} >提交</Button>
                                <Button onClick={this.props.onHide}>Close</Button>
                            </ButtonToolbar>
                        </Modal.Footer>
                    </Modal>
                );
            }
        });

        const EditUser = React.createClass({
            getInitialState: function () {
                return {editShow: false};
            },
            editClose: function () {
                this.setState({editShow: false});
            },
            editUser: function (e) {
                this.setState({editShow: true});
            },
            render: function () {
                return (
                    ReactDom.render(<EditModal show={this.state.editShow} onHide={this.editClose} user={this.props.user}/>, document.getElementById("modal")),
                    <a onClick={this.editUser} className="ButtonCursor">修改</a>
                )
            }
        });

        const DeleteUser = React.createClass({
            deleteUser: function (e) {
                debugger;
                var userId = this.props.userId;

            },
            render: function () {
                return (
                    <a onClick={this.deleteUser} className="ButtonCursor">删除</a>
                )
            }
        });


        const TableInstance = React.createClass({
                render: function () {
                    var listUsers = this.props.data.map(function (user) {
                        return (
                            <tr key={user.id}>
                                <td>{user.key}</td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.comment}</td>
                                <td>{user.age}</td>
                                <td><EditUser user={user}/>,<DeleteUser userId={user.id}/></td>
                            </tr>
                        );
                    });
                    return (
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>id</th>
                                <th>姓名</th>
                                <th>备注</th>
                                <th>年龄</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listUsers}
                            </tbody>
                        </Table>
                    )
                }
            }
        );
        const UserList = React.createClass({
            getInitialState: function () {
                return {data: []};
            },
            loadUsersFromServer: function () {
                $.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                        this.setState({data: data});
                    }.bind(this),
                    error: function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
            },
            componentDidMount: function () {
                this.loadUsersFromServer();
            },
            render: function () {
                return (
                    <TableInstance data={this.state.data}/>
                );
            }
        });


        var Panel = ReactBootstrap.Panel;
        const PanelInstance = React.createClass({
                render: function () {
                    return (
                        <Panel header="用户列表" bsStyle="primary">
                            <UserList url="/api/users.json"/>
                        </Panel>
                    )
                }
            }
        );
        ReactDom.render(<PanelInstance />, document.getElementById("app"));
    }
);
require(["listModule"]);