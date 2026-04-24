import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const usuarios = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  senha: text("senha").notNull(),
  perfil: varchar("perfil", { length: 30 }).notNull(),
  cpf: varchar("cpf", { length: 20 }).notNull(),
  cargo: varchar("cargo", { length: 100 }).notNull(),
  oab: varchar("oab", { length: 30 }),
  whatsapp: varchar("whatsapp", { length: 30 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const processos = pgTable("processos", {
  id: serial("id").primaryKey(),
  numero: text("numero").notNull(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  vara: varchar("vara", { length: 100 }).notNull(),
  tribunal: varchar("tribunal", { length: 100 }).notNull(),
  advogado_id: integer("advogado_id").notNull(),
  cliente_id: integer("cliente_id").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const movimentacoes = pgTable("movimentacoes", {
  id: serial("id").primaryKey(),
  processo_id: integer("processo_id").notNull(),
  tipo: varchar("tipo", { length: 100 }).notNull(),
  texto_original: text("texto_original").notNull(),
  texto_traduzido: text("texto_traduzido").notNull(),
  data_movimentacao: timestamp("data_movimentacao").defaultNow().notNull(),
});

// Schemas do Zod para VALIDAÇÃO de entrada de dados via API
export const insertUsuarioSchema = createInsertSchema(usuarios).omit({ id: true, created_at: true });
export const insertProcessoSchema = createInsertSchema(processos).omit({ id: true, created_at: true });
export const insertMovimentacaoSchema = createInsertSchema(movimentacoes).omit({ id: true, data_movimentacao: true });

// TIPAGENS OFICIAIS DO TYPESCRIPT PARA LEITURA (Selects - O que vem do banco)
export type Usuario = InferSelectModel<typeof usuarios>;
export type Processo = InferSelectModel<typeof processos>;
export type Movimentacao = InferSelectModel<typeof movimentacoes>;

// TIPAGENS OFICIAIS DO TYPESCRIPT PARA CRIAÇÃO (Inserts - O que vai para o banco)
export type NovoUsuario = InferInsertModel<typeof usuarios>;
export type NovoProcesso = InferInsertModel<typeof processos>;
export type NovaMovimentacao = InferInsertModel<typeof movimentacoes>;