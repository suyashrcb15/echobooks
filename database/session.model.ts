import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
    userId:          string;
    bookId:          string;
    bookTitle:       string;
    billingPeriod:   string;   // YYYY-MM — for monthly quota tracking
    startedAt:       Date;
    endedAt?:        Date;
    durationSeconds?: number;
    maxMinutes:      number;
    createdAt:       Date;
    updatedAt:       Date;
}

const SessionSchema = new Schema<ISession>(
    {
        userId:          { type: String, required: true, index: true },
        bookId:          { type: String, required: true },
        bookTitle:       { type: String, required: true },
        billingPeriod:   { type: String, required: true, index: true }, // YYYY-MM
        startedAt:       { type: Date,   required: true },
        endedAt:         { type: Date },
        durationSeconds: { type: Number },
        maxMinutes:      { type: Number, required: true },
    },
    { timestamps: true }
);

// Compound index for fast monthly quota lookups
SessionSchema.index({ userId: 1, billingPeriod: 1 });

const Session =
    mongoose.models.Session ||
    mongoose.model<ISession>("Session", SessionSchema);

export default Session;