import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
    name: string;

    email: string;

    password: string;

    isVerified: boolean;

    verificationCode?: string;

    verificationCodeExpiresAt?: Date;

    resetPasswordCode?: string;

    resetPasswordCodeExpiresAt?: Date;

    createdAt: Date;

    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
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
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
        },
        verificationCodeExpiresAt: {
            type: Date,
        },
        resetPasswordCode: {
            type: String,
        },
        resetPasswordCodeExpiresAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({
    createdAt: 1,
    isVerified: 1,
});

const User = mongoose.model<IUser>(
    "User",
    userSchema
);

export default User;