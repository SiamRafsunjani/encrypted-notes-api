export const forbiddenResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Forbidden request.',
    },
  },
};

export const invalidDataResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Invalid request.',
    },
  },
};

export const createSecretNoteResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'id of the encrypted note',
    },
    message: {
      type: 'string',
      example: 'Note created successfully',
    },
  },
};

export const getAllSecretNoteResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        example: 'id of the encrypted note',
      },
      createdAt: {
        type: 'Date',
        example: 'The created date of the secret note',
      },
    },
  },
};

export const getOneSecretNoteResponse = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'id of the encrypted note',
    },
    note: {
      type: 'string',
      example:
        'This is a super duper note. this can be encrypted or decrypted based on the api endpoint',
    },
    createdAt: {
      type: 'Date',
      example: 'The created date of the secret note',
    },
  },
};
