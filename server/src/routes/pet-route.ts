import { Elysia, t } from "elysia";
import { betterAuthContext } from "@/routes/route-security";
import { petService } from "@/services/pet-service";
import { EspecieEnum, PorteEnum, SexoEnum } from "@/types/pet-types";

const queryParamsParse = {
	especie: t.Optional(t.Enum(EspecieEnum)),
	sexo: t.Optional(t.Enum(SexoEnum)),
	porte: t.Optional(t.Enum(PorteEnum)),
	cidade: t.Optional(t.String()),
	nomeOng: t.Optional(t.String()),
};

const bodyParse = {
	nome: t.String({ maxLength: 255 }),
	especie: t.Enum(EspecieEnum),
	raca: t.String({ maxLength: 100 }),
	sexo: t.Enum(SexoEnum),
	porte: t.Enum(PorteEnum),
	dataNascimento: t.Date(),
	descricao: t.String(),
	urlImagem: t.String(),
};

const PetListResponse = t.Array(
	t.Object({
		id: t.String(),
		nome: t.String(),
		urlImagem: t.String(),
		cidade: t.String(),
		estado: t.String(),
	}),
	{ description: "Pets encontrados" },
);

const PetWithOngResponse = t.Object(
	{
		pet: t.Object({
			id: t.String(),
			nome: t.String(),
			especie: t.String(),
			raca: t.String(),
			sexo: t.String(),
			porte: t.String(),
			dataNascimento: t.Date(),
			descricao: t.String(),
			urlImagem: t.String(),
			adotado: t.Boolean(),
			ongId: t.String(),
			tutorId: t.Union([t.String(), t.Null()]),
			createdAt: t.Date(),
			updatedAt: t.Date(),
		}),
		ong: t.Object({
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
		}),
	},
	{ description: "Pet encontrado com informações da ONG" },
);

const PetResponse = t.Object(
	{
		id: t.String(),
		nome: t.String(),
		especie: t.String(),
		raca: t.String(),
		sexo: t.String(),
		porte: t.String(),
		dataNascimento: t.Date(),
		descricao: t.String(),
		urlImagem: t.String(),
		adotado: t.Boolean(),
		ongId: t.String(),
		tutorId: t.Union([t.String(), t.Null()]),
		createdAt: t.Date(),
		updatedAt: t.Date(),
	},
	{ description: "Pet salvo com sucesso" },
);

const petRoutes = new Elysia({ prefix: "/pets", tags: ["Pets"] })
	.use(betterAuthContext)
	.get("/", async ({ query }) => petService.getPets(query), {
		query: t.Object(queryParamsParse),
		response: {
			200: PetListResponse,
		},
		detail: {
			description: "Busca uma lista de pets usando filtro (sem autenticação)",
		},
	})
	.get("/:id", async ({ params: { id } }) => petService.getPetById(id), {
		params: t.Object({ id: t.String({ format: "uuid" }) }),
		response: {
			200: PetWithOngResponse,
			404: t.String({ description: "Pet não encontrado" }),
		},
		detail: {
			description:
				"Busca um pet por ID juntamente com dados da ONG (sem autenticação)",
		},
	})
	.post(
		"/",
		async ({ body, status, user }) => {
			const result = await petService.createPet(body, user.id);
			return status(201, result);
		},
		{
			body: t.Object(bodyParse),
			response: {
				201: PetResponse,
				401: t.String({ description: "Usuário não autenticado" }),
				422: t.Unknown({ description: "Dados inválidos" }),
				500: t.String({ description: "Ocorreu um erro ao salvar o pet" }),
			},
			detail: {
				description:
					"Cria um novo pet para a ONG do usuário autenticado (autenticação necessária)",
			},
			auth: true,
		},
	)
	.put(
		"/:id",
		async ({ params: { id }, body, user }) =>
			petService.updatePet(id, body, user.id),
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			body: t.Partial(t.Object(bodyParse)),
			response: {
				200: PetResponse,
				401: t.String({ description: "Usuário não autenticado" }),
				403: t.String({
					description: "Usuário não tem permissão para alterar o pet",
				}),
				422: t.Unknown({ description: "Dados inválidos" }),
				500: t.String({ description: "Ocorreu um erro ao salvar o pet" }),
			},
			detail: {
				description:
					"Atualiza um pet usando dados completos ou parciais (autenticação necessária)",
			},
			auth: true,
		},
	)
	.delete(
		"/:id",
		async ({ params: { id }, status, user }) => {
			await petService.deletePet(id, user.id);
			return status(204, undefined);
		},
		{
			params: t.Object({ id: t.String({ format: "uuid" }) }),
			response: {
				204: t.Undefined({ description: "Pet deletado com sucesso" }),
				401: t.String({ description: "Usuário não autenticado" }),
				403: t.String({
					description: "Usuário não tem permissão para deletar o pet",
				}),
				404: t.String({ description: "Pet não encontrado" }),
			},
			detail: {
				description: "Deleta um pet (autenticação necessária)",
			},
			auth: true,
		},
	);

export default petRoutes;
