import mongoose from "mongoose";



const contentSchema = new mongoose.Schema({
    roadMapId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'roadmaps',
        required: true
    },
    lessonId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true
    }

})

export default mongoose.model('roadMapContent', contentSchema);