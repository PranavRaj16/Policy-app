import mongoose from "mongoose";

export const Agent = mongoose.model(
  "Agent",
  new mongoose.Schema({ name: { type: String, unique: true } })
);
export const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    dob: Date,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    userType: String,
  })
);
export const Account = mongoose.model(
  "Account",
  new mongoose.Schema({
    name: String,
    type: String,
    userId: mongoose.Schema.Types.ObjectId,
  })
);
export const Carrier = mongoose.model(
  "Carrier",
  new mongoose.Schema({ name: String })
);
export const LOB = mongoose.model("LOB", new mongoose.Schema({ name: String }));
export const Policy = mongoose.model(
  "Policy",
  new mongoose.Schema({
    policyNumber: { type: String, unique: true },
    policyType: String,
    policyMode: Number,
    startDate: Date,
    endDate: Date,
    premiumAmount: Number,
    producer: String,
    csr: String,
    lobId: mongoose.Schema.Types.ObjectId,
    carrierId: mongoose.Schema.Types.ObjectId,
    accountId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
  })
);

export const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    message: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  })
);
