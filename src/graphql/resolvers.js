// GraphQL: Resolvers
  const RESOLVERS = {
    Query: {
    hola: ((parent, args, context, info) => {
      `Hola ${args.name || 'mundo'}`;
    })
  }
};
// Exports
export default RESOLVERS;