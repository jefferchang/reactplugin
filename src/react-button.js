require.config({
    paths: {
        "react-bootstrap": "./../bower_components/react-bootstrap/react-bootstrap",
        "react": "./../bower_components/react/react",
        "react-dom": "./../bower_components/react/react-dom"
    }
});
define('myModule', ['react-bootstrap','react','react-dom'], function(ReactBootstrap,React,ReactDom) {
        var ButtonToolbar = ReactBootstrap.ButtonToolbar;
        var Button = ReactBootstrap.Button;
        const ButtonsInstance = React.createClass({
            handleSelect:function(e) {
                alert('selected ' + e.target.innerHTML);
            },
            render: function() {
                return (
                    <ButtonToolbar>
                        <Button onClick={this.handleSelect} >Default</Button>
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
    }
);
require(["myModule"]);