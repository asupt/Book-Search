const typeDefs = `
 type Profile {
  _id: ID
  name: String
  email: String
  bids: [Bid]
}

type Artwork {
  _id: ID
  title: String
  imageUrl: String
  description: String
  startingBid: Float
  currentHighestBid: Float
  startTime: String
  endTime: String
  bids: [Bid]
}

type Bid {
  _id: ID
  profileId: String
  artworkId: String
  bidAmount: Float
  bidTime: String
}


  # Set up an Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    artworks: [Artwork]!
    artwork(artworkId: ID!): Artwork
  }

  type Mutation {
    # Set up mutations to handle creating a profile or logging into a profile and return Auth type
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeProfile(profileId: ID!): Profile

    placeBid(artworkId: ID!, bidAmount: Float!): Bid
  closeAuction(artworkId: ID!): Artwork
  }
`;

module.exports = typeDefs;
