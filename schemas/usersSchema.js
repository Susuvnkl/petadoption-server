const signUpSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", maxLength: 5 },
    lastName: { type: "string" },
    email: {
      type: "string",
      maxLength: 120,
    },
    password: { type: "string" },
    confirmPaswword: { type: "string" },
    phoneNumber: { type: "string" },
  },
  required: ["firstName", "lastName", "email", "password", "confirmPaswword", "phoneNumber"],
  additionalProperties: false,
};

module.exports = { signUpSchema };
