require.config({
    paths: {
        "react-bootstrap": "./../bower_components/react-bootstrap/react-bootstrap",
        "react": "./../bower_components/react/react",
        "react-dom": "./../bower_components/react/react-dom"
    }
});
define('buttonModule', ['react-bootstrap', 'react', 'react-dom'], function (ReactBootstrap, React, ReactDom) {
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


        debugger;
        var Navbar = ReactBootstrap.Navbar;
         var Nav = ReactBootstrap.Nav;
        var NavItem = ReactBootstrap.NavItem;
        var NavDropdown = ReactBootstrap.NavDropdown;
        const NavbarInstance = React.createClass({displayName: "NavbarInstance",
            render:function(){
                return (
                    React.createElement(Navbar, {inverse: true}, 
                        React.createElement(Navbar.Header, null, 
                            React.createElement(Navbar.Brand, null, 
                                React.createElement("a", {href: "#"}, "React-Bootstrap")
                            ), 
                            React.createElement(Navbar.Toggle, null)
                        ), 
                        React.createElement(Navbar.Collapse, null, 
                            React.createElement(Nav, null, 
                                React.createElement(NavItem, {eventKey: 1, href: "#"}, "Link"), 
                                React.createElement(NavItem, {eventKey: 2, href: "#"}, "Link"), 
                                React.createElement(NavDropdown, {eventKey: 3, title: "Dropdown", id: "basic-nav-dropdown"}, 
                                    React.createElement(MenuItem, {eventKey: 3.1}, "Action"), 
                                    React.createElement(MenuItem, {eventKey: 3.2}, "Another action"), 
                                    React.createElement(MenuItem, {eventKey: 3.3}, "Something else here"), 
                                    React.createElement(MenuItem, {divider: true}), 
                                    React.createElement(MenuItem, {eventKey: 3.3}, "Separated link")
                                )
                            ), 
                            React.createElement(Nav, {pullRight: true}, 
                                React.createElement(NavItem, {eventKey: 1, href: "#"}, "Link Right"), 
                                React.createElement(NavItem, {eventKey: 2, href: "#"}, "Link Right")
                            )
                        )
                    )
                )
            }
        }
        );
        ReactDom.render(React.createElement(NavbarInstance, null), document.getElementById("app2"));
    }
);
require(["buttonModule"]);