import { Button, TextField, Typography, Box, FormControl, Input, InputLabel, Select, Menu, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import ITag from '../../../interfaces/ITag';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [restaurante, setRestaurante] = useState('')
    const [tag, setTag] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get< { tags: ITag[] } >('tags/')
            .then((resposta) => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then((resposta) => setRestaurantes(resposta.data))
    }, [])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)

        if (imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                alert('Prato cadastrado com sucesso!')
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
            })
            .catch((erro) => console.log(erro))
    }

    const selecionarArquivos = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if(evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)     
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant='h6'> Formulario de Pratos </Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    id="standard-basic"
                    label="Nome do prato"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    id="standard-basic"
                    label="Descrição do prato"
                    variant="standard"
                    fullWidth
                    required
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId='select-tag' value={tag} onChange={evento => setTag(evento.target.value)}> 
                        {tags.map(tag => 
                            <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId='select-tag' value={restaurante} onChange={evento => setRestaurante(evento.target.value)}> 
                        {restaurantes.map(restaurante => 
                            <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivos} />

                <Button
                    sx={{ marginTop: 1 }}
                    type="submit"
                    fullWidth
                    variant="outlined"
                >
                    Outlined
                </Button>
            </Box>
        </Box>
    )
}

export default FormularioPrato