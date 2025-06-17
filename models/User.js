const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
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
      validate: [validator.isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator(el) {
          return el === this.password;
        },
        message: 'Passwords do not match',
      },
    },

    role: {
      type: String,
      enum: ['student', 'admin', 'content manager', 'academy'],
      default: 'student',
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    tookQuestionnaire: {
      type: Boolean,
      default: false,
    },
    locations: [String],

    image: String,
    phoneNumber: String,
    isRevoked: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model('User', userSchema);
