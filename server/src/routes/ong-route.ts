import { Elysia, t } from "elysia";
import { betterAuthContext } from "@/routes/route-security";
import { ongService } from "@/services/ong-service";

const bodyParse = {
	cnpj: t.String({ minLength: 14, maxLength: 14 }),
	razaoSocial: t.String({ maxLength: 255 }),
	nomeFantasia: t.String({ maxLength: 255 }),
	telefone: t.String({ minLength: 10, maxLength: 11 }),
	whatsapp: t.Optional(t.String({ minLength: 12, maxLength: 13 })),
	email: t.String({ maxLength: 255, format: "email" }),
	site: t.Optional(t.String({ maxLength: 255 })),
	instagram: t.String({ maxLength: 255 }),
	urlImagem: t.String(),
	cep: t.String({ minLength: 8, maxLength: 8 }),
	uf: t.String({ minLength: 2, maxLength: 2 }),
	cidade: t.String({ maxLength: 255 }),
	bairro: t.String({ maxLength: 255 }),
	logradouro: t.String({ maxLength: 255 }),
	numero: t.Numeric(),
};

const queryParamsParse = {
	cnpj: t.Optional(t.String()),
	razaoSocial: t.Optional(t.String()),
	nomeFantasia: t.Optional(t.String()),
	telefone: t.Optional(t.String()),
	whatsapp: t.Optional(t.String()),
	email: t.Optional(t.String()),
	site: t.Optional(t.String()),
};

const OngListResponse = t.Array(
	t.Object({
		id: t.String(),
		nomeFantasia: t.String(),
		urlImagem: t.String(),
		cidade: t.String(),
		estado: t.String(),
		telefone: t.String(),
		email: t.String(),
	}),
	{
		description: "ONGs encontradas",
	},
);

const OngResponse = {
	id: t.String(),
	cnpj: t.String(),
	razaoSocial: t.String(),
	nomeFantasia: t.String(),
	telefone: t.String(),
	whatsapp: t.Union([t.String(), t.Null()]),
	email: t.String(),
	site: t.Union([t.String(), t.Null()]),
	instagram: t.String(),
	urlImagem: t.String(),
	cep: t.String(),
	uf: t.String(),
	cidade: t.String(),
	bairro: t.String(),
	logradouro: t.String(),
	numero: t.Number(),
	userId: t.String(),
	createdAt: t.Date(),
	updatedAt: t.Date(),
};

const ongRoutes = new Elysia({ prefix: "/ongs", tags: ["Ongs"] })
	.use(betterAuthContext)
	.get("/:id", async ({ params: { id } }) => ongService.getOngById(id), {
		params: t.Object({ id: t.String({ format: "uuid" }) }),
		response: {
			200: t.Object(OngResponse, { description: "ONG encontrada" }),
			404: t.String({ description: "ONG não encontrada" }),
		},
		detail: {
			description: "Busca uma ONG por ID (sem autenticação)",
		},
	})
	.post(
		"/",
		async ({ body, status, user }) => {
			const result = await ongService.createOng(body, user.id);
			return status(201, result);
		},
		{
			body: t.Object(bodyParse),
			response: {
				201: t.Object(OngResponse, { description: "ONG salva com sucesso" }),
				401: t.String({ description: "Usuário não autenticado" }),
				422: t.Unknown({ description: "Dados inválidos" }),
				500: t.String({ description: "Ocorreu um erro ao salvar a ONG" }),
			},
			detail: {
				description:
					"Cria uma nova ONG para o usuário atual (autenticação necessária)",
			},
			auth: true,
		},
	)
	.put(
		"/:id",
		async ({ params: { id }, body, user }) =>
			ongService.updateOng(id, user.id, body),
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			body: t.Partial(t.Object(bodyParse)),
			response: {
				200: t.Object(OngResponse, { description: "ONG salva com sucesso" }),
				401: t.String({ description: "Usuário não autenticado" }),
				403: t.String({
					description: "Usuário não tem permissão para alterar a ONG",
				}),
				404: t.String({ description: "ONG não encontrada" }),
				422: t.Unknown({ description: "Dados inválidos" }),
				500: t.String({ description: "Ocorreu um erro ao salvar a ONG" }),
			},
			detail: {
				description:
					"Atualiza uma ONG usando dados completos ou parciais (autenticação necessária)",
			},
			auth: true,
		},
	)
	.get("/", async ({ query }) => ongService.getOngs(query), {
		query: t.Object(queryParamsParse),
		response: {
			200: OngListResponse,
		},
		detail: {
			description: "Busca uma lista de ONGs usando filtro (sem autenticação)",
		},
	});

export default ongRoutes;
