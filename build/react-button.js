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
        const ButtonsInstance = React.createClass({displayName: "ButtonsInstance",
            handleSelect:function(e) {
                alert('selected ' + e.target.innerHTML);
            },
            render: function() {
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
    }
);
require(["myModule"]);