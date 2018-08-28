const express = require('express');
const app = express();

// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// app.post('../src/component/Home', function(req,res){
//   cnsole.log(req.body);

//   var form = {
//       formID: req.body.formID,
//       formName: req.body.formName,
//       numOfSubmissions: req.body.numOfSubmissions,
//       labels: req.body.labels,
//       submits: req.body.submits
//   };
//   res.send(form);
//   res.end();
// });



app.get('/api/forms', (req, res) => {
  const forms = [
    {
      formID: 0,
      formName: 'Job Application',
      numOfSubmissions: 0,
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
          }
      ],
      submits: [
          {
              submitID: 0,
              inputs: ['shabi','alonso']
          },
          {
              submitID: 1,
              inputs: ['omrikso','the king']
          }
      ]

  },
  {
      formID: 1,
      formName: 'Sexsuality',
      numOfSubmissions: 0,
      labels: [
          {
              inputName: 'SEX',
              inputFieldLabel: 'male',
              inputType: 'text'
          },
          {
              inputName: 'position',
              inputFieldLabel: 'doggy',
              inputType: 'text'
          }
      ],
      submits: [
          {
              submitID: 0,
              inputs: ['male','doggy']
          },
          {
              submitID: 1,
              inputs: ['female','missionre']
          }
      ]
  }

  ];

  res.json(forms);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);