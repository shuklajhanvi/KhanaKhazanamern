const mongoose=require('mongoose');
const mongoURI='mongodb+srv://khana:VbNTtBV8r9pzPxZa@cluster0.6vt1xay.mongodb.net/mernpro?retryWrites=true&w=majority'
const mongodb =async()=>{
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err)
            console.log("---", err);
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("fooditem");
            fetched_data.find({}).toArray(function (err, data) {
                const foodCategory = mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err)
                        console.log(err);

                    else {
                        global.fooditem = data;
                        global.foodCategory = catData;

                    }

                });

            });
        }
    });
}
module.exports=mongodb;

