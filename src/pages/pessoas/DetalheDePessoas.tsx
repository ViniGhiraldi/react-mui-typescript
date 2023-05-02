import { useNavigate, useParams } from "react-router-dom";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

export const DetalheDePessoas = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('save');
    }

    const handleDelete = () => {
        console.log('delete');
    }

    return(
        <LayoutBaseDePagina
          titulo='Detalhe de pessoa'
          barraDeFerramentas={
            <FerramentasDeDetalhe
              textoBotaoNovo='Nova'
              mostrarBotaoSalvarEVoltar
              mostrarBotaoNovo={id !== 'nova'}
              mostrarBotaoApagar={id !== 'nova'}

              aoClicarEmSalvar={handleSave}
              aoClicarEmSalvarEVoltar={handleSave}
              aoClicarEmApagar={handleDelete}
              aoClicarEmVoltar={() => navigate('/pessoas')}
              aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
            />
          }
        >
            <p>Detalhes</p>
        </LayoutBaseDePagina>
    );
};