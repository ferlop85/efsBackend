import { Schema, model } from "mongoose"

const clientSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneCode: { type: String },
  phoneNumber: { type: String },
  document_type: { type: String, required: true },
  document_value: { type: String, required: true },
  searchField: { type: String, required: true }, // Concatenación de otros campos para facilitar la búsqueda
  comissions: Number, // Comisiones por recomendación a otros clientes
  attachments: [String],
  comments: Number,
  sales: {
    count: Number,
    amount: Number,
  }, // Campo calculado para evitar queries complejas
})
const ClientModel = model("Client", clientSchema, "clients")
export default ClientModel
