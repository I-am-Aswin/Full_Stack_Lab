import mongoose from "mongoose";

// User Schema Creation
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: false },
        email: { type: String, required: true, unique: true, lowercase:true, index: true},
        password: { type: String, required: true }
    }, 
    { timestamps: true }
);

// Encrypt password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;