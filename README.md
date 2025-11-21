curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "rut": "11111111-1",
    "nombre": "Juan",
    "apellido": "Pérez"
  }'


{
  "firstName": "Juan",
  "lastName": "Pérez",
  "code": "11111111-1"
}
