import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    picture: {
      type: String,
    },
    targetedRoles: {
      type: [String],
      default: [],
    },
    linkedIn: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model('User', userSchema)
