const Reserva = require ('../Reserva');

const ctrlReservas = {
    
    getReservas: async function (req, res){
        try{
            const allReserva =await Reserva.findAll()
            if(!allReserva.length){
                throw({
                    status: 404,
                    message: "no hay reserva"
                    
                })
                return res.json(allReserva)
            }
        }catch (error){
            res.status(error.status || 500).json(error.message || 'error interno del servidor')
        }
    },
    createReservas: async function (req, res){
        const {name, surname, email, date} = req.body
        try {
            
            const nuevaReserva = await Reserva.create ({
                name,
                surname,
                email,
                date
            })
            if(!nuevaReserva){
                throw({
                    status: 400,
                    message: "no se pudo crear la reserva"   
                })
            }
            return res.json (nuevaReserva)
        } catch (error) {
            res.status(error.status || 500).json(error.message || 'error interno del servidor')
        }
    },
    updateReservas: async function (req, res){
        const{id} = req.params;
        const {name, surname, email, date} = req.body
        try {
            
            const reservaActualizada = await Reserva.update ({
                name,
                surname,
                email,
                date
            },{
                where: {
                    id
                }
            })
            if(!reservaActualizada){
                throw({
                    status: 400,
                    message: "no se pudo crear la reserva"   
                })
            }
            return res.json ({
                message: "reserva actualizada correctamente",
                reservaActualizada
            })
        } catch (error) {
            res.status(error.status || 500).json(error.message || 'error interno del servidor')
        }
    },
    deleteReservas: async function (req, res){
        const{id} = req.params;
       
        try {
            
           
            const reservaEliminada = await Reserva.destroy({

                where: {
                    id
                }
            })
            
            if(!reservaEliminada){
                throw({
                    status: 400,
                    message: "no se pudo eliminar la reserva"   
                })
            }
            return res.json ({
                message: "reserva eliminada correctamente",
                reservaEliminada
            })
        } catch (error) {
            res.status(error.status || 500).json(error.message || 'error interno del servidor')
        }
    },
};


// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
// Obtener una reserva
// Crear una reserva
// Actualizar una reserva
// Eliminar una reserva de forma lógica

module.exports = ctrlReservas;