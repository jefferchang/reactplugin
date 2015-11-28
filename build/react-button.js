require.config({
    paths: {
        "react-bootstrap": "./../bower_components/react-bootstrap/react-bootstrap",
        "react": "./../bower_components/react/react",
        "react-dom": "./../bower_components/react/react-dom"
    }
});
define('myModule', ['react-bootstrap', 'react', 'react-dom'], function (ReactBootstrap, React, ReactDom) {
        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var Button = ReactBootstrap.Button;

        const ButtonsInstance = React.createClass({displayName: "ButtonsInstance",
            handleSelect: function (e) {
                var Alert = ReactBootstrap.Alert;

                const AlertInstance = React.createClass({displayName: "AlertInstance",
                        render: function () {
                            return (
                              React.createElement(Alert, {bsStyle: "warning"}, 
                                        React.createElement("strong", null, "you click  !"), " ", e.target.innerHTML
                              )
                            ) ;
                        }
                    }
                );
                ReactDom.render(React.createElement(AlertInstance, null), document.getElementById("tips"));
            },
            render: function () {
                return (
                    React.createElement(ButtonToolbar, null, 
                        React.createElement(Button, {onClick: this.handleSelect}, "Default"), 
                        React.createElement(Button, {bsStyle: "primary", onClick: this.handleSelect}, "Primary"), 
                        React.createElement(Button, {bsStyle: "success", onClick: this.handleSelect}, "Success"), 
                        React.createElement(Button, {bsStyle: "info", onClick: this.handleSelect}, "Info"), 
                        React.createElement(Button, {bsStyle: "warning", onClick: this.handleSelect}, "Warning"), 
                        React.createElement(Button, {bsStyle: "danger", onClick: this.handleSelect}, "Danger"), 
                        React.createElement(Button, {bsStyle: "link", onClick: this.handleSelect}, "Link")
                    )
                );
            }
        });
        ReactDom.render(React.createElement(ButtonsInstance, null), document.getElementById("app"));

        debugger;
        var Dropdown = ReactBootstrap.Dropdown;
        var Glyphicon = ReactBootstrap.Glyphicon;
        var MenuItem = ReactBootstrap.MenuItem;

        const DropdownInstance = React.createClass({displayName: "DropdownInstance",
                handleSelect: function (e) {
                    alert(1);
                },
                render: function () {
                    return (
                        React.createElement(ButtonToolbar, null, 
                            React.createElement(Dropdown, {id: "dropdown-custom-1"}, 
                                React.createElement(Dropdown.Toggle, null, 
                                    React.createElement(Glyphicon, {glyph: "star"}), 
                                    "Pow! Zoom!"
                                ), 
                                React.createElement(Dropdown.Menu, {className: "super-colors"}, 
                                    React.createElement(MenuItem, {eventKey: "1"}, "Action"), 
                                    React.createElement(MenuItem, {eventKey: "2"}, "Another action"), 
                                    React.createElement(MenuItem, {eventKey: "3", active: true}, "Active Item"), 
                                    React.createElement(MenuItem, {divider: true}), 
                                    React.createElement(MenuItem, {eventKey: "4"}, "Separated link")
                                )
                            ), 

                            React.createElement(Dropdown, {id: "dropdown-custom-2"}, 
                                React.createElement(Button, {bsStyle: "info"}, 
                                    "mix it up style-wise"
                                ), 
                                React.createElement(Dropdown.Toggle, {bsStyle: "success"}), 
                                React.createElement(Dropdown.Menu, {className: "super-colors"}, 
                                    React.createElement(MenuItem, {eventKey: "1"}, "Action"), 
                                    React.createElement(MenuItem, {eventKey: "2"}, "Another action"), 
                                    React.createElement(MenuItem, {eventKey: "3", active: true}, "Active Item"), 
                                    React.createElement(MenuItem, {divider: true}), 
                                    React.createElement(MenuItem, {eventKey: "4"}, "Separated link")
                                )
                            )
                        )
                    );
                }
            }
        );
        ReactDom.render(React.createElement(DropdownInstance, null), document.getElementById("app1"));
    }
);
require(["myModule"]);