import { GraphQLList, GraphQLString, GraphQLInputObjectType } from 'graphql';

import CommentType from './CommentType';
import { getComments, saveComment } from './CommentLoader';

export const queries = {
    getComments: {
        type: GraphQLList(CommentType),
        resolve: getComments
    }
};

export const mutations = {
    saveComment: {
        type: CommentType,
        resolve: saveComment,
        args: {
            input: {
                type: new GraphQLInputObjectType({
                    name: "CommentInput",
                    fields: {
                        name: {
                            type: GraphQLString
                        },
                        content: {
                            type: GraphQLString
                        }
                    }
                })
            }
        }
    }
}