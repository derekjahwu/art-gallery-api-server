const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors')

let gallery = [
    {
        "title":"The Bookworm",
        "artist":"Carl Spitzweg",
        "date":"1850",
        "link":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Carl_Spitzweg_021.jpg/800px-Carl_Spitzweg_021.jpg",
        "idNum":"1689305359090"
    },
    {
        "title":"Music-making Hermit before his Rocky Abode"
        ,"artist":"Carl Spitzweg"
        ,"date":"1856–1858"
        ,"link":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Musizierender_Einsiedler_vor_seiner_Felsenklause_%28Carl_Spitzweg%29.jpg/1280px-Musizierender_Einsiedler_vor_seiner_Felsenklause_%28Carl_Spitzweg%29.jpg"
        ,"idNum":"1689305402117"
    },
    {
        "title":"Gnome Watching Railway Train"
        ,"artist":"Carl Spitzweg"
        ,"date":"1848",
        "link":"https://upload.wikimedia.org/wikipedia/commons/b/b3/CarlSpitzwegGnomEisenbahnbetrachtend.jpg"
        ,"idNum":"1689305664217"
    },
    {
        "title":"The Serenade",
        "artist":"Carl Spitzweg",
        "date":"1854",
        "link":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Carl_Spitzweg_011.jpg/800px-Carl_Spitzweg_011.jpg",
        "idNum":"1689305708823"
    }
];

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