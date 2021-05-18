const express = require('express')
const app = express()
const port = 3000

var NodeWebcam = require( "node-webcam" );

var opts = {
    width: 1280,
    height: 720,
    quality: 80,
    frames: 1,
    delay: 0,
    saveShots: false,
    output: "jpeg",
    device: '/dev/video0',
    callbackReturn: "base64",
    verbose: false
};

var Webcam = NodeWebcam.create( opts );

Webcam.list(function(list) {
    console.log(list)
});


app.get('/getsnap', (req, res) => {
    Webcam.capture( "test_picture", function( err, data ) {
        var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
        var img = Buffer.from(base64Data, 'base64');
        
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });

        res.end(img);

    });
    
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

