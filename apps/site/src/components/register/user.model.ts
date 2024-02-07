import mongoose from 'mongoose'
// eslint-disable-line

export interface UserDocument extends mongoose.Document {
  // ... (existing fields)
  favoriteHero?: string;
  gender:string;
  
}
export interface UserDocument extends mongoose.Document {
  fullName: {
    firstName: string
    lastName: string
  }
  email: string
  password: string
  isConfirmed: boolean
  
  resetLink: string
  avatar: string
  phoneNumber: string 
  favoriteHero?: string;
  gender:string;
  state: string, // Include the selected state
  location: string, // Include the selected location
  designType:string,
  selectedTools: String,
  file1?: string;
  file2?: string;
  file3?: string;
  portfolioLink?: string;

selectedSkills: String,

certificationName: String,

institutionName: String,


  cloudinary_id: string
  role: {
    isCandidate: boolean
    isEmployer: boolean
    isAdmin: boolean
  }
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}
const bcrypt = require('bcrypt');
// or for ES6 modules
// import bcrypt from 'bcrypt';

// export interface UpdateUserDocument extends mongoose.Document {
//   phoneNumber: string
//   aboutMe: string
// }

export const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
    },
    phoneNumber: {
      type: String, // Assuming phoneNumber is a string
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    resetLink: {
      data: String,
      default: '',
    },
    avatar: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    
 

  gender:{
    type:String,
  },  
    role: {
      isCandidate: {
        type: Boolean,
      },
      isEmployer: {
        type: Boolean,
      },
      isAdmin: {
        type: Boolean,
      },
    },
  },
  
  {
    timestamps: true,
  }
)

const updateUserSchema = new mongoose.Schema({
  phone_number: {
    type: String,
   },
 aboutMe: {
    type: String,
  },
 gender: {
    type: String,
    
},
state: {
  type: String,
  
},
location: {
  type: String,
  
},
designType: {
  type: String,
  
},
selectedTools: {
  type: String,
},
selectedSkills: {
type: String,
},
certificationName: {
type: String,
},
institutionName: {
type: String,
},
file1: {
  type: String,
},
file2: {
  type: String,
},
file3: {
  type: String,
},
portfolioLink: {
  type: String,
},

})
 userSchema.pre('save', async function (next) {
   let user = this as UserDocument

  const SALT_NUMBER = process.env.SALT_NUMBER || 10

   if (!user.isModified('password')) {
    return next()
 }

 const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hashSync(user.password, salt)

  user.password = hash
 })

userSchema.methods.comparePassword = async function (
   candidatePassword: string
 ): Promise<Boolean> {
  const user = this as UserDocument
     const isMatch = await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e) => false)
  return isMatch
}

 const userUpdatedSchema = userSchema.add(updateUserSchema)
 

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
