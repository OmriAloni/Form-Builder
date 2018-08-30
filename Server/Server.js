const express = require('express');
const app = express();
// the data base of the forms
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

// to avoid CORS
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

var bodyParser = require('body-parser'); // parse the JSON input
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// sends the forms to the client as result
app.get('/api/forms', (req, res) => {
  res.json(db.forms);
});

// sends last to the client as result
app.get('/api/last', (req, res) => {
    res.json(db.last);
  });

// get a form from the client and adds it to DB. 
//req = new form
app.post('/api/builder', function(req, res) {
  db.forms.push(req.body); // update form in forms arr
  db.last = db.last +1; // +1 to the ID

  res.json("Form added");
})

// get a submited form from the client and adds it to DB. 
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