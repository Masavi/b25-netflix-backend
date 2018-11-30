// Imports: GraphQL & Schema
const { graphql } =  require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

// Imports: GraphQL TypeDefs & Resolvers
import TypeDefs from '../graphql/typedefs/types';
import Query from '../graphql/resolvers/query';
import Mutation from '../graphql/resolvers/mutation';

const schema = makeExecutableSchema({
    typeDefs: TypeDefs,
    resolvers: { Query, Mutation },
});

import User from '../models/User';
import setupTest from './helpers';

const mutationRegister = `

    mutation Register($first_name:String!,$last_name:String!,$email:String!,
        $password:String!){
        signup(data:{first_name:$first_name,
            last_name:$last_name,
            email:$email,
            password:$password
        }){
            token
        }
    }
`

const queryMe = `

    query Profile{
        me{
            first_name,
            last_name,
            email
        }
    }

`

describe("Register user works correctly", () => {

    beforeEach( async () => await setupTest())

    it("probando suma de 2 + 2 = 4...", () => {
        return expect(2+2).toBe(4);
    });


     it("Should create user correctly",async () => {
        const first_name = "Prueba"
        const last_name = "Prueba"
        const email = "prueba@email.com"
        const password = "miprueba"

        const res = await graphql(
                                schema,
                                mutationRegister,
                                null,
                                {}
                                ,{first_name,last_name,email,password})

        expect(res).toHaveProperty("data")
        expect(res.data).toHaveProperty("signup")
        expect(res.data.signup).toHaveProperty("token")
    })

    it("Should retrieve me profile",async () => {

        const me =  await User.create({first_name:"prueba",last_name:"prueba",email:"prueba@prueba.com",password:"prueba"})

        const res  =  await graphql(schema,queryMe,null,{user:me},{})
        
        expect(res.data.me.first_name).toBe(me.first_name)

    })
})