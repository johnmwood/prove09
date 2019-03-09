const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = (process.env.PORT || 8080);

const app = express(); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('start'));
app.post('/display', (req, res) => {
  rate = (weight, type) => {
    rate = 0;

    if (type == "stamped") {
      rate = weight * 0.55; 
    } else if (type == "metered") {
      rate = weight * 0.50; 
    } else if (type == "flats") {
      rate = 1.00 + (weight * 0.15); 
    } else if (type == "first_class") {
      rate = 3.66 + (weight * 0.79); 
    }

    return { rate: rate };
  }

  res.render('display', rate(req.body.weight, req.body.postage_type)); 
}); 

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


