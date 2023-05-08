import { Environment } from "../../../environment";
import { Api } from "../axios-config"

export interface IListagemPessoa{
    id: number;
    email: string;
    cidadeId: number;
    nome: string;
    sobrenome?: string;
}

export interface IDetalhePessoa{
    id: number;
    email: string;
    cidadeId: number;
    nome: string;
    sobrenome?: string;
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        const urlRelativa = `/pessoas?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;
        const { data, headers } = await Api.get(urlRelativa, { headers: { Authorization: token } });

        if(data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
            }
        }

        return new Error('Erro ao listar os registros.');
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao listar os registros.');
    }
}

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        const { data } = await Api.get(`/pessoas/${id}`, { headers: { Authorization: token } });

        if(data){
            return data;
        }

        return new Error('Erro ao consultar registro.');
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao consultar registro.');
    }
}

const create = async (dados: Omit<IDetalhePessoa,'id'>): Promise<number | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        const { data } = await Api.post('/pessoas', dados, { headers: { Authorization: token } });

        if(data){
            return data;
        }

        return new Error('Erro ao criar registro.')
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao criar registro.');
    }
}

const updateById = async (id: number, dados: Omit<IDetalhePessoa, 'id'>): Promise<void | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        await Api.put(`/pessoas/${id}`, dados, { headers: { Authorization: token } });
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao atualizar registro.');
    }
}

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        await Api.delete(`/pessoas/${id}`, { headers: { Authorization: token } });
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao deletar registro.');
    }
}



export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById

}