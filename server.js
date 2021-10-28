const x=require('express'); const y=x();  y.use(x.static('build')); y.use(x.json());

const z=require('mongoose');
const uri=process.env.MONGODB_URI;
const port=process.env.PORT || 4000;
z.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},{collection:"goodreads"}).then(d=>console.log("connected to dbs")).catch(d=>console.log("error in connecting to database"));

const sc=new z.Schema({quote:{type:String,required:true}}); const mo=z.model('new',sc);

y.get('/getall',async(a,b)=>{const g=await mo.find();b.json({arr:g}); });

y.post('/save',async (a,b)=>{const g=new mo({quote:a.body.q}); await g.save();b.json({ok:"Content saved..."});});

y.get('/hmm',async(a,b)=>{const g=await mo.find();b.send(`<html><body><h1>${g}</h1></body></html>`);} );

y.listen(port,()=>console.log('port running'));
