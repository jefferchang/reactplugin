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

        const ButtonsInstance = React.createClass({
            handleSelect: function (e) {
                var Alert = ReactBootstrap.Alert;

                const AlertInstance = React.createClass({
                        render: function () {
                            return (
                              <Alert bsStyle="warning">
                                        <strong>you click  !</strong> {e.target.innerHTML}
                              </Alert>
                            ) ;
                        }
                    }
                );
                ReactDom.render(<AlertInstance />, document.getElementById("tips"));
            },
            render: function () {
                return (
                    <ButtonToolbar>
                        <Button onClick={this.handleSelect}>Default</Button>
                        <Button bsStyle="primary" onClick={this.handleSelect}>Primary</Button>
                        <Button bsStyle="success" onClick={this.handleSelect}>Success</Button>
                        <Button bsStyle="info" onClick={this.handleSelect}>Info</Button>
                        <Button bsStyle="warning" onClick={this.handleSelect}>Warning</Button>
                        <Button bsStyle="danger" onClick={this.handleSelect}>Danger</Button>
                        <Button bsStyle="link" onClick={this.handleSelect}>Link</Button>
                    </ButtonToolbar>
                );
            }
        });
        ReactDom.render(<ButtonsInstance/>, document.getElementById("app"));

        var Dropdown = ReactBootstrap.Dropdown;
        var Glyphicon = ReactBootstrap.Glyphicon;
        var MenuItem = ReactBootstrap.MenuItem;
        const DropdownInstance = React.createClass({
                handleSelect: function (e) {
                    alert(1);
                },
                render: function () {
                    return (
                        <ButtonToolbar>
                            <Dropdown id="dropdown-custom-1">
                                <Dropdown.Toggle>
                                    <Glyphicon glyph="star"/>
                                    Pow! Zoom!
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="super-colors">
                                    <MenuItem eventKey="1">Action</MenuItem>
                                    <MenuItem eventKey="2">Another action</MenuItem>
                                    <MenuItem eventKey="3" active>Active Item</MenuItem>
                                    <MenuItem divider/>
                                    <MenuItem eventKey="4">Separated link</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown id="dropdown-custom-2">
                                <Button bsStyle="info">
                                    mix it up style-wise
                                </Button>
                                <Dropdown.Toggle bsStyle="success"/>
                                <Dropdown.Menu className="super-colors">
                                    <MenuItem eventKey="1">Action</MenuItem>
                                    <MenuItem eventKey="2">Another action</MenuItem>
                                    <MenuItem eventKey="3" active>Active Item</MenuItem>
                                    <MenuItem divider/>
                                    <MenuItem eventKey="4">Separated link</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                    );
                }
            }
        );
        ReactDom.render(<DropdownInstance/>, document.getElementById("app1"));


        debugger;
        var Navbar = ReactBootstrap.Navbar;
         var Nav = ReactBootstrap.Nav;
        var NavItem = ReactBootstrap.NavItem;
        var NavDropdown = ReactBootstrap.NavDropdown;
        const NavbarInstance = React.createClass({
            render:function(){
                return (
                    <Navbar inverse>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">React-Bootstrap</a>
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem eventKey={1} href="#">Link</NavItem>
                                <NavItem eventKey={2} href="#">Link</NavItem>
                                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1}>Action</MenuItem>
                                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                                </NavDropdown>
                            </Nav>
                            <Nav pullRight>
                                <NavItem eventKey={1} href="#">Link Right</NavItem>
                                <NavItem eventKey={2} href="#">Link Right</NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
            }
        }
        );
        ReactDom.render(<NavbarInstance />, document.getElementById("app2"));
    }
);
require(["buttonModule"]);