const mongoose = require('mongoose');
hi

const PriceSchema = new mongoose.Schema({

    price: {
        type: Number,
        required: true,
    },
    ExperienceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'partner'
    },
    PartnerId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'partner'
    }],
})
const Price = mongoose.model('price', PriceSchema);
module.exports = Price;
