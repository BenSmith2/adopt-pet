const mongoose = require('mongoose')
const database = "pets"

mongoose.connect(`mongodb://localhost/${database}`,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>console.log(`Database connection established: ${database}`))
.catch((err)=>console.log('Error ',err));