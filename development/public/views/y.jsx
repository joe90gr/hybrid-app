var React = require('../bower_components/react/react');

/** @jsx React.DOM */
module.exports = React.renderComponent(
  React.DOM.h1(null, 'Hello, world!'),
  document.getElementById('example')
);