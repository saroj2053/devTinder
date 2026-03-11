import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not a valid gender`,
        },
    },
    profileAvatarUrl: {
        type: String,
        default: 'https://www.geographyandyou.com/images/user-profile.png',
    },
    about: {
        type: String,
        default: "This is a default about for the user. Please update it to tell others about yourself.",
    },
    skills: {
        type: [String],
    }
}, { timestamps: true });

userSchema.index({ firstName: 1, lastName: 1 });

const User = mongoose.model('User', userSchema);

export default User;