const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')

let gallery = [];

class Painting {
    constructor(title, artist, date, link, idNum) {
        this.title = title,
        this.artist = artist,
        this.date = date,
        this.link = link,
        this.idNum = String(Date.now())
    }
}

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/painting', (req, res) => {
    const painting = req.body;
    const newPainting = new Painting(painting.title, painting.artist, painting.date, painting.link)

    gallery.push(newPainting)

    console.log(`Painting added to Gallery`);
    res.redirect("https://radiant-halva-2cca42.netlify.app/paintings-list.html")
})

app.get('/gallery/:idNum', (req,res) => {
    const idNum = req.params.idNum;
    for(let i=0; i<gallery.length; i++) {
        if(gallery[i].idNum === idNum) {
            res.send(gallery[i]);
        }
    }
    res.status(404).send('Painting Not Found')
})

app.delete('/gallery/:idNum', (req,res) => {
    const idNum = req.params.idNum;
    gallery = gallery.filter(i => {
        if (i.idNum !== idNum) {
            return true;
        }
        return false;
    });

    res.send('https://radiant-halva-2cca42.netlify.app/paintings-list.html')
});

app.post('/gallery/:idNum', (req,res) => {
    const idNum = req.params.idNum;
    const newPainting = req.body;

    for(let i=0; i<gallery.length; i++) {
        let painting = gallery[i]
        if(painting.idNum === idNum) {
            gallery[i] = newPainting;
        }
    }

    res.redirect('https://radiant-halva-2cca42.netlify.app/paintings-list.html')
})

app.get('/gallery', (req,res) => {
res.send(gallery)
})

app.listen(process.env.PORT || 3000, () => console.log(`Gallery is now live`))