import gql from 'graphql-tag';

import DocumentTypes from '../../api/Documents/types';
import DocumentQueries from '../../api/Documents/queries';
import DocumentMutations from '../../api/Documents/mutations';
import DocumentSubscriptions from '../../api/Documents/subscriptions';
import '../../api/Documents/server/indexes';

import CommentTypes from '../../api/Comments/types';

const GlobalTypes = `
  type Query {
    documents(owner: String): [Document]
    document(_id: String): Document
    comments(document: String): [Comment]
  }

  type Mutation {
    addDocument(title: String, body: String): Document
    updateDocument(_id: String!, title: String, body: String): Document
    removeDocument(_id: String!): Document
  }

  type Subscription {
    documentAdded: Document
    documentUpdated: Document
    documentRemoved: Document
  }
`;

const schema = {
  typeDefs: gql`
    ${GlobalTypes}
    ${DocumentTypes}
    ${CommentTypes}
  `,
  resolvers: {
    Query: {
      ...DocumentQueries,
    },
    Mutation: {
      ...DocumentMutations,
    },
    Subscription: {
      ...DocumentSubscriptions,
    },
  },
};

export default schema;
