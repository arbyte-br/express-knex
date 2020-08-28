const knex = require('knex');
const tableName = 'usuarios';

let queryBuilder;

const connectDatabase = async () => {
    queryBuilder = queryBuilder || knex({
        client: 'pg',
        connection: 'postgres://USER:PASSWORD@HOST:5432/DATABASE',
        searchPath: ['knex', 'public'],
    });

    return queryBuilder;
}

const getUSer = async () => {
    const queryBuilder = await connectDatabase();

    return queryBuilder.select('*').from(tableName);
};

const createUSer = async ({
    name,
    lastname
}) => {
    const queryBuilder = await connectDatabase();

    return queryBuilder(tableName).insert({
        name,
        lastname
    });;
};

const updateUser = async ({
    id
}, {
    name,
    lastname
}) => {
    try {
        const queryBuilder = await connectDatabase();

        await queryBuilder(tableName)
            .where('id', id)
            .update({
                name,
                lastname
            });
        return {
            messa: 'update feito com sucesso'
        };

    } catch (error) {
        throw new Error('Deu ruim');
    }
};

const deleteUser = async ({
    id
}) => {
    try {
        const queryBuilder = await connectDatabase();

        await queryBuilder(tableName)
            .where('id', id)
            .del();

        return {
            messa: 'Usuário removido com sucesso'
        };

    } catch (error) {
        throw new Error('Deu ruim');
    }
};

module.exports = {
    getUSer,
    createUSer,
    updateUser,
    deleteUser
}