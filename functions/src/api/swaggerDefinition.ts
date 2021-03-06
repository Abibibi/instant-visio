export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'InstantVisio API',
        description:
            'Provide an open source API to create, join, manage video rooms, and more. <br/> <b>API Base URL:</b> https://instantvisio.com/api/',
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            User: {
                properties: {
                    id: {
                        type: 'string',
                    },
                    subscription: {
                        type: 'object',
                        properties: {
                            isActive: 'boolean',
                            isQuotaReached: 'boolean',
                        },
                    },
                    usage: {
                        type: 'object',
                        properties: {
                            sentEmails: 'integer',
                            sentSMSs: 'integer',
                        },
                    },
                    updatedAt: {
                        type: 'integer',
                    },
                },
            },
            Room: {
                properties: {
                    id: {
                        type: 'string',
                    },
                    createdAt: {
                        type: 'integer',
                    },
                    updatedAt: {
                        type: 'integer',
                    },
                    startAt: {
                        type: 'integer',
                    },
                    name: {
                        type: 'string',
                    },
                },
            },
            Destination: {
                properties: {
                    email: {
                        type: 'string',
                    },
                    phone: {
                        type: 'string',
                    },
                    lang: {
                        type: 'string',
                    },
                    country: {
                        type: 'string',
                    },
                },
            },
            Reminder: {
                properties: {
                    id: {
                        type: 'string',
                    },
                    hostName: {
                        type: 'integer',
                    },
                    sendAt: {
                        type: 'integer',
                    },
                    createdAt: {
                        type: 'integer',
                    },
                    updatedAt: {
                        type: 'integer',
                    },
                    isSent: {
                        type: 'boolean',
                    },
                    destinations: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Destination',
                        },
                    },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                description: 'Enter JWT Bearer token **_only_**',
                bearerFormat: 'JWT',
            },
        },
        examples: {
            Destinations: {
                summary: 'Mixed email, sms, groupId',
                value:
                    '[{"email": "user@example.com", "lang": "en"}, {"phone": "+33600000000", "lang":"fr"}, {"groupId": "ji81sXmrpm91AkcZNf", lang:"fr"}]',
            },
            Members: {
                summary: 'Members',
                value:
                    '[{"name":"Aragorn", "id": "aeffokp234cxLE2cm9kf9gdlnc2"}, {"name": "Fili", "id": "po9ALC30dzJZ1ocan13dkczk3"}]',
            },
        },
        parameters: {
            room: {
                name: {
                    name: 'name',
                    description:
                        '(optional) The room name. If not supplied, the roomName will be the room id.',
                    in: 'x-www-form-urlencoded',
                    required: false,
                    type: 'string',
                },
                startAt: {
                    name: 'startAt',
                    description:
                        '(optional) The UTC timestamp in seconds at which the meeting is scheduled to start. If not set, it will be the current time.',
                    in: 'x-www-form-urlencoded',
                    required: false,
                    type: 'integer',
                },
                password: {
                    name: 'password',
                    description:
                        '(optional) The room password. If no password on room creation, a random one is generated.',
                    in: 'x-www-form-urlencoded',
                    required: false,
                    type: 'string',
                },
                hideChatbot: {
                    name: 'hideChatbot',
                    description:
                        '(optional) Hide the chatbot button & features which will prevent users to get help and assistance from there. The chatbot is visible by default. The current chatbot provider is Crisp.chat.',
                    required: false,
                    type: 'boolean',
                    in: 'x-www-form-urlencoded',
                },
                destinations: {
                    name: 'destinations',
                    description: 'An array of destinations',
                    required: false,
                    in: 'x-www-form-urlencoded',
                    schema: {
                        type: 'string',
                    },
                    items: {
                        $ref: '#/components/schemas/Destination',
                    },
                    examples: {
                        mixed: {
                            summary: 'Mixed email, sms and languages',
                            $ref: '#/components/examples/Destinations',
                        },
                    },
                },
                hostName: {
                    name: 'hostName',
                    description:
                        'The name or organisation which sent the invite(s). Required if you want any invitation to be sent',
                    required: false,
                    in: 'x-www-form-urlencoded',
                    type: 'string',
                },
                timezone: {
                    name: 'timezone',
                    description:
                        'The room IANA-specified zones, like "Europe/Paris". Default is "Europe/Paris". This will be used to send date in the correct timezone in reminders, if any.',
                    required: false,
                    in: 'x-www-form-urlencoded',
                    type: 'string',
                },
            },
            group: {
                members: {
                    name: 'members',
                    description:
                        'Group members (object with name & user id) (initial or to add/remove). Name not needed for remove operations',
                    in: 'x-www-form-urlencoded',
                    required: false,
                    type: 'string',
                    examples: {
                        example: {
                            $ref: '#/components/examples/Members',
                        },
                    },
                },
            },
        },
        responses: {
            400: {
                description:
                    'request content (x-www-form-urlencoded) not correct',
            },
            401: {
                description: 'missing authorization bearer token',
            },
            402: {
                description:
                    'Payment required, quota exceeded or subscription period ended',
            },
            403: {
                description:
                    'authorization header present but not valid, or access forbidden',
            },
            412: {
                description:
                    'authorization header present but not formatted correctly',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
}
