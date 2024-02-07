import mongoose from 'mongoose'
// eslint-disable-line

import { PackageDocument } from './package.model'
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
  package: PackageDocument['_id']
  resetLink: string
  avatar: string
  phoneNumber: string 
  favoriteHero?: string;
  gender:string;
  state: string, // Include the selected state
  location: string, // Include the selected location
  designType:string,
  selectedTools: String,
  
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
  file1: {
    filename: string;
    url: string;
  };
  file2: {
    filename: string;
    url: string;
  };
  file3: {
    filename: string;
    url: string;
  };
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
    
    file1: {
      filename: String,
      url: String,
    },
    file2: {
      filename: String,
      url: String,
    },
    file3: {
      filename: String,
      url: String,
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

portfolioLink: {
  type: String,
},
file1: {
  filename: String,
  url: String,
},
file2: {
  filename: String,
  url: String,
},
file3: {
  filename: String,
  url: String,
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
): Promise<boolean> {
  const user = this as UserDocument;
  const isMatch = await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e: Error) => false); // Specify the type of 'e' parameter as Error
  return isMatch;
};

 const userUpdatedSchema = userSchema.add(updateUserSchema)
 

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
