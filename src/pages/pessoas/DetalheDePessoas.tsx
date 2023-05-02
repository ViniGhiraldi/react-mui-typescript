import { useEffect, useState } from "react";
import { LinearProgress } from '@mui/material';
import { useNavigate, useParams} from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Form } from "@unform/web";
import { VTextField } from "../../shared/forms";

export const DetalheDePessoas = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [nome, setNome] = useState('');

    useEffect(()=>{
        if(id !== 'nova'){
            setIsLoading(true)

            PessoasService.getById(Number(id))
            .then((result) => {
                setIsLoading(false);
                if(result instanceof Error){
                    alert(result.message);
                    navigate('/pessoas');
                }else{
                    setNome(result.nomeCompleto);
                    console.log(result);
                }
            })
        }
    }, [id])

    const handleSave = () => {
        console.log('save');
    }

    const handleDelete = (id: number) => {
        if(confirm('Realmente deseja apagar?')){
            PessoasService.deleteById(id)
            .then(result =>{
              if(result instanceof Error){
                alert(result.message);
              }else{
                alert('Registro apagado com sucesso!');
                navigate('/pessoas');
              }
            })
          }
    }

    return(
        <LayoutBaseDePagina
          titulo={id !== 'nova' ? nome : 'Nova pessoa'}
          barraDeFerramentas={
            <FerramentasDeDetalhe
              textoBotaoNovo='Nova'
              mostrarBotaoSalvarEVoltar
              mostrarBotaoNovo={id !== 'nova'}
              mostrarBotaoApagar={id !== 'nova'}

              aoClicarEmSalvar={handleSave}
              aoClicarEmSalvarEVoltar={handleSave}
              aoClicarEmVoltar={() => navigate('/pessoas')}
              aoClicarEmApagar={() => handleDelete(Number(id))}
              aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
            />
          }
        >
            
            <Form onSubmit={(dados) => console.log(dados)}>
                <VTextField
                  name='firstInput'
                />

                <button type='submit'>Submit</button>
            </Form>



        </LayoutBaseDePagina>
    );
};