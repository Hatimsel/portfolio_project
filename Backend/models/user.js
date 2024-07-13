import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema({
    streetNumber: String,
    streetName: String,
    city: String,
    state: String,
    country: String,
    countryCode: String,
    zipcode: String,
    formattedAddress: String,
    latitude: Number,
    longitude: Number,
    provider: String,
});

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['owner', 'customer', 'delivery'], required: true },
    address: addressSchema,
});

const User = mongoose.model('User', userSchema);
export default User;
