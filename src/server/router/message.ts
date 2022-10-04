import { createRouter } from "./context";
import { randomUUID } from "crypto";

import { z } from "zod";

export const messageRouter = createRouter()
  .mutation("add", {
    input: z.object({
      text: z.string().min(1).max(4096),
    }),
    async resolve({ input, ctx }) {
      console.log("msg.add called " + input);
      return await ctx.prisma.message.create({
        data: {
          id: randomUUID(),
          text: input.text,
        },
      });
    },
  })
  .query("list", {
    async resolve({ ctx }) {
      console.log("msg.list called ");
      return await ctx.prisma.message.findMany();
    },
  });