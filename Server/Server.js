const express = require('express');
const app = express();
const db ={
            last : 2,
            forms : [
              {
                formID: 0,
                formName: 'Task Feedback',
                numOfSubmissions: 2,
                labels: [
                    {
                        inputName: 'First name',
                        inputFieldLabel: 'Omri',
                        inputType: 'text'
                    },
                    {
                        inputName: 'Last Name',
                        inputFieldLabel: 'Alon',
                        inputType: 'text'
                    },
                    {
                        inputName: 'E-Mail',
                        inputFieldLabel: 'omrialon18@gmail.com',
                        inputType: 'email'
                    }

                ],
                submits: [
                    {
                        submitID: 0,
                        inputs: ['Aviran','Huga','aviranhuja@gmail.com']
                    },
                    {
                        submitID: 1,
                        inputs: ['Gal','Abarmovitz','galabra@gmail.com']
                    }
                ]

            },
            {
                formID: 1,
                formName: 'Job Application',
                numOfSubmissions: 2,
                labels: [
                    {
                        inputName: 'First Name',
                        inputFieldLabel: 'Omri',
                        inputType: 'text'
                    },
                    {
                        inputName: 'Last Name',
                        inputFieldLabel: 'Alon',
                        inputType: 'text'
                    },
                    {
                        inputName: 'Lucky number',
                        inputFieldLabel: 7,
                        inputType: 'number'
                    }
                ],
                submits: [
                    {
                        submitID: 0,
                        inputs: ['Dor','Gal',10]
                    },
                    {
                        submitID: 1,
                        inputs: ['Amit','Marx',2]
                    }
                ]
            }

            ]
          }


app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/forms', (req, res) => {
  res.json(db.forms);
});

app.get('/api/last', (req, res) => {
    res.json(db.last);
  });

app.post('/api/builder', function(req, res) {
  db.forms.push(req.body);
  db.last = db.last +1;

  res.json("Form added");
  
})

app.post('/api/submit',(req,res) =>{
  for (var i = 0; i < db.forms.length; i++) {
    var db_id = db.forms[i].formID;
    if (req.body.formID === db_id)
    {
      db.forms[db_id] = req.body;
      break;
    }
  }
  res.json("submit added");
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);