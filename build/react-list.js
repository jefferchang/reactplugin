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
                    nameStyle: null,
                    commentStyle: null,
                    ageStyle: null
                };
            },
            handelCommit:function(e){
                var user = this.props.user;
                if(user.id!=null){
                    this.props.commitEdit(user);
                }else{
                    this.props.commitAdd(user);
                }


            },
            validationState:function(name){
                var obj=eval("this.refs."+name);
                var  length = obj.getValue().length;
                var style = 'danger';
                if (length > 3) style = 'success';
                else if (length >= 2) style = 'warning';
                return style;
            },
            handleChange:function(e){
                var id =e.target.id;
               var style=  this.validationState(id);
                if("name"==id){
                    this.setState({nameStyle: style});
                    this.props.user.name= e.target.value;
                }else if("comment"==id){
                    this.setState({commentStyle: style});
                    this.props.user.comment= e.target.value;
                }else if("age" == id){
                    this.setState({ageStyle: style});
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
                                    bsStyle: this.state.nameStyle, 
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
                                    bsStyle: this.state.commentStyle, 
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
                                    bsStyle: this.state.ageStyle, 
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
            commitEdit:function(user){
                this.props.paramCommitEdit(user);
                this.setState({editShow: false});
            },
            render: function () {
                return (
                    React.createElement("a", {onClick: this.editUser, className: "ButtonCursor"}, "修改", 
                            React.createElement(EditModal, {show: this.state.editShow, onHide: this.editClose, user: this.props.user, commitEdit: this.commitEdit})
                    )
                )
            }
        });

        const DeleteUser = React.createClass({displayName: "DeleteUser",
            deleteUser: function (e) {
                var userId = this.props.userId;
                this.props.paramCommitDelete(userId);
            },
            render: function () {
                return (
                    React.createElement("a", {onClick: this.deleteUser, className: "ButtonCursor"}, "删除")
                )
            }
        });
        const TableInstance = React.createClass({displayName: "TableInstance",
                render: function () {
                    var commitEdit =this.props.paramCommitEdit;
                    var commitDelete = this.props.paramCommitDelete;
                    var listUsers = this.props.data.map(function (user) {
                        return (
                            React.createElement("tr", {key: user.id}, 
                                React.createElement("td", null, user.key), 
                                React.createElement("td", null, user.id), 
                                React.createElement("td", null, user.name), 
                                React.createElement("td", null, user.comment), 
                                React.createElement("td", null, user.age), 
                                React.createElement("td", null, 
                                    React.createElement(EditUser, {user: user, paramCommitEdit: commitEdit}), ",", 
                                    React.createElement(DeleteUser, {userId: user.id, paramCommitDelete: commitDelete})
                                )
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
            render: function () {
                return (
                            React.createElement(TableInstance, {data: this.props.data, paramCommitEdit: this.props.commitEdit, paramCommitDelete: this.props.commitDelete})
                 );
            }
        });

        const AddButton = React.createClass({displayName: "AddButton",
            getInitialState: function () {
                return {editShow: false,user:{}};
            },
            addUser:function(){
                this.setState({editShow: true});
            },
            editClose: function () {
                this.setState({editShow: false});
            },
            commitAdd:function(user){
                this.props.commitAdd(user);
                this.setState({editShow: false});
            },

            render:function(){
                return (
                    React.createElement(ButtonToolbar, null, 
                        React.createElement(Button, {bsStyle: "primary", onClick: this.addUser}, "添加"), 
                        React.createElement(EditModal, {show: this.state.editShow, onHide: this.editClose, user: this.state.user, commitAdd: this.commitAdd})
                    )
                )
            }
        });

        var Panel = ReactBootstrap.Panel;
        const PanelInstance = React.createClass({displayName: "PanelInstance",
                getInitialState: function () {
                    return {data: [],onHide:{},user:{},editShow:false};
                },
                editClose: function () {
                    this.setState({editShow: false});
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
                commitAdd:function(user){
                    var datas = this.state.data;
                    user.id=new Date().getMilliseconds();
                    user.key = new Date().getMilliseconds();
                    datas.push(user);
                    this.setState({data:datas});
                },
                commitEdit:function(usert){
                    var datas=this.state.data;
                    datas.map(function (user) {
                        if(user.id == usert.id){
                            user = usert;
                        }
                    });
                    this.setState({data:datas});
                },
                commitDelete:function(id){
                    var dataUsers =[];
                    this.state.data.map(function (user) {
                        if(user.id != id){
                            dataUsers.push(user);
                        }
                    });
                    this.setState({data:dataUsers});
                },
                componentDidMount: function () {
                    this.loadUsersFromServer();
                },
                render: function () {
                    return (
                        React.createElement(Panel, {header: "用户列表", bsStyle: "primary"}, 
                            React.createElement(UserList, {data: this.state.data, commitEdit: this.commitEdit, commitDelete: this.commitDelete}), 
                            React.createElement(AddButton, {commitAdd: this.commitAdd})
                        )
                    )
                }
            }
        );
        ReactDom.render(React.createElement(PanelInstance, {url: "/api/users.json"}), document.getElementById("app"));
        ReactDom.render(React.createElement(EditModal, {show: this.state.editShow, onHide: this.state.editClose, user: this.state.user}), document.getElementById("modal"));
    }
);
require(["listModule"]);