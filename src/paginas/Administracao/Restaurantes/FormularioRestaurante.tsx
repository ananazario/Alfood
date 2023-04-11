import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante,
        })
            .then(() => {
                alert("Cadastrado com sucesso")
            })
    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField 
                value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
                id="standard-basic" 
                label="Nome do restaurante" 
                variant="standard" 
            />
            <Button type="submit" variant="outlined">Outlined</Button>
        </form>
    )
}

export default FormularioRestaurante
