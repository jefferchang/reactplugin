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

        const EditUser =React.createClass({
            editUser:function(e){
                alert("修改");
             },
            render:function(){
                return (
                    <a onClick={this.editUser} className="ButtonCursor">修改</a>
                )
            }
        });

    const DeleteUser = React.createClass({
        deleteUser:function(e){
            alert("删除信息");
        },
        render:function(){
            return (
                  <a  onClick={this.deleteUser}  className="ButtonCursor" >删除</a>
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
                                <td><EditUser/>,<DeleteUser/></td>
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
            getInitialState : function () {
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
                        <Panel  header="用户列表" bsStyle="primary">
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