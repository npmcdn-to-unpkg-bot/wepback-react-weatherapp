/** @jsx React.DOM */
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var Hello = require('./Hello')
var parseString = require('xml2js').parseString;






ReactDOM.render(<Hello />, document.getElementById('content'))
var App = React.createClass({
  
  getInitialState: function() {
    return {
      weatherData: [],
      weatherLocation: [],
      weatherDate: []
    }
  },
  
  componentDidMount: function() {
      var th = this;
    this.serverRequest = 
      axios({
      	method: 'GET',
      	url: "weather.xml",
      	headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
        .then(function(resultXml) { 
        	console.log('xml', resultXml);
          var xml = resultXml.data;
          var resultJson = [];
          parseString(xml, function (err, result) {
              console.log('json', result);
              resultJson.push(result)
          });
          console.log('resultJson', resultJson);
          th.setState({
                weatherLocation: resultJson[0]['weather']['loc'][0]['dnam'],
                weatherDate: resultJson[0]['weather']['dayf'][0]['lsup']
          });

        })
  },
  
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  
  render: function() {
    console.log('x', this.state.weatherData)
    console.log('date', this.state.weatherData)
    return (
      <div>

        <h1>weatherData!</h1>

        {/* Don't have an ID to use for the key, URL work ok? */}
        {this.state.weatherLocation.map(function(weather) {
          return (
            <div key={weather} className="weather">
            {weather}
            </div>
          );
        })}
        {this.state.weatherDate.map(function(weather) {
          return (
            <div key={weather} className="weather">
            {weather}
            </div>
          );
        })}
      </div>
    )
  }
});

ReactDOM.render(<App />, document.getElementById('content'));






