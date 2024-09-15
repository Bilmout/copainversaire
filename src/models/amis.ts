import mongoose, { Schema, Document } from 'mongoose';

export interface MonAmi extends Document {
  name: string;
  birthdate: Date;
  age?: number; // Ajout de age dans l'interface
}

const schemaDami: Schema = new Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  age: { type: Number }
});

// Ajout d'un middleware pour calculer l'âge avant la sauvegarde
schemaDami.pre('save', function(this: MonAmi, next) {
  const today = new Date();
  const birthDate = new Date(this.birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  this.age = age;
  next();
});

export default mongoose.model<MonAmi>('Amis', schemaDami);
