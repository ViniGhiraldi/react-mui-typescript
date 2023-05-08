import { Environment } from "../../../environment";
import { Api } from "../axios-config"

export interface IListagemCidade{
    id: number;
    nome: string;
}

export interface IDetalheCidade{
    id: number;
    nome: string;
}

type TCidadesComTotalCount = {
    data: IListagemCidade[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        const urlRelativa = `/cidades?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;
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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        const { data } = await Api.get(`/cidades/${id}`, { headers: { Authorization: token } });

        if(data){
            return data;
        }

        return new Error('Erro ao consultar registro.');
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || 'Erro ao consultar registro.');
    }
}

const create = async (dados: Omit<IDetalheCidade,'id'>): Promise<number | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        const { data } = await Api.post('/cidades', dados, { headers: { Authorization: token } });

        if(data){
            return data;
        }

        return new Error('Erro ao criar registro.')
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao criar registro.');
    }
}

const updateById = async (id: number, dados: Omit<IDetalheCidade, 'id'>): Promise<void | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        await Api.put(`/cidades/${id}`, dados, { headers: { Authorization: token } });
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao atualizar registro.');
    }
}

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        const token = `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`;

        await Api.delete(`/cidades/${id}`, { headers: { Authorization: token } });
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'Erro ao deletar registro.');
    }
}



export const CidadesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById

}