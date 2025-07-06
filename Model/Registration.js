import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  Contact: { type: String, required: true },

  // 👇 Embedded tasks
  tasks: [
    {
      title: { type: String },
      description: { type: String },
      dueDate: {type: String},
    }
  ]
});

const Registrationschema = mongoose.model('register', registrationSchema);
export default Registrationschema;
