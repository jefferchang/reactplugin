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
        const EditModal = React.createClass({displayName: "EditModal",
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
                    React.createElement(Modal, React.__spread({},   this.props, {bsSize: "large", backdrop: "static", "aria-labelledby": "contained-modal-title-lg"}), 
                        React.createElement(Modal.Header, {closeButton: true}, 
                            React.createElement(Modal.Title, {id: "contained-modal-title-lg"}, "修改用户")
                        ), 
                        React.createElement(Modal.Body, null, 
                            React.createElement("form", {className: "form-horizontal", onSubmit: this.handleSubmit}, 
                                React.createElement(Input, {
                                    type: "text", 
                                    ref: "name", 
                                    id: "name", 
                                    labelClassName: "col-xs-2", 
                                    wrapperClassName: "col-xs-10", 
                                    label: "姓名：", 
                                    bsStyle: this.state.style, 
                                    placeholder: "Your name", 
                                    value: this.props.user.name, 
                                    onChange: this.handleChange}
                                    ), 
                                ' ', 
                                React.createElement(Input, {
                                    type: "text", 
                                    id: "comment", 
                                    ref: "comment", 
                                    labelClassName: "col-xs-2", 
                                    wrapperClassName: "col-xs-10", 
                                    label: "说明：", 
                                    bsStyle: this.state.style, 
                                    placeholder: "Say something...", 
                                    value: this.props.user.comment, 
                                    onChange: this.handleChange}
                                    ), 
                                React.createElement(Input, {
                                    type: "text", 
                                    id: "age", 
                                    ref: "age", 
                                    labelClassName: "col-xs-2", 
                                    wrapperClassName: "col-xs-10", 
                                    label: "备注：", 
                                    bsStyle: this.state.style, 
                                    placeholder: "Say something...", 
                                    value: this.props.user.age, 
                                    onChange: this.handleChange}
                                    )
                            )
                        ), 
                        React.createElement(Modal.Footer, null, 
                            React.createElement(ButtonToolbar, null, 
                                React.createElement(Button, {bsStyle: "primary", onClick: this.handelCommit}, "提交"), 
                                React.createElement(Button, {onClick: this.props.onHide}, "Close")
                            )
                        )
                    )
                );
            }
        });

        const EditUser = React.createClass({displayName: "EditUser",
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
                    ReactDom.render(React.createElement(EditModal, {show: this.state.editShow, onHide: this.editClose, user: this.props.user}), document.getElementById("modal")),
                    React.createElement("a", {onClick: this.editUser, className: "ButtonCursor"}, "修改")
                )
            }
        });

        const DeleteUser = React.createClass({displayName: "DeleteUser",
            deleteUser: function (e) {
                debugger;
                var userId = this.props.userId;

            },
            render: function () {
                return (
                    React.createElement("a", {onClick: this.deleteUser, className: "ButtonCursor"}, "删除")
                )
            }
        });


        const TableInstance = React.createClass({displayName: "TableInstance",
                render: function () {
                    var listUsers = this.props.data.map(function (user) {
                        return (
                            React.createElement("tr", {key: user.id}, 
                                React.createElement("td", null, user.key), 
                                React.createElement("td", null, user.id), 
                                React.createElement("td", null, user.name), 
                                React.createElement("td", null, user.comment), 
                                React.createElement("td", null, user.age), 
                                React.createElement("td", null, React.createElement(EditUser, {user: user}), ",", React.createElement(DeleteUser, {userId: user.id}))
                            )
                        );
                    });
                    return (
                        React.createElement(Table, {striped: true, bordered: true, condensed: true, hover: true}, 
                            React.createElement("thead", null, 
                            React.createElement("tr", null, 
                                React.createElement("th", null, "#"), 
                                React.createElement("th", null, "id"), 
                                React.createElement("th", null, "姓名"), 
                                React.createElement("th", null, "备注"), 
                                React.createElement("th", null, "年龄"), 
                                React.createElement("th", null, "操作")
                            )
                            ), 
                            React.createElement("tbody", null, 
                            listUsers
                            )
                        )
                    )
                }
            }
        );
        const UserList = React.createClass({displayName: "UserList",
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
                    React.createElement(TableInstance, {data: this.state.data})
                );
            }
        });


        var Panel = ReactBootstrap.Panel;
        const PanelInstance = React.createClass({displayName: "PanelInstance",
                render: function () {
                    return (
                        React.createElement(Panel, {header: "用户列表", bsStyle: "primary"}, 
                            React.createElement(UserList, {url: "/api/users.json"})
                        )
                    )
                }
            }
        );
        ReactDom.render(React.createElement(PanelInstance, null), document.getElementById("app"));
    }
);
require(["listModule"]);