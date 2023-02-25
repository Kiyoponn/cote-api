import * as z from 'zod'

export const ParamsWithId = z.object({
  id: z
    .string()
    .min(1)
    .refine(
      (id) => {
        try {
          return Number(id)
        } catch (error) {
          return false
        }
      },
      {
        message: 'Invalid id',
      }
    ),
})

export type ParamsWithId = z.infer<typeof ParamsWithId>
