import { defineCollection,z } from "astro:content"

const proveedor = defineCollection({
  schema: z.object({
  title: z.string(),
  author: z.string(),
  img:z.string().url(),
  description:z.string(),

    })
})

export const collections = {proveedor}
