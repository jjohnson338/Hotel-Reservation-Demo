import { GraphQLScalarType } from 'graphql';

export default new GraphQLScalarType({
  'name': 'Date',
  'description': 'Date scalar type',
  parseValue(value) {
    const parsedDate = new Date(value);
    parsedDate.setDate(parsedDate.getDate() + 1);
    return parsedDate.toLocaleDateString();
  },
  serialize(value) {
    return value;
  }
});
