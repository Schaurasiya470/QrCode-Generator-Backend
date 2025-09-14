const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const intPortNo = 5000;

/*================== Database Connection ===============================*/
var mongoURL = "mongodb+srv://schaurasiya470:Sachin%40%40123@cluster0.ipknxsr.mongodb.net/QrCodeGeneratorApp?retryWrites=true&w=majority&appName=Cluster0" ;
mongoose.connect(mongoURL, {useNewUrlParser: true,useUnifiedTopology:true})

const con = mongoose.connection

con.on('connected', () => {
    console.log('Qr Generator DB Connected Successfully...');
})
/*================== Database Connection End ============================*/

/*========================= All Routes ===============================*/

const cardRouter = require("./routes/card.router.js");
const generateCardRouter = require("./routes/generate.card.router.js");

app.get('/', (req, res) => res.send('Server is working !' + intPortNo));
app.use('/get-card', cardRouter);
app.use('/generate-card', generateCardRouter);

/*========================= All Routes End ===============================*/


app.listen(intPortNo, () => console.log(`Server running on http://localhost:${intPortNo}`));
