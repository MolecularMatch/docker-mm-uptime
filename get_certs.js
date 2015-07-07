//Download the cert/key/password from our etcd server
var http = require('http')
var fs = require('fs')
var async = require('async')

var variables = []
async.series([
        function(callback) {
            http.get('http://' + process.env.ETCD_HOST + ':' + process.env.ETCD_PORT + '/v2/keys/uptime_username', function(response) {
                // Continuously update stream with data
                var body = ''
                response.on('data', function(d) {
                    body += d
                })
                response.on('end', function() {
                    // Data reception is done, do whatever with it!
                    var parsed = JSON.parse(body)
                    variables.push('export USERNAME=' + parsed.node.value)
                })
            }).on('error', function(err) {
                callback(err)
            })
        },
        function(callback) {
            http.get('http://' + process.env.ETCD_HOST + ':' + process.env.ETCD_PORT + '/v2/keys/uptime_password', function(response) {
                // Continuously update stream with data
                var body = ''
                response.on('data', function(d) {
                    body += d
                })
                response.on('end', function() {
                    // Data reception is done, do whatever with it!
                    var parsed = JSON.parse(body)
                    variables.push('export PASSWORD=' + parsed.node.value)
                })
            }).on('error', function(err) {
                callback(err)
            })
        },
        function(callback) {
            http.get('http://' + process.env.ETCD_HOST + ':' + process.env.ETCD_PORT + '/v2/keys/uptime_email_username', function(response) {
                // Continuously update stream with data
                var body = ''
                response.on('data', function(d) {
                    body += d
                })
                response.on('end', function() {
                    // Data reception is done, do whatever with it!
                    var parsed = JSON.parse(body)
                    variables.push('export EMAIL_USERNAME=' + parsed.node.value)
                })
            }).on('error', function(err) {
                callback(err)
            })
        },
        function(callback) {
            http.get('http://' + process.env.ETCD_HOST + ':' + process.env.ETCD_PORT + '/v2/keys/uptime_email_password', function(response) {
                // Continuously update stream with data
                var body = ''
                response.on('data', function(d) {
                    body += d
                })
                response.on('end', function() {
                    // Data reception is done, do whatever with it!
                    var parsed = JSON.parse(body)
                    variables.push('export EMAIL_PASSWORD=' + parsed.node.value)
                })
            }).on('error', function(err) {
                callback(err)
            })
        }
    ],
    function(err) {
        if (err) console.log(err)

        //Write the environment file
        var fileContents = variables.join('\n')
        fs.writeFile('/tmp/variables', fileContents, function(err) {
            if (err) console.log(err)
            process.exit()
        })
    })