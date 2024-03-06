const typeDefs = `
type Query {
    profile: Profile
    profiles: [Profile]
    me: Profile
    cardSets(id:Int!, amount:Int): [CardSet]
    card(id:Int!): Card
}

type Mutation {
    addProfile(username:String!, email:String!, password:String!): Profile
    addCardSet(title:String!, cardSet:[CardInput!]): CardSet
    updateCardSet(id:Int, cardSet:[CardInput!]): CardSet
    deleteCardSet(id:Int!): Profile
    login(email:String!, password:String!): Profile
}

type Profile {
    _id: ID!
    username: String
    email: String
    cardSets: [CardSet]
}

type CardSet {
    _id: ID!
    title: String!
    cards: [Card]
    isCompleted: Boolean
}

type Card {
    _id: ID!
    term: String
    description: String
    isViewed: Boolean
}

input CardInput {
    term: String!
    description: String!
  }
`;

module.exports = typeDefs;