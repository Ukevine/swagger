const productModel = require("../models/products");
const { UserModel } = require("../models/user");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MEN-authentication-crud Backend API",
            version: "1.0.0",
            description: "",
            contact: {
                name: "Uwase Kevine",
                url: "https://nourl.com",
                email: "Uwasekevine@gmail.com",
            }
        },
        servers: [
            {
                url: "http://localhost:6000",
                description: "Local development server"
            },
        ],
        components: {
            securitySchemes: {
                JWTAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                productModel: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string"
                        },
                        name: {
                            type: "string"
                        },
                        price: {
                            type: "string"
                        },
                        quantity: {
                            type: "string"
                        }
                    },
                    required: ["name", "price", "quantity"]
                },
                UserModel: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        password: {
                            type: "string"
                        }
                    },
                    required: ["name", "email", "password"]
                }
            }
        },
        security: [
            {
                JWTAuth: [],
            },
        ],
    },
    apis: ["./routes/routes.js"],
};

module.exports = options;